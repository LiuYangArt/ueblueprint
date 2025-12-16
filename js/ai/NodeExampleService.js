/**
 * Node Example Service
 * Provides dynamic few-shot example injection based on user prompts
 */

// Cache for loaded templates
let nodeTemplatesCache = null

/**
 * Load node templates (cached after first load)
 * @returns {Promise<Object>} Node templates data
 */
async function loadNodeTemplates() {
    if (nodeTemplatesCache) {
        return nodeTemplatesCache
    }
    
    try {
        // Use relative path from the current module
        const baseUrl = new URL('.', import.meta.url).href
        const response = await fetch(baseUrl + 'nodeTemplates.json')
        if (!response.ok) {
            console.warn('Failed to load node templates:', response.status)
            return { templates: [] }
        }
        nodeTemplatesCache = await response.json()
        return nodeTemplatesCache
    } catch (error) {
        console.warn('Failed to load node templates:', error)
        return { templates: [] }
    }
}

/**
 * Search for relevant node examples based on user prompt
 * @param {string} userPrompt - The user's generation request
 * @param {string} graphType - 'blueprint' or 'material'
 * @param {number} maxExamples - Maximum number of examples to return
 * @returns {Promise<Array<{name: string, functionName: string|null, t3d: string}>>} Matching examples
 */
export async function findRelevantExamples(userPrompt, graphType = 'blueprint', maxExamples = 2) {
    const nodeTemplates = await loadNodeTemplates()
    const prompt = userPrompt.toLowerCase()
    
    // Extract keywords from prompt (simple tokenization)
    const keywords = prompt
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 2)
    
    // Filter templates by type
    const candidates = nodeTemplates.templates.filter(t => t.type === graphType)
    
    // Score each template based on keyword matches
    const scored = candidates.map(template => {
        let score = 0
        const name = template.name.toLowerCase()
        const funcName = (template.functionName || '').toLowerCase()
        
        for (const keyword of keywords) {
            // Exact name match - highest priority
            if (name === keyword) {
                score += 100
            }
            // Name contains keyword
            else if (name.includes(keyword)) {
                score += 10
            }
            // Function name contains keyword
            else if (funcName.includes(keyword)) {
                score += 8
            }
        }
        
        // Prioritize common useful nodes
        const commonNodes = ['branch', 'delay', 'print', 'sequence', 'foreach', 'doonce', 'event']
        if (commonNodes.some(cn => name.includes(cn))) {
            score += 2
        }
        
        return { template, score }
    })
    
    // Sort by score and return top matches
    return scored
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, maxExamples)
        .map(s => ({
            name: s.template.name,
            functionName: s.template.functionName,
            t3d: s.template.t3d
        }))
}

/**
 * Format examples for injection into system prompt
 * @param {Array<{name: string, functionName: string|null, t3d: string}>} examples 
 * @returns {string} Formatted examples section
 */
export function formatExamplesForPrompt(examples) {
    if (!examples || examples.length === 0) {
        return ''
    }
    
    const formattedExamples = examples.map(ex => {
        // Clean up the T3D - remove excessive whitespace but keep structure
        const cleanT3d = ex.t3d
            .replace(/\r\n/g, '\n')
            .replace(/^\s+/gm, '')  // Remove leading whitespace from each line
            .trim()
        
        return `// Example: ${ex.name}${ex.functionName ? ` (${ex.functionName})` : ''}\n${cleanT3d}`
    }).join('\n\n')
    
    return `\nRELEVANT T3D EXAMPLES (use these as reference for structure and format):\n${formattedExamples}`
}

/**
 * Get enhanced system prompt with relevant examples injected
 * @param {string} basePrompt - Original system prompt
 * @param {string} userPrompt - User's request
 * @param {string} graphType - 'blueprint' or 'material'
 * @returns {Promise<string>} Enhanced system prompt with examples
 */
export async function enhancePromptWithExamples(basePrompt, userPrompt, graphType = 'blueprint') {
    const examples = await findRelevantExamples(userPrompt, graphType, 2)
    
    if (examples.length === 0) {
        return basePrompt
    }
    
    const examplesSection = formatExamplesForPrompt(examples)
    return basePrompt + examplesSection
}

export default {
    findRelevantExamples,
    formatExamplesForPrompt,
    enhancePromptWithExamples
}
