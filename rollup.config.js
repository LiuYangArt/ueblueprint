import copy from "rollup-plugin-copy"
import minifyHTML from "rollup-plugin-minify-html-literals"
import resolve from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"
import replace from "@rollup/plugin-replace"
import { readFileSync } from "fs"

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"))

const replaceVersion = replace({
    preventAssignment: true,
    __VERSION__: JSON.stringify(pkg.version)
})

export default [
    {
        input: 'js/export.js',
        output: {
            file: 'dist/ueblueprint.js',
            format: 'es'
        },
        plugins: [
            replaceVersion,
            resolve({ browser: true }),
            copy({
                targets: [{
                    src: ["assets/fonts/*"],
                    dest: "dist/font"
                }]
            })
        ]
    },
    {
        input: 'js/export.js',
        output: {
            file: 'dist/ueblueprint.min.js',
            format: 'es'
        },
        plugins: [
            replaceVersion,
            resolve({ browser: true }),
            minifyHTML({
                minifyCSS: true,
            }),
            terser(),
            copy({
                targets: [{
                    src: ["assets/fonts/*"],
                    dest: "dist/font"
                }]
            })
        ]
    },
    // AI Module bundle (separate from main bundle)
    {
        input: 'js/ai/index.js',
        output: {
            file: 'dist/ueblueprint-ai.js',
            format: 'es'
        },
        plugins: [
            replaceVersion,
            resolve({ browser: true })
        ]
    }
]
