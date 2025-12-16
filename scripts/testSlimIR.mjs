/**
 * Node.js test for Slim IR Experiment
 * Run: node scripts/testSlimIR.mjs
 */

// ============================================================================
// Inline copy of SlimIRExperiment logic (to avoid ES module issues)
// ============================================================================

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

function generateGUID() {
    const chars = '0123456789ABCDEF'
    let result = ''
    for (let i = 0; i < 32; i++) {
        result += chars[Math.floor(Math.random() * 16)]
    }
    return result
}

function buildPinFlags() {
    return `PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,`
}

function buildExecPin(pinId, pinName, direction = "input", linkedTo = null) {
    const dirStr = direction === "output" ? `Direction="EGPD_Output",` : ""
    const linkedStr = linkedTo ? `LinkedTo=(${linkedTo}),` : ""
    return `CustomProperties Pin (PinId=${pinId},PinName="${pinName}",${dirStr}PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,${buildPinFlags()}${linkedStr})`
}

function buildStringPin(pinId, pinName, defaultValue = "Hello") {
    return `CustomProperties Pin (PinId=${pinId},PinName="${pinName}",PinType.PinCategory="string",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,${buildPinFlags()}DefaultValue="${defaultValue}",)`
}

function buildFloatPin(pinId, pinName, defaultValue = 0.2) {
    return `CustomProperties Pin (PinId=${pinId},PinName="${pinName}",PinType.PinCategory="real",PinType.PinSubCategory="float",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,${buildPinFlags()}DefaultValue="${defaultValue}",)`
}

function convertEventNode(node, pinMap) {
    const nodeGuid = generateGUID()
    const thenPinId = generateGUID()
    
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

function convertCallFunctionNode(node, pinMap, nodeIndex) {
    const nodeGuid = generateGUID()
    const nodeName = `K2Node_CallFunction_${nodeIndex}`
    const executePinId = generateGUID()
    const thenPinId = generateGUID()
    
    pinMap[`${node.id}.execute`] = { nodeName, pinId: executePinId }
    pinMap[`${node.id}.then`] = { nodeName, pinId: thenPinId }
    
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

function convertSlimIRToT3D(ir) {
    const pinMap = {}
    const nodeT3Ds = []
    let callFunctionIndex = 0
    
    for (const node of ir.nodes) {
        if (node.type === "Event") {
            nodeT3Ds.push(convertEventNode(node, pinMap))
        } else if (node.type === "CallFunction") {
            nodeT3Ds.push(convertCallFunctionNode(node, pinMap, callFunctionIndex++))
        }
    }
    
    const connectionMap = {}
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
    
    let t3d = nodeT3Ds.join('\n')
    
    for (const [targetKey, sources] of Object.entries(connectionMap)) {
        const targetPin = pinMap[targetKey]
        if (targetPin) {
            const linkedToStr = `LinkedTo=(${sources.join(',')},)`
            const pinPattern = new RegExp(`(PinId=${targetPin.pinId}[^)]*?)(\\))`, 's')
            t3d = t3d.replace(pinPattern, `$1${linkedToStr}$2`)
        }
    }
    
    return t3d
}

// ============================================================================
// Run Test
// ============================================================================

console.log('\n' + '='.repeat(60))
console.log('🧪 SLIM IR EXPERIMENT')
console.log('='.repeat(60))

const ir = EXAMPLE_SLIM_IR
const irJson = JSON.stringify(ir)
console.log('\n📥 INPUT: Slim IR')
console.log(`   Size: ${irJson.length} bytes`)
console.log(`   Nodes: ${ir.nodes.length}`)
console.log(`   Connections: ${ir.connections.length}`)

console.log('\n📤 OUTPUT: T3D')
const t3d = convertSlimIRToT3D(ir)
console.log(`   Size: ${t3d.length} bytes`)

console.log('\n📊 STATS')
console.log(`   IR → T3D expansion: ${(t3d.length / irJson.length).toFixed(1)}x`)
console.log(`   Token savings: ${((1 - irJson.length / t3d.length) * 100).toFixed(1)}%`)

console.log('\n📝 GENERATED T3D:')
console.log('-'.repeat(60))
console.log(t3d)
console.log('-'.repeat(60))

// Basic validation
const hasBeginObj = t3d.includes('Begin Object')
const hasEndObj = t3d.includes('End Object')
const hasGuid = /NodeGuid=[0-9A-F]{32}/.test(t3d)
const hasLinkedTo = t3d.includes('LinkedTo=')
const hasPins = t3d.includes('CustomProperties Pin')

console.log('\n✅ VALIDATION:')
console.log(`   Begin/End Object: ${hasBeginObj && hasEndObj ? '✓' : '✗'}`)
console.log(`   Valid NodeGuid: ${hasGuid ? '✓' : '✗'}`)
console.log(`   Has LinkedTo: ${hasLinkedTo ? '✓' : '✗'}`)
console.log(`   Has Pins: ${hasPins ? '✓' : '✗'}`)

if (hasBeginObj && hasEndObj && hasGuid && hasLinkedTo && hasPins) {
    console.log('\n🎉 SUCCESS! T3D structure looks valid.')
    console.log('   → Next step: Test with Grammar.parse() in browser')
} else {
    console.log('\n❌ FAIL: Some validation checks failed')
}

console.log('\n' + '='.repeat(60))
