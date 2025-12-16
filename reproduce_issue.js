import ObjectReferenceEntity from './js/entity/ObjectReferenceEntity.js';
import fs from 'fs';

const log = (msg) => {
    try {
        fs.appendFileSync('debug_output.txt', msg + '\n');
    } catch {}
    console.log(msg);
};

// Clear previous log
try {
    fs.writeFileSync('debug_output.txt', '');
} catch {}

log("--- Debugging ObjectReferenceEntity ---");

try {
    const inputFull = `/Script/CoreUObject.Class'"/Script/Engine.Actor"'`;
    log("\nTesting Full Input: " + inputFull);
    
    // We access the grammar directly 
    const grammar = ObjectReferenceEntity.grammar;
    
    // Test 1: Simple Type
    const inputSimple = `/Script/Engine.Actor`;
    try {
        const resultSimple = grammar.run(inputSimple);
        log("Simple Input Result Status: " + resultSimple.status);
        log("Simple Input Result Value: " + JSON.stringify(resultSimple.value));
        log("Simple Input Result keys: " + Object.keys(resultSimple));
    } catch(e) { log("Simple Input Error: " + e.message); }

    // Test 2: Full Input
    log("\nTesting Full Input: " + inputFull);
    try {
        const result = grammar.run(inputFull);
        log("Full Result Status: " + result.status);
        if (result.status) {
            log("Full Result Value: " + JSON.stringify(result.value));
        } else {
             log("Full Result: " + JSON.stringify(result));
        }
    } catch(e) { log("Full Input Error: " + e.message); }
    
    if (result.status) {
        log("Full Result Value: " + JSON.stringify(result.value));
    } else {
        log("Full Result Expected: " + JSON.stringify(result.expected));
        log("Full Result Index: " + result.index);
    }

} catch (e) {
    log("ERROR: " + e.stack);
}
