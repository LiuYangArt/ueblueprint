
// Helper to generate correct Material Graph nodes with hybrid support for UE and Web Preview

const ROTATE_NODE_LOGIC = `
Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_VertexNormal"
   Begin Object Class=/Script/Engine.MaterialExpressionVertexNormalWS Name="MaterialExpressionVertexNormalWS_0"
   End Object
   Begin Object Name="MaterialExpressionVertexNormalWS_0"
      MaterialExpressionEditorX=-600
      MaterialExpressionEditorY=0
      MaterialExpressionGuid=7D9173F84A6A80F5685B62B889608976
   End Object
   MaterialExpression=MaterialExpressionVertexNormalWS'"MaterialExpressionVertexNormalWS_0"'
   NodePosX=-600
   NodePosY=0
   NodeGuid=3D92178B47E3D123136295A206673627
   CustomProperties Pin (PinId=88463F8B4BE31A2800F1749C541D8866,PinName="Output",Direction="EGPD_Output",PinType.PinCategory="optional",PinType.PinSubCategory="rgb")
End Object`;

// Removed spaces in CustomProperties Pin (PinName) might fix it? No, spaces are allowed in name.
// Check if "PinType.PinCategory" needs quotes? No.
// Let's debug what failed.

import ObjectEntity from './js/entity/ObjectEntity.js';
import Grammar from './js/serialization/Grammar.js';
import initializeSerializerFactory from './js/serialization/initializeSerializerFactory.js';

initializeSerializerFactory();

try {
    const result = ObjectEntity.grammar.run(ROTATE_NODE_LOGIC.trim());
    if (result.status) {
        console.log("Validation Success! T3D is parseable.");
    } else {
        console.log("Validation Failed.");
        // The parser failure message is generic "undefined".
        // It failed on the first object?
    }
} catch (e) {
    console.log("Error: " + e.message);
}
