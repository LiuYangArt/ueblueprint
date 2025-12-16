/**
 * Slim IR Experiment - Minimum Viable Proof of Concept
 * 
 * This is a quick experiment to validate that:
 * 1. We can define a compact JSON format (Slim IR)
 * 2. We can convert it to valid T3D
 * 3. The T3D can be parsed by the existing Grammar parser
 * 
 * Usage:
 *   import { runExperiment } from './SlimIRExperiment.js'
 *   const result = runExperiment()
 *   // result.success, result.t3d, result.parsed
 */

// ============================================================================
// Slim IR Format Definition
// ============================================================================

/**
 * Example Slim IR for "BeginPlay → PrintString → Delay"
 */
const EXAMPLE_SLIM_IR = {
    nodes: [
        {
            type: "Event",
            event: "ReceiveBeginPlay",
            id: "Event_0",
            pos: [0, 0]
        },
        {
            type: "CallFunction",
            function: "PrintString",
            id: "Print_0",
            pos: [300, 0],
            inputs: {
                InString: "Hello from Slim IR!"
            }
        },
        {
            type: "CallFunction",
            function: "Delay",
            id: "Delay_0",
            pos: [600, 0],
            inputs: {
                Duration: 2.0
            }
        }
    ],
    connections: [
        ["Event_0.then", "Print_0.execute"],
        ["Print_0.then", "Delay_0.execute"]
    ]
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Generate a random 32-character hex GUID
 */
function generateGUID() {
    const chars = '0123456789ABCDEF'
    let result = ''
    for (let i = 0; i < 32; i++) {
        result += chars[Math.floor(Math.random() * 16)]
    }
    return result
}

/**
 * Build standard Pin boolean flags
 */
function buildPinFlags() {
    return `PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,`
}

/**
 * Build an exec pin definition
 */
function buildExecPin(pinId, pinName, direction = "input", linkedTo = null) {
    const dirStr = direction === "output" ? `Direction="EGPD_Output",` : ""
    const linkedStr = linkedTo ? `LinkedTo=(${linkedTo}),` : ""
    return `CustomProperties Pin (PinId=${pinId},PinName="${pinName}",${dirStr}PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,${buildPinFlags()}${linkedStr})`
}

/**
 * Build a string input pin
 */
function buildStringPin(pinId, pinName, defaultValue = "Hello") {
    return `CustomProperties Pin (PinId=${pinId},PinName="${pinName}",PinType.PinCategory="string",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,${buildPinFlags()}DefaultValue="${defaultValue}",)`
}

/**
 * Build a float input pin
 */
function buildFloatPin(pinId, pinName, defaultValue = 0.2) {
    return `CustomProperties Pin (PinId=${pinId},PinName="${pinName}",PinType.PinCategory="real",PinType.PinSubCategory="float",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,${buildPinFlags()}DefaultValue="${defaultValue}",)`
}

// ============================================================================
// Node Converters
// ============================================================================

/**
 * Convert Event node to T3D
 */
function convertEventNode(node, pinMap) {
    const nodeGuid = generateGUID()
    const thenPinId = generateGUID()
    
    // Store pin mapping for connections
    pinMap[`${node.id}.then`] = { nodeName: `K2Node_Event_0`, pinId: thenPinId }
    
    return `Begin Object Class=/Script/BlueprintGraph.K2Node_Event Name="K2Node_Event_0"
    EventReference=(MemberParent="/Script/CoreUObject.Class'/Script/Engine.Actor'",MemberName="${node.event}")
    bOverrideFunction=True
    NodePosX=${node.pos[0]}
    NodePosY=${node.pos[1]}
    NodeGuid=${nodeGuid}
    ${buildExecPin(thenPinId, "then", "output")}
End Object`
}

/**
 * Convert CallFunction node to T3D
 */
function convertCallFunctionNode(node, pinMap, nodeIndex) {
    const nodeGuid = generateGUID()
    const nodeName = `K2Node_CallFunction_${nodeIndex}`
    const executePinId = generateGUID()
    const thenPinId = generateGUID()
    
    // Store pin mappings
    pinMap[`${node.id}.execute`] = { nodeName, pinId: executePinId }
    pinMap[`${node.id}.then`] = { nodeName, pinId: thenPinId }
    
    // Build function reference
    let funcRef = ""
    let extraPins = ""
    
    if (node.function === "PrintString") {
        funcRef = `FunctionReference=(MemberParent="/Script/CoreUObject.Class'/Script/Engine.KismetSystemLibrary'",MemberName="PrintString")`
        const stringPinId = generateGUID()
        pinMap[`${node.id}.InString`] = { nodeName, pinId: stringPinId }
        extraPins = buildStringPin(stringPinId, "InString", node.inputs?.InString || "Hello")
    } else if (node.function === "Delay") {
        funcRef = `FunctionReference=(MemberParent="/Script/CoreUObject.Class'/Script/Engine.KismetSystemLibrary'",MemberName="Delay")`
        const durationPinId = generateGUID()
        pinMap[`${node.id}.Duration`] = { nodeName, pinId: durationPinId }
        extraPins = buildFloatPin(durationPinId, "Duration", node.inputs?.Duration || 0.2)
    } else {
        // Generic function
        funcRef = `FunctionReference=(MemberName="${node.function}")`
    }
    
    return `Begin Object Class=/Script/BlueprintGraph.K2Node_CallFunction Name="${nodeName}"
    ${funcRef}
    NodePosX=${node.pos[0]}
    NodePosY=${node.pos[1]}
    NodeGuid=${nodeGuid}
    ${buildExecPin(executePinId, "execute", "input")}
    ${buildExecPin(thenPinId, "then", "output")}
    ${extraPins}
End Object`
}

// ============================================================================
// Main Converter
// ============================================================================

/**
 * Convert Slim IR to T3D
 * @param {Object} ir - Slim IR object
 * @returns {string} - T3D text
 */
export function convertSlimIRToT3D(ir) {
    const pinMap = {}
    const nodeT3Ds = []
    let callFunctionIndex = 0
    
    // Phase 1: Convert all nodes (without connection info)
    for (const node of ir.nodes) {
        if (node.type === "Event") {
            nodeT3Ds.push(convertEventNode(node, pinMap))
        } else if (node.type === "CallFunction") {
            nodeT3Ds.push(convertCallFunctionNode(node, pinMap, callFunctionIndex++))
        }
    }
    
    // Phase 2: Build connection map
    const connectionMap = {} // targetPinKey -> [sourceNodeName sourcePinId, ...]
    for (const [source, target] of ir.connections) {
        const sourcePin = pinMap[source]
        const targetPin = pinMap[target]
        if (sourcePin && targetPin) {
            if (!connectionMap[target]) {
                connectionMap[target] = []
            }
            connectionMap[target].push(`${sourcePin.nodeName} ${sourcePin.pinId}`)
        }
    }
    
    // Phase 3: Inject LinkedTo into T3D
    let t3d = nodeT3Ds.join('\n')
    
    for (const [targetKey, sources] of Object.entries(connectionMap)) {
        const targetPin = pinMap[targetKey]
        if (targetPin) {
            // Find and update the pin with LinkedTo
            const linkedToStr = `LinkedTo=(${sources.join(',')},)`
            const pinPattern = new RegExp(`(PinId=${targetPin.pinId}[^)]*?)(\\))`, 's')
            t3d = t3d.replace(pinPattern, `$1${linkedToStr}$2`)
        }
    }
    
    return t3d
}

// ============================================================================
// Experiment Runner
// ============================================================================

/**
 * Run the minimum viable experiment
 * @returns {Object} { success, ir, t3d, parsed?, error? }
 */
export function runExperiment() {
    console.group('%c[Slim IR Experiment]', 'color: #00d4ff; font-weight: bold')
    
    const ir = EXAMPLE_SLIM_IR
    console.log('Input Slim IR:', JSON.stringify(ir, null, 2))
    console.log('IR size:', JSON.stringify(ir).length, 'bytes')
    
    try {
        // Step 1: Convert to T3D
        const t3d = convertSlimIRToT3D(ir)
        console.log('Generated T3D:', t3d)
        console.log('T3D size:', t3d.length, 'bytes')
        console.log('Compression ratio:', (JSON.stringify(ir).length / t3d.length * 100).toFixed(1) + '%')
        
        // Step 2: Try to parse with Grammar (optional - requires Grammar to be available)
        let parsed = null
        try {
            // Dynamic import to avoid circular deps
            const Grammar = (await import('../parser/Grammar.js')).default
            parsed = Grammar.parse(t3d)
            console.log('%c✓ Grammar.parse succeeded!', 'color: #00ff00')
            console.log('Parsed nodes:', parsed?.length || 0)
        } catch (parseErr) {
            console.warn('Grammar.parse not available or failed:', parseErr.message)
        }
        
        console.groupEnd()
        return { success: true, ir, t3d, parsed }
        
    } catch (err) {
        console.error('Experiment failed:', err)
        console.groupEnd()
        return { success: false, ir, error: err.message }
    }
}

// Quick test function for console
export function quickTest() {
    const result = runExperiment()
    if (result.success) {
        console.log('\n=== COPY THIS T3D TO TEST IN AI-DEMO ===')
        console.log(result.t3d)
        console.log('=== END T3D ===\n')
    }
    return result
}

export { EXAMPLE_SLIM_IR }
