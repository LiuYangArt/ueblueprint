import { convertSlimIRToT3D } from './js/ai/SlimIRToT3D.js'

const testIR = {
    nodes: [
        {
            type: "Event",
            event: "ReceiveTick",
            id: "tick",
            pos: [0, 0]
        },
        {
            type: "CallFunction",
            function: "GetGameTimeInSeconds",
            id: "time",
            pos: [0, 200]
        },
        {
            type: "CallFunction",
            function: "Sin",
            id: "sin",
            pos: [300, 200]
        },
        {
            type: "CallFunction",
            function: "SetCustomPrimitiveDataFloat",
            id: "set",
            pos: [600, 0],
            inputs: { DataIndex: 0 }
        },
        {
            type: "VariableGet",
            variableName: "StaticMesh",
            id: "mesh",
            pos: [600, -100]
        }
    ],
    connections: [
        ["tick.Then", "set.Execute"],
        ["time.ReturnValue", "sin.A"],
        ["sin.ReturnValue", "set.Value"],
        ["mesh.StaticMesh", "set.Target"]
    ]
}

const result = convertSlimIRToT3D(testIR, 'blueprint')

if (result.success) {
    console.log("Conversion Success!")
    const t3d = result.t3d
    
    const verifications = {
        "Sin input pin is 'A'": t3d.includes('PinName="A"') && t3d.includes('K2Node_CallFunction Name="K2Node_CallFunction_1"'),
        "SetCustomPrimitiveDataFloat parent is PrimitiveComponent": t3d.includes('MemberParent="/Script/CoreUObject.Class\'/Script/Engine.PrimitiveComponent\'"'),
        "Math return type is double": t3d.includes('PinType.PinSubCategory="double"'),
        "VariableGet uses bSelfContext=True": t3d.includes('bSelfContext=True'),
        "Event output pin is 'Then'": t3d.includes('PinName="Then"') && t3d.includes('K2Node_Event'),
        "LinkedTo is bidirectional (Tick -> Set)": t3d.includes('PinName="Then"') && t3d.includes('LinkedTo=(K2Node_CallFunction_2'),
        "LinkedTo is bidirectional (Set -> Tick)": t3d.includes('PinName="Execute"') && t3d.includes('LinkedTo=(K2Node_Event_0')
    }

    console.log("\n--- Verification Results ---")
    let allPassed = true
    for (const [desc, passed] of Object.entries(verifications)) {
        console.log(`${passed ? '✅' : '❌'} ${desc}`)
        if (!passed) allPassed = false
    }
    
    if (allPassed) {
        console.log("\n🎉 ALL VERIFICATIONS PASSED")
    } else {
        console.log("\n💀 SOME VERIFICATIONS FAILED")
        // console.log(t3d)
    }
} else {
    console.error("Conversion Failed:", result.errors)
}
