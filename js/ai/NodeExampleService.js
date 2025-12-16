/**
 * Node Example Service
 * Provides dynamic few-shot example injection based on user prompts
 */

/**
 * Chinese to English keyword mapping for UE Blueprint/Material nodes
 * Supports single word → single/multiple English keywords
 */
const ZH_KEYWORD_MAP = {
    // === Flow Control ===
    '分支': 'branch',
    '条件': 'branch',
    '判断': 'branch',
    '如果': 'branch',
    '延迟': 'delay',
    '等待': 'delay',
    '延时': 'delay',
    '序列': 'sequence',
    '顺序': 'sequence',
    '循环': ['foreach', 'loop', 'while'],
    '遍历': 'foreach',
    '迭代': 'foreach',
    '多路': 'multigate',
    '选择器': 'switch',
    '切换': 'switch',
    '触发一次': 'doonce',
    '单次': 'doonce',
    '翻转': 'flipflop',
    '时间线': 'timeline',
    
    // === Events ===
    '事件': 'event',
    '开始': ['begin', 'start'],
    '开始播放': 'beginplay',
    '游戏开始': 'beginplay',
    '结束': ['end', 'finish', 'stop'],
    '构造': 'construction',
    '重叠': 'overlap',
    '碰撞': ['hit', 'collision'],
    '点击': 'click',
    '按键': ['key', 'input'],
    '鼠标': 'mouse',
    '触摸': 'touch',
    
    // === Math ===
    '加': 'add',
    '加法': 'add',
    '减': 'subtract',
    '减法': 'subtract',
    '乘': 'multiply',
    '乘法': 'multiply',
    '除': 'divide',
    '除法': 'divide',
    '数学': ['add', 'subtract', 'multiply', 'divide', 'math'],
    '绝对值': 'abs',
    '正弦': 'sin',
    '余弦': 'cos',
    '平方根': 'sqrt',
    '对数': 'log',
    '比较': ['equal', 'greater', 'less', 'compare'],
    '等于': 'equal',
    '大于': 'greater',
    '小于': 'less',
    '与': 'and',
    '或': 'or',
    '非': 'not',
    '异或': 'xor',
    '位运算': ['bitwise', 'and', 'or', 'xor', 'not'],
    
    // === Variables & Debug ===
    '打印': 'print',
    '输出': 'print',
    '调试': ['debug', 'print'],
    '日志': ['log', 'print'],
    '获取': 'get',
    '设置': 'set',
    '变量': 'variable',
    '自身': 'self',
    '有效': 'valid',
    '检查': 'valid',
    
    // === Actor & Transform ===
    '生成': 'spawn',
    '创建': ['spawn', 'create'],
    '销毁': 'destroy',
    '移动': 'move',
    '旋转': 'rotation',
    '缩放': 'scale',
    '位置': ['location', 'position', 'transform'],
    '变换': 'transform',
    '转换': ['convert', 'transform'],
    '跳跃': 'jump',
    '角色': 'character',
    '演员': 'actor',
    
    // === Trace & Collision ===
    '射线': ['trace', 'line'],
    '射线检测': 'linetrace',
    '检测': 'trace',
    '碰撞检测': ['trace', 'collision'],
    
    // === Material ===
    '材质': 'material',
    '纹理': 'texture',
    '采样': 'sample',
    '颜色': ['color', 'vector'],
    '向量': 'vector',
    '常量': 'constant',
    '注释': 'comment',
    
    // === Common Actions ===
    '绑定': 'bind',
    '解绑': 'unbind',
    '委托': 'delegate',
    '函数': 'function',
    '调用': 'call',
}

/**
 * Translate Chinese keywords to English
 * @param {string[]} keywords - Array of keywords (may contain Chinese)
 * @returns {string[]} Translated keywords (all English)
 */
function translateKeywords(keywords) {
    const result = []
    
    for (const keyword of keywords) {
        // Check if it's a Chinese keyword
        const translation = ZH_KEYWORD_MAP[keyword]
        if (translation) {
            if (Array.isArray(translation)) {
                result.push(...translation)
            } else {
                result.push(translation)
            }
        } else {
            // Keep original if no translation (might be English or unknown)
            result.push(keyword)
        }
    }
    
    // Also try to extract Chinese phrases and translate individual characters
    for (const keyword of keywords) {
        // Check for partial matches in the keyword
        for (const [zh, en] of Object.entries(ZH_KEYWORD_MAP)) {
            if (keyword.includes(zh) && !result.includes(Array.isArray(en) ? en[0] : en)) {
                if (Array.isArray(en)) {
                    result.push(...en)
                } else {
                    result.push(en)
                }
            }
        }
    }
    
    return [...new Set(result)] // Remove duplicates
}

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
        // Use absolute path from site root since compiled code runs from /dist
        const response = await fetch('/js/ai/nodeTemplates.json')
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
    
    // Extract keywords from prompt (preserve Chinese characters)
    // Step 1: Extract English words
    const englishKeywords = prompt
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 2)
    
    // Step 2: Extract Chinese phrases (continuous Chinese character sequences)
    const chineseMatches = userPrompt.match(/[\u4e00-\u9fa5]+/g) || []
    
    // Step 3: Translate Chinese keywords to English
    const translatedKeywords = translateKeywords(chineseMatches)
    
    // Step 4: Combine all keywords
    const keywords = [...new Set([...englishKeywords, ...translatedKeywords])]
    
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
