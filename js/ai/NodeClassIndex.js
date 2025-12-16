/**
 * NodeClassIndex - Build and format a node class index for LLM prompts
 * P1 Optimization: Helps LLM know which node types are available
 */

let cachedIndex = null
let cachedIndexText = null

/**
 * Build a deduplicated index of node classes from templates
 * @param {Array} templates - Node templates array from nodeTemplates.json
 * @returns {Array} - Array of unique node class entries
 */
export function buildClassIndex(templates) {
    const index = new Map()
    
    for (const t of templates) {
        // Use functionName if available, otherwise use class
        const key = t.functionName || t.class
        if (!key) continue
        
        if (!index.has(key)) {
            index.set(key, {
                class: t.class,
                functionName: t.functionName,
                name: t.name,
                type: t.type
            })
        }
    }
    
    return Array.from(index.values())
}

/**
 * Format the class index for injection into prompts
 * @param {Array} index - Class index array
 * @param {string} mode - 'blueprint' or 'material'
 * @returns {string} - Formatted text for prompt injection
 */
export function formatClassIndexForPrompt(index, mode = 'blueprint') {
    // Filter by mode
    const filtered = index.filter(n => n.type === mode)
    
    if (filtered.length === 0) return ''
    
    // Group by class for better organization
    const byClass = new Map()
    for (const n of filtered) {
        const baseClass = n.class?.split('.').pop() || 'Unknown'
        if (!byClass.has(baseClass)) {
            byClass.set(baseClass, [])
        }
        if (n.functionName) {
            byClass.get(baseClass).push(n.functionName)
        }
    }
    
    // Format output
    let result = 'AVAILABLE NODE TYPES:\n'
    for (const [cls, funcs] of byClass) {
        if (funcs.length > 0) {
            result += `- ${cls}: ${funcs.slice(0, 10).join(', ')}${funcs.length > 10 ? '...' : ''}\n`
        } else {
            result += `- ${cls}\n`
        }
    }
    
    return result
}

/**
 * Load and cache the node class index
 * @returns {Promise<Array>} - Cached class index
 */
export async function getClassIndex() {
    if (cachedIndex) return cachedIndex
    
    try {
        const response = await fetch('./js/ai/nodeTemplates.json')
        if (!response.ok) {
            console.warn('Failed to load nodeTemplates.json for class index')
            return []
        }
        const data = await response.json()
        cachedIndex = buildClassIndex(data.templates || [])
        return cachedIndex
    } catch (e) {
        console.warn('Error loading node class index:', e)
        return []
    }
}

/**
 * Get formatted class index text for a specific mode
 * @param {string} mode - 'blueprint' or 'material'
 * @returns {Promise<string>} - Formatted index text
 */
export async function getClassIndexText(mode = 'blueprint') {
    const index = await getClassIndex()
    return formatClassIndexForPrompt(index, mode)
}
