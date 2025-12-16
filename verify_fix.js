import ObjectReferenceEntity from './js/entity/ObjectReferenceEntity.js';

const input = `/Script/CoreUObject.Class'"/Script/Engine.Actor"'`;
console.log("Testing: " + input);

try {
    const result = ObjectReferenceEntity.grammar.run(input);
    console.log("Status:", result.status);
    if (result.status) {
        // Access getters to verify content
        const entity = result.value;
        console.log("Type:", entity.type);
        console.log("Path:", entity.path);
    } else {
        console.log("Expected:", result.expected);
    }
} catch (e) {
    console.error("Error:", e);
}
