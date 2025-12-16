
const HexDigit = /[0-9a-fA-F]/
const InsideString = /(?:[^"\\]|\\.)*/
const InsideSingleQuotedString = /(?:[^'\\]|\\.)*/
const Symbol = /[a-zA-Z_]\w*/
const separatedBy = (source, separator, min = 1) =>
    source + "(?:" + separator + source + ")"
    + (min === 1 ? "*" : min === 2 ? "+" : `{${min},}`)

const PathFragment = separatedBy(Symbol.source, "[\\.:]")
const Path = new RegExp(`(?:\\/${PathFragment}){2,}`)

const typeReferenceSource = Path.source + "|" + Symbol.source

const regexSource =
    "(" + typeReferenceSource + ")"
    + "(?:"
    + `'"(${InsideString.source})"'`
    + "|"
    + `'(${InsideSingleQuotedString.source})'`
    + ")"

const regex = new RegExp(regexSource)

console.log("Regex Source:", regexSource)

const input = `/Script/CoreUObject.Class'"/Script/Engine.Actor"'`
const match = input.match(regex)

console.log("Input:", input)
console.log("Match:", match)

if (match) {
    console.log("Group 1 (Type):", match[1])
    console.log("Group 2 (InsideString):", match[2])
    console.log("Group 3 (InsideSingleQuoted):", match[3])
} else {
    console.log("No match!")
}
