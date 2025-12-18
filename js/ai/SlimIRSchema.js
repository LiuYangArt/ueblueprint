/**
 * Slim IR Schema - Type definitions and validation
 * 
 * This module defines the Slim IR format specification and provides
 * validation utilities for ensuring IR correctness before conversion.
 */

// ============================================================================
// Blueprint Node Type Definitions
// ============================================================================

/**
 * Blueprint node type configurations
 * Each entry defines the UE class, default pins, and any special handling
 */
export const BLUEPRINT_NODE_TYPES = {
    // Events
    Event: {
        class: '/Script/BlueprintGraph.K2Node_Event',
        pins: {
            output: ['then']
        },
        requiredFields: ['event'],
        eventMap: {
            'ReceiveBeginPlay': { memberParent: "/Script/CoreUObject.Class'/Script/Engine.Actor'", memberName: 'ReceiveBeginPlay' },
            'ReceiveTick': { memberParent: "/Script/CoreUObject.Class'/Script/Engine.Actor'", memberName: 'ReceiveTick' },
            'ReceiveDestroyed': { memberParent: "/Script/CoreUObject.Class'/Script/Engine.Actor'", memberName: 'ReceiveDestroyed' },
        }
    },
    
    CustomEvent: {
        class: '/Script/BlueprintGraph.K2Node_CustomEvent',
        pins: {
            output: ['then']
        },
        requiredFields: ['eventName']
    },
    
    // Function Calls
    CallFunction: {
        class: '/Script/BlueprintGraph.K2Node_CallFunction',
        pins: {
            input: ['execute'],
            output: ['then']
        },
        requiredFields: ['function'],
        functionMap: {
            'PrintString': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.KismetSystemLibrary'",
                memberName: 'PrintString',
                extraPins: {
                    input: [
                        { name: 'InString', type: 'string', default: 'Hello' },
                        { name: 'bPrintToScreen', type: 'bool', default: 'true', hidden: true },
                        { name: 'bPrintToLog', type: 'bool', default: 'true', hidden: true },
                        { name: 'TextColor', type: 'linearcolor', default: '(R=0.0,G=0.66,B=1.0,A=1.0)', hidden: true },
                        { name: 'Duration', type: 'float', default: '2.0', hidden: true }
                    ]
                }
            },
            'Delay': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.KismetSystemLibrary'",
                memberName: 'Delay',
                extraPins: {
                    input: [
                        { name: 'Duration', type: 'float', default: '0.2' }
                    ]
                }
            },
            'GetActorLocation': {
                memberName: 'K2_GetActorLocation',
                bSelfContext: true,
                extraPins: {
                    output: [
                        { name: 'ReturnValue', type: 'vector' }
                    ]
                }
            },
            'SetActorLocation': {
                memberName: 'K2_SetActorLocation',
                bSelfContext: true,
                extraPins: {
                    input: [
                        { name: 'NewLocation', type: 'vector' },
                        { name: 'bSweep', type: 'bool', default: 'false' },
                        { name: 'bTeleport', type: 'bool', default: 'false' }
                    ],
                    output: [
                        { name: 'ReturnValue', type: 'bool' }
                    ]
                }
            },
            'SpawnActor': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.GameplayStatics'",
                memberName: 'BeginDeferredActorSpawnFromClass',
                extraPins: {
                    input: [
                        { name: 'ActorClass', type: 'class' },
                        { name: 'SpawnTransform', type: 'transform' }
                    ],
                    output: [
                        { name: 'ReturnValue', type: 'object' }
                    ]
                }
            },
            'MakeVector': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.KismetMathLibrary'",
                memberName: 'MakeVector',
                isPure: true,
                extraPins: {
                    input: [
                        { name: 'X', type: 'float', default: '0' },
                        { name: 'Y', type: 'float', default: '0' },
                        { name: 'Z', type: 'float', default: '0' }
                    ],
                    output: [
                        { name: 'ReturnValue', type: 'vector' }
                    ]
                }
            }
        }
    },
    
    // Flow Control
    Branch: {
        class: '/Script/BlueprintGraph.K2Node_IfThenElse',
        pins: {
            input: ['execute', 'Condition'],
            output: ['Then', 'Else']
        }
    },
    
    Sequence: {
        class: '/Script/BlueprintGraph.K2Node_ExecutionSequence',
        pins: {
            input: ['execute'],
            output: ['then 0', 'then 1']  // Dynamic, can have more
        }
    },
    
    DoOnce: {
        class: '/Script/BlueprintGraph.K2Node_MacroInstance',
        macroGraph: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:DoOnce",
        pins: {
            input: ['execute', 'Reset', 'Start Closed'],
            output: ['Completed']
        }
    },
    
    FlipFlop: {
        class: '/Script/BlueprintGraph.K2Node_MacroInstance',
        macroGraph: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:FlipFlop",
        pins: {
            input: ['execute'],
            output: ['A', 'B', 'IsA']
        }
    },
    
    ForEachLoop: {
        class: '/Script/BlueprintGraph.K2Node_MacroInstance',
        macroGraph: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForEachLoop",
        pins: {
            input: ['Exec', 'Array'],
            output: ['LoopBody', 'Array Element', 'Array Index', 'Completed']
        }
    },
    
    // Variables
    VariableGet: {
        class: '/Script/BlueprintGraph.K2Node_VariableGet',
        requiredFields: ['variableName'],
        pins: {
            output: ['value']
        }
    },
    
    VariableSet: {
        class: '/Script/BlueprintGraph.K2Node_VariableSet',
        requiredFields: ['variableName'],
        pins: {
            input: ['execute', 'value'],
            output: ['then']
        }
    },
    
    // Alias: LLM 可能会使用 'Variable' 而不是 'VariableGet'
    Variable: {
        class: '/Script/BlueprintGraph.K2Node_VariableGet',
        requiredFields: ['variableName'],
        pins: {
            output: ['value']
        },
        isAlias: true,  // 标记为别名，方便调试
        aliasOf: 'VariableGet'
    }
}

// ============================================================================
// Material Node Type Definitions
// ============================================================================

export const MATERIAL_NODE_TYPES = {
    Constant: {
        class: '/Script/Engine.MaterialExpressionConstant',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            output: ['Output']
        },
        properties: ['R']
    },
    
    Constant3Vector: {
        class: '/Script/Engine.MaterialExpressionConstant3Vector',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            output: ['Output']
        },
        properties: ['Constant']  // (R=,G=,B=,A=)
    },
    
    Constant4Vector: {
        class: '/Script/Engine.MaterialExpressionConstant4Vector',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            output: ['Output']
        },
        properties: ['Constant']
    },
    
    Add: {
        class: '/Script/Engine.MaterialExpressionAdd',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            input: ['A', 'B'],
            output: ['Output']
        }
    },
    
    Multiply: {
        class: '/Script/Engine.MaterialExpressionMultiply',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            input: ['A', 'B'],
            output: ['Output']
        }
    },
    
    Lerp: {
        class: '/Script/Engine.MaterialExpressionLinearInterpolate',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            input: ['A', 'B', 'Alpha'],
            output: ['Output']
        }
    },
    
    TextureSample: {
        class: '/Script/Engine.MaterialExpressionTextureSample',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            input: ['UVs'],
            output: ['RGB', 'R', 'G', 'B', 'A']
        }
    },
    
    TexCoord: {
        class: '/Script/Engine.MaterialExpressionTextureCoordinate',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            output: ['Output']
        }
    },
    
    ScalarParameter: {
        class: '/Script/Engine.MaterialExpressionScalarParameter',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        requiredFields: ['parameterName'],
        pins: {
            output: ['Output']
        },
        properties: ['ParameterName', 'DefaultValue']
    },
    
    VectorParameter: {
        class: '/Script/Engine.MaterialExpressionVectorParameter',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        requiredFields: ['parameterName'],
        pins: {
            output: ['Output']
        },
        properties: ['ParameterName', 'DefaultValue']
    },
    
    Time: {
        class: '/Script/Engine.MaterialExpressionTime',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            output: ['Output']
        }
    },
    
    Sine: {
        class: '/Script/Engine.MaterialExpressionSine',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            input: ['Input'],
            output: ['Output']
        }
    }
}

// ============================================================================
// Pin Type Definitions
// ============================================================================

export const PIN_TYPES = {
    exec: {
        category: 'exec',
        subCategory: '',
        subCategoryObject: 'None'
    },
    bool: {
        category: 'bool',
        subCategory: '',
        subCategoryObject: 'None'
    },
    int: {
        category: 'int',
        subCategory: '',
        subCategoryObject: 'None'
    },
    float: {
        category: 'real',
        subCategory: 'float',
        subCategoryObject: 'None'
    },
    string: {
        category: 'string',
        subCategory: '',
        subCategoryObject: 'None'
    },
    vector: {
        category: 'struct',
        subCategory: '',
        subCategoryObject: "/Script/CoreUObject.ScriptStruct'/Script/CoreUObject.Vector'"
    },
    rotator: {
        category: 'struct',
        subCategory: '',
        subCategoryObject: "/Script/CoreUObject.ScriptStruct'/Script/CoreUObject.Rotator'"
    },
    transform: {
        category: 'struct',
        subCategory: '',
        subCategoryObject: "/Script/CoreUObject.ScriptStruct'/Script/CoreUObject.Transform'"
    },
    object: {
        category: 'object',
        subCategory: '',
        subCategoryObject: "/Script/CoreUObject.Class'/Script/CoreUObject.Object'"
    },
    class: {
        category: 'class',
        subCategory: '',
        subCategoryObject: 'None'
    },
    linearcolor: {
        category: 'struct',
        subCategory: '',
        subCategoryObject: "/Script/CoreUObject.ScriptStruct'/Script/CoreUObject.LinearColor'"
    }
}

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validate a Slim IR object
 * @param {Object} ir - The Slim IR to validate
 * @param {string} graphMode - 'blueprint' or 'material'
 * @returns {{valid: boolean, errors: string[]}}
 */
export function validateSlimIR(ir, graphMode = 'blueprint') {
    const errors = []
    
    // Check top-level structure
    if (!ir || typeof ir !== 'object') {
        return { valid: false, errors: ['IR must be an object'] }
    }
    
    if (!Array.isArray(ir.nodes)) {
        errors.push('IR.nodes must be an array')
    }
    
    if (!Array.isArray(ir.connections)) {
        errors.push('IR.connections must be an array')
    }
    
    if (errors.length > 0) {
        return { valid: false, errors }
    }
    
    const nodeTypes = graphMode === 'material' ? MATERIAL_NODE_TYPES : BLUEPRINT_NODE_TYPES
    const nodeIds = new Set()
    
    // Validate each node
    for (let i = 0; i < ir.nodes.length; i++) {
        const node = ir.nodes[i]
        const prefix = `nodes[${i}]`
        
        // Required fields
        if (!node.type) {
            errors.push(`${prefix}: missing 'type'`)
        } else if (!nodeTypes[node.type]) {
            errors.push(`${prefix}: unknown type '${node.type}'`)
        }
        
        if (!node.id) {
            errors.push(`${prefix}: missing 'id'`)
        } else if (nodeIds.has(node.id)) {
            errors.push(`${prefix}: duplicate id '${node.id}'`)
        } else {
            nodeIds.add(node.id)
        }
        
        if (!Array.isArray(node.pos) || node.pos.length !== 2) {
            errors.push(`${prefix}: 'pos' must be [x, y] array`)
        }
        
        // Type-specific required fields
        if (node.type && nodeTypes[node.type]?.requiredFields) {
            for (const field of nodeTypes[node.type].requiredFields) {
                if (node[field] === undefined && (!node.inputs || node.inputs[field] === undefined)) {
                    errors.push(`${prefix}: missing required field '${field}' for type '${node.type}'`)
                }
            }
        }
    }
    
    // Validate connections
    for (let i = 0; i < ir.connections.length; i++) {
        const conn = ir.connections[i]
        const prefix = `connections[${i}]`
        
        if (!Array.isArray(conn) || conn.length !== 2) {
            errors.push(`${prefix}: must be [source, target] array`)
            continue
        }
        
        const [source, target] = conn
        
        // Validate format "nodeId.pinName"
        for (const [label, pinRef] of [['source', source], ['target', target]]) {
            if (typeof pinRef !== 'string' || !pinRef.includes('.')) {
                errors.push(`${prefix}: ${label} must be "nodeId.pinName" format`)
            } else {
                const [nodeId] = pinRef.split('.')
                if (!nodeIds.has(nodeId)) {
                    errors.push(`${prefix}: ${label} references unknown node '${nodeId}'`)
                }
            }
        }
    }
    
    return { valid: errors.length === 0, errors }
}

/**
 * Get node type configuration
 * @param {string} type - Node type name
 * @param {string} graphMode - 'blueprint' or 'material'
 * @returns {Object|null}
 */
export function getNodeTypeConfig(type, graphMode = 'blueprint') {
    const nodeTypes = graphMode === 'material' ? MATERIAL_NODE_TYPES : BLUEPRINT_NODE_TYPES
    return nodeTypes[type] || null
}

/**
 * Get function configuration for CallFunction nodes
 * @param {string} functionName - Function name
 * @returns {Object|null}
 */
export function getFunctionConfig(functionName) {
    return BLUEPRINT_NODE_TYPES.CallFunction.functionMap[functionName] || null
}

export default {
    BLUEPRINT_NODE_TYPES,
    MATERIAL_NODE_TYPES,
    PIN_TYPES,
    validateSlimIR,
    getNodeTypeConfig,
    getFunctionConfig
}
