/**
 * Lightweight Markdown parser for chat messages
 * Supports: bold, italic, code, code blocks, lists, headers, links
 */

/**
 * Convert markdown text to HTML
 * @param {string} text - Markdown text
 * @returns {string} HTML string
 */
export function parseMarkdown(text) {
    if (!text) return ''
    
    // Escape HTML first to prevent XSS
    let html = escapeHtml(text)
    
    // Code blocks (``` ... ```) - must be done before inline code
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
        return `<pre><code class="lang-${lang || 'text'}">${code.trim()}</code></pre>`
    })
    
    // Inline code (`...`)
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
    
    // Headers (## ...)
    html = html.replace(/^### (.+)$/gm, '<h4>$1</h4>')
    html = html.replace(/^## (.+)$/gm, '<h3>$1</h3>')
    html = html.replace(/^# (.+)$/gm, '<h2>$1</h2>')
    
    // Bold (**...**) and (__...__)
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>')
    
    // Italic (*...*) and (_..._) - but not inside words
    html = html.replace(/(?<![*\w])\*(?!\*)(.+?)(?<!\*)\*(?![*\w])/g, '<em>$1</em>')
    html = html.replace(/(?<![_\w])_(?!_)(.+?)(?<!_)_(?![_\w])/g, '<em>$1</em>')
    
    // Strikethrough (~~...~~)
    html = html.replace(/~~(.+?)~~/g, '<del>$1</del>')
    
    // Unordered lists (- item or * item)
    html = html.replace(/^(\s*)[-*] (.+)$/gm, '$1<li>$2</li>')
    
    // Ordered lists (1. item)
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    
    // Wrap consecutive <li> elements in <ul>
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    
    // Links [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    
    // Line breaks - convert double newlines to paragraphs, single to <br>
    html = html.replace(/\n\n+/g, '</p><p>')
    html = html.replace(/\n/g, '<br>')
    
    // Wrap in paragraph if not already structured
    if (!html.startsWith('<')) {
        html = `<p>${html}</p>`
    }
    
    return html
}

/**
 * Escape HTML special characters
 * @param {string} text 
 * @returns {string}
 */
function escapeHtml(text) {
    const escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }
    return text.replace(/[&<>"']/g, char => escapeMap[char])
}
