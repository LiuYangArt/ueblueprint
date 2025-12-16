/**
 * Extract Node Templates from Test Files
 * Generates nodeTemplates.json from tests/node*.spec.js files
 * 
 * Usage: node scripts/extractNodeTemplates.js
 */

import { readdir, readFile, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')
const testsDir = join(projectRoot, 'tests')
const outputPath = join(projectRoot, 'js', 'ai', 'nodeTemplates.json')

async function extractNodeTemplates() {
    const files = await readdir(testsDir)
    const nodeFiles = files.filter(f => f.startsWith('node') && f.endsWith('.spec.js'))
    
    console.log(`Found ${nodeFiles.length} node test files`)
    
    const templates = []
    
    for (const file of nodeFiles) {
        try {
            const filePath = join(testsDir, file)
            const content = await readFile(filePath, 'utf-8')
            
            // Extract node name
            const nameMatch = content.match(/name:\s*["']([^"']+)["']/)
            if (!nameMatch) continue
            
            const nodeName = nameMatch[1]
            
            // Extract T3D value using regex
            // Match: value: String.raw`...` 
            const valueMatch = content.match(/value:\s*String\.raw`([\s\S]*?)`/)
            if (!valueMatch) continue
            
            const t3dValue = valueMatch[1].trim()
            
            // Extract class from T3D
            const classMatch = t3dValue.match(/Class=([^\s]+)/)
            const nodeClass = classMatch ? classMatch[1].replace(/["']/g, '') : null
            
            // Detect type: Blueprint or Material
            let nodeType = 'blueprint'
            if (t3dValue.includes('MaterialGraphNode') || t3dValue.includes('MaterialExpression')) {
                nodeType = 'material'
            } else if (t3dValue.includes('NiagaraNode')) {
                nodeType = 'niagara'
            } else if (t3dValue.includes('PCGEditorGraphNode')) {
                nodeType = 'pcg'
            } else if (t3dValue.includes('MetasoundEditorGraph')) {
                nodeType = 'metasound'
            }
            
            // Extract FunctionReference if present
            let functionName = null
            const funcMatch = t3dValue.match(/MemberName=["']?([^"',\)]+)/)
            if (funcMatch) {
                functionName = funcMatch[1]
            }
            
            templates.push({
                name: nodeName,
                file: file,
                type: nodeType,
                class: nodeClass,
                functionName: functionName,
                t3d: t3dValue
            })
            
        } catch (err) {
            console.warn(`Failed to parse ${file}:`, err.message)
        }
    }
    
    // Sort by type then name
    templates.sort((a, b) => {
        if (a.type !== b.type) return a.type.localeCompare(b.type)
        return a.name.localeCompare(b.name)
    })
    
    // Generate output
    const output = {
        generated: new Date().toISOString(),
        totalCount: templates.length,
        byType: {
            blueprint: templates.filter(t => t.type === 'blueprint').length,
            material: templates.filter(t => t.type === 'material').length,
            niagara: templates.filter(t => t.type === 'niagara').length,
            pcg: templates.filter(t => t.type === 'pcg').length,
            metasound: templates.filter(t => t.type === 'metasound').length
        },
        templates: templates
    }
    
    await writeFile(outputPath, JSON.stringify(output, null, 2), 'utf-8')
    
    console.log(`\nGenerated ${outputPath}`)
    console.log(`Total templates: ${templates.length}`)
    console.log(`By type:`)
    Object.entries(output.byType).forEach(([type, count]) => {
        if (count > 0) console.log(`  - ${type}: ${count}`)
    })
}

extractNodeTemplates().catch(console.error)
