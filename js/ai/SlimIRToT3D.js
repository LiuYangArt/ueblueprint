/**
 * Slim IR to T3D Converter
 * 
 * Converts compact Slim IR JSON format to full Unreal Engine T3D text.
 * This is the core transformation engine for the Slim IR system.
 */

import { 
    BLUEPRINT_NODE_TYPES, 
    MATERIAL_NODE_TYPES,
    PIN_TYPES,
    validateSlimIR,
    getNodeTypeConfig,
    getFunctionConfig
} from './SlimIRSchema.js'

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Generate a random 32-character uppercase hex GUID
 * @returns {string}
 */
export function generateGUID() {
    const chars = '0123456789ABCDEF'
    let result = ''
    for (let i = 0; i < 32; i++) {
        result += chars[Math.floor(Math.random() * 16)]
    }
    return result
}

/**
 * Build the standard Pin boolean flags (these are always the same)
 * @returns {string}
 */
function buildPinFlags() {
    return [
        'PinType.bIsReference=False',
        'PinType.bIsConst=False',
        'PinType.bIsWeakPointer=False',
        'PinType.bIsUObjectWrapper=False',
        'PinType.bSerializeAsSinglePrecisionFloat=False',
        'PersistentGuid=00000000000000000000000000000000',
        'bHidden=False',
        'bNotConnectable=False',
        'bDefaultValueIsReadOnly=False',
        'bDefaultValueIsIgnored=False',
        'bAdvancedView=False',
        'bOrphanedPin=False'
    ].join(',')
}

/**
 * Build PinType string from type name
 * @param {string} typeName - Pin type name (exec, bool, float, etc.)
 * @param {boolean} isOutput - Is this an output pin?
 * @returns {string}
 */
function buildPinType(typeName, isOutput = false) {
    const typeConfig = PIN_TYPES[typeName] || PIN_TYPES.exec
    const dirStr = isOutput ? 'Direction="EGPD_Output",' : ''
    
    return `${dirStr}PinType.PinCategory="${typeConfig.category}",PinType.PinSubCategory="${typeConfig.subCategory}",PinType.PinSubCategoryObject=${typeConfig.subCategoryObject},PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,`
}

/**
 * Build a complete CustomProperties Pin definition
 * @param {Object} options - Pin options
 * @returns {string}
 */
function buildPin(options) {
    const {
        pinId,
        pinName,
        type = 'exec',
        isOutput = false,
        defaultValue = null,
        linkedTo = null,
        hidden = false,
        friendlyName = null
    } = options
    
    const typeConfig = PIN_TYPES[type] || PIN_TYPES.exec
    
    // Build the pin string piece by piece (no trailing commas until the end)
    let pin = `PinId=${pinId},PinName="${pinName}"`
    
    if (friendlyName) {
        pin += `,PinFriendlyName="${friendlyName}"`
    }
    
    // Direction (only for output pins)
    if (isOutput) {
        pin += `,Direction="EGPD_Output"`
    }
    
    // PinType fields
    pin += `,PinType.PinCategory="${typeConfig.category}"`
    pin += `,PinType.PinSubCategory="${typeConfig.subCategory}"`
    pin += `,PinType.PinSubCategoryObject=${typeConfig.subCategoryObject}`
    pin += `,PinType.PinSubCategoryMemberReference=()`
    pin += `,PinType.PinValueType=()`
    pin += `,PinType.ContainerType=None`
    pin += `,PinType.bIsReference=False`
    pin += `,PinType.bIsConst=False`
    pin += `,PinType.bIsWeakPointer=False`
    pin += `,PinType.bIsUObjectWrapper=False`
    pin += `,PinType.bSerializeAsSinglePrecisionFloat=False`
    
    // LinkedTo (before PersistentGuid, matching UE format)
    if (linkedTo && linkedTo.length > 0) {
        pin += `,LinkedTo=(${linkedTo.join(',')},)`
    }
    
    // Default value
    if (defaultValue !== null && defaultValue !== undefined) {
        pin += `,DefaultValue="${defaultValue}"`
    }
    
    // Standard flags
    pin += `,PersistentGuid=00000000000000000000000000000000`
    pin += `,bHidden=${hidden ? 'True' : 'False'}`
    pin += `,bNotConnectable=False`
    pin += `,bDefaultValueIsReadOnly=False`
    pin += `,bDefaultValueIsIgnored=False`
    pin += `,bAdvancedView=False`
    pin += `,bOrphanedPin=False`
    
    // Trailing comma before closing paren (UE format)
    // result should NOT end with a comma if we want a clean injection later, 
    // but UE usually has one. Let's stick to UE format.
    pin += `,`
    
    return `CustomProperties Pin (${pin})`
}

// ============================================================================
// Node Context for Conversion
// ============================================================================

/**
 * Conversion context - tracks nodes, pins, and connections
 */
class ConversionContext {
    constructor(graphMode) {
        this.graphMode = graphMode
        this.nodeMap = new Map()      // id -> { t3dName, config }
        this.pinMap = new Map()       // "nodeId.pinName" -> { nodeName, pinId }
        this.connectionMap = new Map() // "nodeId.pinName" (target) -> [{nodeName, pinId}] (sources)
        this.nodeCounter = {
            Event: 0,
            CallFunction: 0,
            Branch: 0,
            Sequence: 0,
            MacroInstance: 0,
            VariableGet: 0,
            VariableSet: 0,
            // Material
            GraphNode: 0
        }
    }
    
    /**
     * Get next T3D node name for a type
     * @param {string} nodeClass - UE node class
     * @returns {string}
     */
    getNextNodeName(nodeClass) {
        // Extract simple class name
        const className = nodeClass.split('.').pop()
        const count = this.nodeCounter[className] || 0
        this.nodeCounter[className] = count + 1
        return `${className}_${count}`
    }
    
    /**
     * Register a pin for connection lookup
     * @param {string} nodeId - Slim IR node id
     * @param {string} pinName - Pin name
     * @param {string} t3dNodeName - T3D node name
     * @param {string} pinId - Generated pin GUID
     */
    registerPin(nodeId, pinName, t3dNodeName, pinId) {
        const key = `${nodeId}.${pinName}`
        this.pinMap.set(key, { nodeName: t3dNodeName, pinId })
    }
    
    /**
     * Get pin info by key
     * @param {string} key - "nodeId.pinName"
     * @returns {Object|null}
     */
    getPin(key) {
        return this.pinMap.get(key) || null
    }
    
    /**
     * Process connections and build connectionMap
     * @param {Array} connections - IR connections array
     */
    processConnections(connections) {
        for (const [source, target] of connections) {
            const sourcePin = this.pinMap.get(source)
            const targetPin = this.pinMap.get(target)
            
            if (sourcePin && targetPin) {
                // Bidirectional connections
                // 1. Source -> Target (Output side)
                if (!this.connectionMap.has(source)) {
                    this.connectionMap.set(source, [])
                }
                this.connectionMap.get(source).push({
                    nodeName: targetPin.nodeName,
                    pinId: targetPin.pinId
                })

                // 2. Target -> Source (Input side)
                if (!this.connectionMap.has(target)) {
                    this.connectionMap.set(target, [])
                }
                this.connectionMap.get(target).push({
                    nodeName: sourcePin.nodeName,
                    pinId: sourcePin.pinId
                })
            }
        }
    }
    
    /**
     * Get LinkedTo string for a pin
     * @param {string} key - "nodeId.pinName"
     * @returns {string[]|null}
     */
    getLinkedTo(key) {
        const connections = this.connectionMap.get(key)
        if (!connections || connections.length === 0) return null
        return connections.map(c => `${c.nodeName} ${c.pinId}`)
    }
}

// ============================================================================
// Blueprint Node Converters
// ============================================================================

/**
 * Convert Event node to T3D
 * @param {Object} node - Slim IR node
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function convertEventNode(node, ctx) {
    const config = BLUEPRINT_NODE_TYPES.Event
    const eventConfig = config.eventMap[node.event] || {
        memberParent: "/Script/CoreUObject.Class'/Script/Engine.Actor'",
        memberName: node.event
    }
    
    const nodeName = ctx.getNextNodeName('K2Node_Event')
    const nodeGuid = generateGUID()
    const thenPinId = generateGUID()
    
    ctx.nodeMap.set(node.id, { t3dName: nodeName, config })
    ctx.registerPin(node.id, 'Then', nodeName, thenPinId)
    ctx.registerPin(node.id, 'then', nodeName, thenPinId) // Alias
    
    const lines = [
        `Begin Object Class=${config.class} Name="${nodeName}"`,
        `    EventReference=(MemberParent="${eventConfig.memberParent}",MemberName="${eventConfig.memberName}")`,
        `    bOverrideFunction=True`,
        `    NodePosX=${node.pos[0]}`,
        `    NodePosY=${node.pos[1]}`,
        `    NodeGuid=${nodeGuid}`,
        `    ${buildPin({ pinId: thenPinId, pinName: 'then', type: 'exec', isOutput: true })}`,
        `End Object`
    ]
    
    return lines.join('\n')
}

/**
 * Convert CallFunction node to T3D
 * @param {Object} node - Slim IR node
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function convertCallFunctionNode(node, ctx) {
    const config = BLUEPRINT_NODE_TYPES.CallFunction
    const funcConfig = getFunctionConfig(node.function) || {
        memberName: node.function
    }
    
    const nodeName = ctx.getNextNodeName('K2Node_CallFunction')
    const nodeGuid = generateGUID()
    const executePinId = generateGUID()
    const thenPinId = generateGUID()
    
    ctx.nodeMap.set(node.id, { t3dName: nodeName, config })
    ctx.registerPin(node.id, 'Execute', nodeName, executePinId)
    ctx.registerPin(node.id, 'execute', nodeName, executePinId) // Alias
    ctx.registerPin(node.id, 'then', nodeName, thenPinId)
    
    // Build FunctionReference
    let funcRef
    if (funcConfig.bSelfContext) {
        funcRef = `FunctionReference=(MemberName="${funcConfig.memberName}",bSelfContext=True)`
    } else if (funcConfig.memberParent) {
        funcRef = `FunctionReference=(MemberParent="${funcConfig.memberParent}",MemberName="${funcConfig.memberName}")`
    } else {
        funcRef = `FunctionReference=(MemberName="${funcConfig.memberName}")`
    }
    
    const lines = [
        `Begin Object Class=${config.class} Name="${nodeName}"`,
        `    ${funcRef}`,
        `    NodePosX=${node.pos[0]}`,
        `    NodePosY=${node.pos[1]}`,
        `    NodeGuid=${nodeGuid}`
    ]
    
    // Add isPure if applicable
    if (funcConfig.isPure) {
        lines.splice(2, 0, `    bIsPureFunc=True`)
    }
    
    // Add Execute pin (only for non-pure functions)
    if (!funcConfig.isPure) {
        lines.push(`    ${buildPin({ pinId: executePinId, pinName: 'Execute', type: 'exec' })}`)
        lines.push(`    ${buildPin({ pinId: thenPinId, pinName: 'then', type: 'exec', isOutput: true })}`)
    }
    
    // Add extra input pins
    if (funcConfig.extraPins?.input) {
        for (const pin of funcConfig.extraPins.input) {
            const pinId = generateGUID()
            const inputValue = node.inputs?.[pin.name] ?? pin.default
            ctx.registerPin(node.id, pin.name, nodeName, pinId)
            
            lines.push(`    ${buildPin({
                pinId,
                pinName: pin.name,
                type: pin.type,
                defaultValue: inputValue,
                hidden: pin.hidden
            })}`)
        }
    }
    
    // Add extra output pins
    if (funcConfig.extraPins?.output) {
        for (const pin of funcConfig.extraPins.output) {
            const pinId = generateGUID()
            ctx.registerPin(node.id, pin.name, nodeName, pinId)
            
            lines.push(`    ${buildPin({
                pinId,
                pinName: pin.name,
                type: pin.type,
                isOutput: true
            })}`)
        }
    }
    
    lines.push(`End Object`)
    return lines.join('\n')
}

/**
 * Convert Branch node to T3D
 * @param {Object} node - Slim IR node
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function convertBranchNode(node, ctx) {
    const config = BLUEPRINT_NODE_TYPES.Branch
    const nodeName = ctx.getNextNodeName('K2Node_IfThenElse')
    const nodeGuid = generateGUID()
    
    const executePinId = generateGUID()
    const conditionPinId = generateGUID()
    const thenPinId = generateGUID()
    const elsePinId = generateGUID()
    
    ctx.nodeMap.set(node.id, { t3dName: nodeName, config })
    ctx.registerPin(node.id, 'Execute', nodeName, executePinId)
    ctx.registerPin(node.id, 'execute', nodeName, executePinId) // Alias
    ctx.registerPin(node.id, 'Condition', nodeName, conditionPinId)
    ctx.registerPin(node.id, 'Then', nodeName, thenPinId)
    ctx.registerPin(node.id, 'true', nodeName, thenPinId)  // Alias
    ctx.registerPin(node.id, 'Else', nodeName, elsePinId)
    ctx.registerPin(node.id, 'false', nodeName, elsePinId)  // Alias
    
    const lines = [
        `Begin Object Class=${config.class} Name="${nodeName}"`,
        `    NodePosX=${node.pos[0]}`,
        `    NodePosY=${node.pos[1]}`,
        `    NodeGuid=${nodeGuid}`,
        `    ${buildPin({ pinId: executePinId, pinName: 'Execute', type: 'exec' })}`,
        `    ${buildPin({ pinId: conditionPinId, pinName: 'Condition', type: 'bool' })}`,
        `    ${buildPin({ pinId: thenPinId, pinName: 'Then', type: 'exec', isOutput: true })}`,
        `    ${buildPin({ pinId: elsePinId, pinName: 'Else', type: 'exec', isOutput: true })}`,
        `End Object`
    ]
    
    return lines.join('\n')
}

/**
 * Convert Sequence node to T3D
 * @param {Object} node - Slim IR node
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function convertSequenceNode(node, ctx) {
    const config = BLUEPRINT_NODE_TYPES.Sequence
    const nodeName = ctx.getNextNodeName('K2Node_ExecutionSequence')
    const nodeGuid = generateGUID()
    
    const executePinId = generateGUID()
    ctx.nodeMap.set(node.id, { t3dName: nodeName, config })
    ctx.registerPin(node.id, 'Execute', nodeName, executePinId)
    ctx.registerPin(node.id, 'execute', nodeName, executePinId) // Alias
    
    const lines = [
        `Begin Object Class=${config.class} Name="${nodeName}"`,
        `    NodePosX=${node.pos[0]}`,
        `    NodePosY=${node.pos[1]}`,
        `    NodeGuid=${nodeGuid}`,
        `    ${buildPin({ pinId: executePinId, pinName: 'Execute', type: 'exec' })}`
    ]
    
    // Add output pins (default 2, can be more based on connections)
    const numOutputs = node.outputs || 2
    for (let i = 0; i < numOutputs; i++) {
        const pinId = generateGUID()
        const pinName = `then ${i}`
        ctx.registerPin(node.id, pinName, nodeName, pinId)
        lines.push(`    ${buildPin({ pinId, pinName, type: 'exec', isOutput: true })}`)
    }
    
    lines.push(`End Object`)
    return lines.join('\n')
}

/**
 * Convert CustomEvent node to T3D
 * @param {Object} node - Slim IR node
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function convertCustomEventNode(node, ctx) {
    const config = BLUEPRINT_NODE_TYPES.CustomEvent
    const nodeName = ctx.getNextNodeName('K2Node_CustomEvent')
    const nodeGuid = generateGUID()
    const thenPinId = generateGUID()
    
    ctx.nodeMap.set(node.id, { t3dName: nodeName, config })
    ctx.registerPin(node.id, 'Then', nodeName, thenPinId)
    ctx.registerPin(node.id, 'then', nodeName, thenPinId) // Alias
    
    const eventName = node.eventName || node.inputs?.eventName || 'CustomEvent'
    
    const lines = [
        `Begin Object Class=${config.class} Name="${nodeName}"`,
        `    CustomFunctionName="${eventName}"`,
        `    NodePosX=${node.pos[0]}`,
        `    NodePosY=${node.pos[1]}`,
        `    NodeGuid=${nodeGuid}`,
        `    ${buildPin({ pinId: thenPinId, pinName: 'then', type: 'exec', isOutput: true })}`,
        `End Object`
    ]
    
    return lines.join('\n')
}

// ============================================================================
// Variable Node Converters
// ============================================================================

/**
 * Convert VariableGet node to T3D
 * 将 VariableGet 节点转换为 T3D 格式
 * @param {Object} node - Slim IR node
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function convertVariableGetNode(node, ctx) {
    const config = BLUEPRINT_NODE_TYPES.VariableGet
    const nodeName = ctx.getNextNodeName('K2Node_VariableGet')
    const nodeGuid = generateGUID()
    const valuePinId = generateGUID()
    const selfPinId = generateGUID()
    
    // 变量名可以来自 variableName 字段或 inputs.variableName
    const variableName = node.variableName || node.inputs?.variableName || 'NewVar'
    // 变量类型，默认为 float
    const variableType = node.variableType || node.inputs?.variableType || 'float'
    
    ctx.nodeMap.set(node.id, { t3dName: nodeName, config })
    ctx.registerPin(node.id, variableName, nodeName, valuePinId)
    ctx.registerPin(node.id, 'value', nodeName, valuePinId) // Alias
    ctx.registerPin(node.id, 'out', nodeName, valuePinId)   // Alias
    ctx.registerPin(node.id, 'Output', nodeName, valuePinId) // Alias
    
    // 构建 VariableReference
    const varGuid = generateGUID()
    
    const lines = [
        `Begin Object Class=${config.class} Name="${nodeName}"`,
        `    VariableReference=(MemberName="${variableName}",bSelfContext=True)`,
        `    NodePosX=${node.pos[0]}`,
        `    NodePosY=${node.pos[1]}`,
        `    NodeGuid=${nodeGuid}`,
        `    ${buildPin({ pinId: selfPinId, pinName: 'self', type: 'object', hidden: true })}`,
        `    ${buildPin({ pinId: valuePinId, pinName: variableName, type: variableType, isOutput: true })}`,
        `End Object`
    ]
    
    return lines.join('\n')
}

/**
 * Convert VariableSet node to T3D
 * 将 VariableSet 节点转换为 T3D 格式
 * @param {Object} node - Slim IR node
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function convertVariableSetNode(node, ctx) {
    const config = BLUEPRINT_NODE_TYPES.VariableSet
    const nodeName = ctx.getNextNodeName('K2Node_VariableSet')
    const nodeGuid = generateGUID()
    const executePinId = generateGUID()
    const thenPinId = generateGUID()
    const valuePinId = generateGUID()
    const outputPinId = generateGUID()
    const selfPinId = generateGUID()
    
    // 变量名可以来自 variableName 字段或 inputs.variableName
    const variableName = node.variableName || node.inputs?.variableName || 'NewVar'
    // 变量类型，默认为 float
    const variableType = node.variableType || node.inputs?.variableType || 'float'
    // 默认值
    const defaultValue = node.inputs?.value ?? node.value ?? ''
    
    ctx.nodeMap.set(node.id, { t3dName: nodeName, config })
    ctx.registerPin(node.id, 'Execute', nodeName, executePinId)
    ctx.registerPin(node.id, 'execute', nodeName, executePinId) // Alias
    ctx.registerPin(node.id, 'then', nodeName, thenPinId)
    ctx.registerPin(node.id, 'value', nodeName, valuePinId)
    ctx.registerPin(node.id, variableName, nodeName, valuePinId)  // 用变量名作为 pin 名的别名
    ctx.registerPin(node.id, 'out', nodeName, outputPinId)  // 输出 pin
    
    // 构建 VariableReference
    const varGuid = generateGUID()
    
    const lines = [
        `Begin Object Class=${config.class} Name="${nodeName}"`,
        `    VariableReference=(MemberName="${variableName}",bSelfContext=True)`,
        `    NodePosX=${node.pos[0]}`,
        `    NodePosY=${node.pos[1]}`,
        `    NodeGuid=${nodeGuid}`,
        `    ${buildPin({ pinId: executePinId, pinName: 'Execute', type: 'exec' })}`,
        `    ${buildPin({ pinId: thenPinId, pinName: 'Then', type: 'exec', isOutput: true })}`,
        `    ${buildPin({ pinId: selfPinId, pinName: 'self', type: 'object', hidden: true })}`,
        `    ${buildPin({ pinId: valuePinId, pinName: variableName, type: variableType, defaultValue: defaultValue })}`,
        `    ${buildPin({ pinId: outputPinId, pinName: variableName, type: variableType, isOutput: true })}`,
        `End Object`
    ]
    
    return lines.join('\n')
}

// ============================================================================
// Material Node Converters
// ============================================================================

/**
 * Convert Material Constant3Vector node to T3D
 * @param {Object} node - Slim IR node
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function convertConstant3VectorNode(node, ctx) {
    const config = MATERIAL_NODE_TYPES.Constant3Vector
    const wrapperName = `MaterialGraphNode_${ctx.nodeCounter.GraphNode++}`
    const exprName = `MaterialExpressionConstant3Vector_${ctx.nodeCounter.GraphNode}`
    const nodeGuid = generateGUID()
    const exprGuid = generateGUID()
    const outputPinId = generateGUID()
    
    ctx.nodeMap.set(node.id, { t3dName: wrapperName, exprName })
    ctx.registerPin(node.id, 'out', wrapperName, outputPinId)
    ctx.registerPin(node.id, 'Output', wrapperName, outputPinId)
    
    const value = node.value || [1, 1, 1]
    const [r, g, b] = value
    
    const lines = [
        `Begin Object Class=${config.wrapperClass} Name="${wrapperName}"`,
        `    Begin Object Class=${config.class} Name="${exprName}"`,
        `    End Object`,
        `    Begin Object Name="${exprName}"`,
        `        Constant=(R=${r},G=${g},B=${b},A=0.0)`,
        `        MaterialExpressionEditorX=${node.pos[0]}`,
        `        MaterialExpressionEditorY=${node.pos[1]}`,
        `        MaterialExpressionGuid=${exprGuid}`,
        `    End Object`,
        `    MaterialExpression=${config.class}'"${exprName}"'`,
        `    NodePosX=${node.pos[0]}`,
        `    NodePosY=${node.pos[1]}`,
        `    NodeGuid=${nodeGuid}`,
        `    ${buildPin({ pinId: outputPinId, pinName: 'Output', type: 'mask', isOutput: true })}`,
        `End Object`
    ]
    
    return lines.join('\n')
}

// ============================================================================
// Main Converter
// ============================================================================

/**
 * Convert a Slim IR node to T3D
 * @param {Object} node - Slim IR node
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function convertNode(node, ctx) {
    if (ctx.graphMode === 'material') {
        switch (node.type) {
            case 'Constant3Vector': return convertConstant3VectorNode(node, ctx)
            // Add more material node converters here
            default:
                console.warn(`[SlimIRToT3D] Unknown material node type: ${node.type}`)
                return ''
        }
    } else {
        switch (node.type) {
            case 'Event': return convertEventNode(node, ctx)
            case 'CallFunction': return convertCallFunctionNode(node, ctx)
            case 'Branch': return convertBranchNode(node, ctx)
            case 'Sequence': return convertSequenceNode(node, ctx)
            case 'CustomEvent': return convertCustomEventNode(node, ctx)
            case 'Variable':      // LLM 可能使用的别名
            case 'VariableGet': return convertVariableGetNode(node, ctx)
            case 'VariableSet': return convertVariableSetNode(node, ctx)
            // Add more blueprint node converters here
            default:
                console.warn(`[SlimIRToT3D] Unknown blueprint node type: ${node.type}`)
                return ''
        }
    }
}

/**
 * Inject LinkedTo connections into T3D
 * @param {string} t3d - Generated T3D
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function injectConnections(t3d, ctx) {
    let result = t3d
    
    for (const [pinKey, connections] of ctx.connectionMap) {
        const pinInfo = ctx.pinMap.get(pinKey)
        if (!pinInfo || connections.length === 0) continue
        
        const linkedToStr = `LinkedTo=(${connections.map(c => `${c.nodeName} ${c.pinId}`).join(',')},)`
        
        // Find the pin by its PinId and inject LinkedTo before bOrphanedPin=False
        // Use string search instead of regex to avoid issues with nested parentheses
        const pinIdMarker = `PinId=${pinInfo.pinId}`
        const pinStart = result.indexOf(pinIdMarker)
        
        if (pinStart === -1) {
            console.warn(`[SlimIRToT3D] Could not find pin ${pinInfo.pinId} for connection injection`)
            continue
        }
        
        // Find the bOrphanedPin=False after this pin's start
        const orphanMarker = ',bOrphanedPin=False'
        const orphanPos = result.indexOf(orphanMarker, pinStart)
        
        if (orphanPos === -1) {
            console.warn(`[SlimIRToT3D] Could not find bOrphanedPin for pin ${pinInfo.pinId}`)
            continue
        }
        
        // Insert LinkedTo before bOrphanedPin
        // Note: buildPin adds a trailing comma, so we should too before LinkedTo
        result = result.substring(0, orphanPos) + ',' + linkedToStr + result.substring(orphanPos)
    }
    
    return result
}

/**
 * Main conversion function: Slim IR → T3D
 * @param {Object} ir - Slim IR object
 * @param {string} graphMode - 'blueprint' or 'material'
 * @returns {{success: boolean, t3d?: string, errors?: string[]}}
 */
export function convertSlimIRToT3D(ir, graphMode = 'blueprint') {
    // Validate first
    const validation = validateSlimIR(ir, graphMode)
    if (!validation.valid) {
        return { success: false, errors: validation.errors }
    }
    
    const ctx = new ConversionContext(graphMode)
    
    // Phase 1: Convert all nodes (this also registers pins)
    const nodeT3Ds = []
    for (const node of ir.nodes) {
        const t3d = convertNode(node, ctx)
        if (t3d) {
            nodeT3Ds.push(t3d)
        }
    }
    
    // Phase 2: Process connections
    ctx.processConnections(ir.connections)
    
    // Phase 3: Combine and inject connections
    let t3d = nodeT3Ds.join('\n')
    t3d = injectConnections(t3d, ctx)
    
    return { success: true, t3d }
}

export default {
    convertSlimIRToT3D,
    generateGUID
}
