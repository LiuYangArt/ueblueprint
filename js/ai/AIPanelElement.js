/**
 * AI Panel Element - AI Assistant Floating Panel
 * Lit-based web component for UE Blueprint AI generation
 */

import { LitElement, html, css } from "lit"
import { unsafeHTML } from "lit/directives/unsafe-html.js"
import LLMService from "./LLMService.js"
import LayoutEngine from "./LayoutEngine.js"
import { BLUEPRINT_SYSTEM_PROMPT, MATERIAL_SYSTEM_PROMPT, BLUEPRINT_CHAT_PROMPT, MATERIAL_CHAT_PROMPT, DEFAULT_PROMPT_TEMPLATE } from "./prompts.js"
import { parseMarkdown } from "./MarkdownParser.js"

/**
 * @typedef {Object} AISettings
 * @property {string} provider
 * @property {string} apiKey
 * @property {string} baseUrl
 * @property {string} model
 * @property {number} temperature
 */

export default class AIPanelElement extends LitElement {

    static properties = {
        visible: { type: Boolean, reflect: true },
        prompt: { type: String },
        isGenerating: { type: Boolean },
        statusText: { type: String },
        statusType: { type: String },
        quickModels: { type: Array },
        model: { type: String },
        provider: { type: String },
        // "chat" or "generate" (which covers text/image/node generation)
        mode: { type: String }, 
        // "blueprint" or "material" - graph type mode
        graphMode: { type: String },
        // Array of { role: 'user' | 'assistant', content: string | Array }
        history: { type: Array },
        // Modal dialog state
        showModal: { type: Boolean },
        modalConfig: { type: Object },
        // Pending images for next message (base64 data URLs)
        pendingImages: { type: Array },
        debug: { type: Boolean },
        systemPrompt: { type: String }
    }

    static styles = css`
        :host {
            position: fixed;
            top: 50px;
            right: 50px;
            z-index: 9999;
            display: none;
        }

        :host([visible]) {
            display: block;
        }

        .ai-panel {
            background: #1a1a1a;
            border: 1px solid #3a3a3a;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            width: 500px;
            height: 80vh;
            min-width: 320px;
            min-height: 400px;
            max-width: 90vw;
            max-height: 95vh;
            resize: both;
            display: flex;
            flex-direction: column;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #e0e0e0;
            overflow: hidden;
        }

        .panel-header {
            display: flex;
            justify-content: flex-end; /* Align controls to right */
            align-items: center;
            padding: 8px 12px;
            background: #252525;
            border-bottom: 1px solid #3a3a3a;
            cursor: move;
            flex-shrink: 0;
            height: 24px; /* Fixed header height */
        }

        .tabs {
            display: flex;
            gap: 2px;
            background: #1a1a1a;
            padding: 2px;
            border-radius: 4px;
            border: 1px solid #3a3a3a;
        }

        .tab {
            padding: 4px 12px;
            background: transparent;
            border: none;
            border-radius: 3px;
            color: #888;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.2s;
        }

        .tab:hover {
            background: #333;
            color: #ccc;
        }

        .tab.active {
            background: #4a7c8c;
            color: white;
        }

        .tab.active.material {
            background: #7c4a8c;
        }

        /* Mode Buttons (BP/Material) */
        .mode-buttons {
            display: flex;
            gap: 2px;
            background: #1a1a1a;
            padding: 2px;
            border-radius: 4px;
            border: 1px solid #3a3a3a;
            margin-right: auto;
        }

        .mode-btn {
            padding: 4px 10px;
            background: transparent;
            border: none;
            border-radius: 3px;
            color: #888;
            cursor: pointer;
            font-size: 11px;
            transition: all 0.2s;
        }

        .mode-btn:hover {
            background: #333;
            color: #ccc;
        }

        .mode-btn.active {
            background: #4a7c8c;
            color: white;
        }

        .mode-btn.active.material {
            background: #7c4a8c;
        }

        /* Modal Overlay */
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100;
        }

        .modal {
            background: #252525;
            border: 1px solid #4a4a4a;
            border-radius: 8px;
            padding: 20px;
            max-width: 350px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }

        .modal-title {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 12px;
            color: #f0c060;
        }

        .modal-message {
            font-size: 14px;
            color: #ccc;
            margin-bottom: 20px;
            line-height: 1.5;
        }

        .modal-buttons {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
        }

        .modal-btn {
            padding: 8px 16px;
            border-radius: 4px;
            border: none;
            cursor: pointer;
            font-size: 13px;
            transition: background 0.2s;
        }

        .modal-btn.cancel {
            background: #3a3a3a;
            color: #ccc;
        }

        .modal-btn.cancel:hover {
            background: #4a4a4a;
        }

        .modal-btn.confirm {
            background: #4a7c8c;
            color: white;
        }

        .modal-btn.confirm:hover {
            background: #5a8c9c;
        }

        .close-btn, .settings-btn {
            background: none;
            border: none;
            color: #888;
            font-size: 16px;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
        }

        .close-btn:hover, .settings-btn:hover {
            background: #333;
            color: #fff;
        }

        /* Chat History Area */
        .chat-history {
            flex-grow: 1;
            padding: 12px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background: #1e1e1e;
        }

        .message {
            max-width: 85%;
            padding: 10px 14px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.5;
            word-wrap: break-word;
        }

        .message.user {
            align-self: flex-end;
            background: #2d4a54;
            color: #fff;
            border-bottom-right-radius: 2px;
        }

        .message.assistant {
            align-self: flex-start;
            background: #2a2a2a;
            border: 1px solid #3a3a3a;
            color: #e0e0e0;
            border-bottom-left-radius: 2px;
        }

        .message.system {
            align-self: center;
            font-size: 12px;
            color: #666;
            font-style: italic;
            background: none;
            border: none;
            padding: 4px;
        }

        /* Markdown styles in messages */
        .message p {
            margin: 0 0 8px 0;
        }
        .message p:last-child {
            margin-bottom: 0;
        }
        .message code {
            background: #1a1a1a;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 13px;
        }
        .message pre {
            background: #1a1a1a;
            border: 1px solid #3a3a3a;
            border-radius: 6px;
            padding: 10px;
            margin: 8px 0;
            overflow-x: auto;
        }
        .message pre code {
            background: none;
            padding: 0;
            font-size: 12px;
            line-height: 1.4;
        }
        .message strong {
            color: #fff;
        }
        .message em {
            font-style: italic;
            color: #b0b0b0;
        }
        .message h2, .message h3, .message h4 {
            margin: 12px 0 6px 0;
            color: #fff;
        }
        .message h2 { font-size: 16px; }
        .message h3 { font-size: 14px; }
        .message h4 { font-size: 13px; }
        .message ul {
            margin: 6px 0;
            padding-left: 20px;
        }
        .message li {
            margin: 4px 0;
        }
        .message a {
            color: #6ab0c7;
            text-decoration: none;
        }
        .message a:hover {
            text-decoration: underline;
        }

        /* Input Area at Bottom */
        .input-area {
            padding: 12px;
            background: #252525;
            border-top: 1px solid #3a3a3a;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .toolbar {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 4px;
        }

        .config-row {
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 1;
        }

        .model-select {
            flex: 1;
            max-width: 200px;
            padding: 4px 8px;
            background: #1a1a1a;
            border: 1px solid #3a3a3a;
            border-radius: 4px;
            color: #ccc;
            font-size: 12px;
        }

        .prompt-input {
            width: 100%;
            min-height: 60px;
            max-height: 150px;
            padding: 10px;
            background: #1a1a1a;
            border: 1px solid #3a3a3a;
            border-radius: 6px;
            color: #e0e0e0;
            font-size: 14px;
            resize: none;
            font-family: inherit;
            box-sizing: border-box;
        }

        .prompt-input:focus {
            outline: none;
            border-color: #4a7c8c;
        }

        .action-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 4px;
        }

        .send-btn {
            width: 32px;
            height: 32px;
            border-radius: 4px;
            background: #4a7c8c;
            border: none;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: background 0.2s;
        }

        .send-btn:hover:not(:disabled) {
            background: #5a8c9c;
        }

        .send-btn:disabled {
            background: #3a3a3a;
            cursor: not-allowed;
            opacity: 0.5;
        }

        .status-bar {
            padding: 4px 12px;
            background: #1a1a1a;
            border-top: 1px solid #3a3a3a;
            font-size: 11px;
            color: #666;
            text-align: center;
            flex-shrink: 0;
            min-height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .status-bar.error { color: #e57373; }
        .status-bar.success { color: #81c784; }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .generating .status-bar {
            animation: pulse 1.5s infinite;
        }

        /* Image attachment styles */
        .image-preview-area {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            padding: 8px;
            background: #1e1e1e;
            border-bottom: 1px solid #3a3a3a;
            max-height: 120px;
            overflow-y: auto;
        }

        .image-preview-area:empty {
            display: none;
        }

        .image-thumb {
            position: relative;
            width: 80px;
            height: 80px;
            border-radius: 6px;
            overflow: hidden;
            border: 1px solid #3a3a3a;
        }

        .image-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .image-thumb .remove-btn {
            position: absolute;
            top: 2px;
            right: 2px;
            width: 18px;
            height: 18px;
            background: rgba(0, 0, 0, 0.7);
            border: none;
            border-radius: 50%;
            color: #fff;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .image-thumb .remove-btn:hover {
            background: #e57373;
        }

        .attach-btn {
            width: 32px;
            height: 32px;
            border-radius: 4px;
            background: transparent;
            border: 1px solid #3a3a3a;
            color: #888;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: all 0.2s;
        }

        .attach-btn:hover {
            border-color: #4a7c8c;
            color: #4a7c8c;
        }

        /* Image in chat history */
        .message-images {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
        }

        .message-images img {
            max-width: 150px;
            max-height: 100px;
            border-radius: 4px;
            cursor: pointer;
        }

        .message-images img:hover {
            opacity: 0.9;
        }

        input[type="file"] {
            display: none;
        }
    `

    constructor() {
        super()
        this.visible = true
        this.history = [] // Chat history
        this.prompt = ""
        this.statusText = "Ready"
        this.statusType = ""
        this.isGenerating = false
        this.mode = "chat" // Default to chat mode
        this.graphMode = "blueprint" // "blueprint" or "material"
        this.showModal = false
        this.modalConfig = null
        this.model = localStorage.getItem("ueb-ai-model") || ""
        this.provider = localStorage.getItem("ueb-ai-provider") || ""
        this.quickModels = []
        this.settings = {
            baseUrl: "",
            apiKey: "",
            model: "",
            provider: "openai" // Default provider
        }
        this.debug = false
        this.systemPrompt = DEFAULT_PROMPT_TEMPLATE
        this.abortController = null
        this.pendingImages = [] // Images pending to be sent with next message

        // Dragging state
        this._isDragging = false
        this._dragStartX = 0
        this._dragStartY = 0
        this._panelStartX = 0
        this._panelStartY = 0

        // Blueprint reference (set externally)
        this.blueprint = null
        this.llmService = new LLMService()
    }

    /* ... lifecycle and handlers ... */

    connectedCallback() {
        super.connectedCallback()
        this._loadSettings()
        this._setupKeyboardShortcut()
        document.body.addEventListener("ueb-ai-settings-saved", (e) => {
            if (this.llmService) {
                const settings = e.detail
                this.llmService.updateConfig(settings)
                this.quickModels = settings.quickModels || []
                this.debug = settings.debug || false
                this.systemPrompt = settings.systemPrompt || DEFAULT_PROMPT_TEMPLATE
                // If model/provider are not set from localStorage, or if they are no longer valid,
                // fall back to settings.
                if (!this.model || !this.provider) {
                    this.model = settings.model || ""
                    this.provider = settings.provider || ""
                }
                this.requestUpdate()
            }
        })
        
        // Listen for type mismatch events from blueprint
        document.body.addEventListener("ueb-type-mismatch", (e) => {
            const { currentType, newType, nodeCount } = e.detail
            this.history = [...this.history, { 
                role: 'system', 
                content: `⚠️ Added ${nodeCount || 1} ${newType} node(s) to ${currentType} graph.` 
            }]
            this._scrollToBottom()
        })
        
        // Observe blueprint type changes to sync graphMode
        this._setupBlueprintTypeObserver()
    }
    
    /**
     * Set up observer to sync graphMode with blueprint.blueprintType
     */
    _setupBlueprintTypeObserver() {
        // Wait for blueprint to be set
        const checkAndObserve = () => {
            if (this.blueprint) {
                // Initial sync
                this._syncGraphModeFromBlueprint()
                
                // Watch for data-type attribute changes
                this._blueprintObserver = new MutationObserver((mutations) => {
                    for (const mutation of mutations) {
                        if (mutation.attributeName === 'data-type') {
                            this._syncGraphModeFromBlueprint()
                        }
                    }
                })
                this._blueprintObserver.observe(this.blueprint, { 
                    attributes: true, 
                    attributeFilter: ['data-type'] 
                })
            } else {
                // Retry later if blueprint not set yet
                setTimeout(checkAndObserve, 100)
            }
        }
        checkAndObserve()
    }
    
    /**
     * Sync graphMode based on current blueprint type
     */
    _syncGraphModeFromBlueprint() {
        if (!this.blueprint) return
        
        const blueprintType = this.blueprint.blueprintType
        if (blueprintType === "MATERIAL") {
            this.graphMode = "material"
        } else if (blueprintType === "BLUEPRINT" || !blueprintType) {
            this.graphMode = "blueprint"
        }
        // Other types (NIAGARA, PCG, etc.) stay as blueprint mode for now
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        document.removeEventListener("keydown", this._keydownHandler)
        if (this._blueprintObserver) {
            this._blueprintObserver.disconnect()
        }
    }

    _setupKeyboardShortcut() {
        this._keydownHandler = (e) => {
            if (e.altKey && e.code === "KeyA") {
                e.preventDefault()
                this.toggle()
            }
            if (e.key === "Escape" && this.visible) {
                this.hide()
            }
        }
        document.addEventListener("keydown", this._keydownHandler)
    }

    _loadSettings() {
        try {
            // Load global settings
            const savedApi = localStorage.getItem("ueblueprint-api-settings")
            if (savedApi) {
                const settings = JSON.parse(savedApi)
                this.llmService.updateConfig(settings)
                
                // Update local state
                this.quickModels = settings.quickModels || []
                this.debug = settings.debug || false
                this.systemPrompt = settings.systemPrompt || DEFAULT_PROMPT_TEMPLATE
                
                // If model/provider are not set from localStorage, or if they are no longer valid,
                // fall back to settings.
                if (!this.model || !this.provider) {
                    this.model = settings.model || ""
                    this.provider = settings.provider || ""
                }
                
                // If current global model is in quickModels, ensure we have the full config
                // (Though LLMService already has valid config from updateConfig(settings) which includes baseUrl)
            }
        } catch (e) {
            console.warn("Failed to load AI settings:", e)
        }
    }

    _saveSettings() {
        // No local settings to save anymore, everything is in global API settings
    }

    show() { this.visible = true }
    hide() { this.visible = false }
    toggle() { this.visible = !this.visible }

    _getBlueprintContext() {
        if (!this.blueprint) return null

        // Try to get selected nodes first
        let nodes = this.blueprint.getNodes(true)
        let selectionState = "Selected nodes"
        
        // If no selection, get all nodes
        if (nodes.length === 0) {
            nodes = this.blueprint.getNodes(false)
            selectionState = "All nodes"
        }

        if (nodes.length > 0) {
             // Only serializing entities
             const nodeEntities = nodes.map(n => n.entity)
             const t3d = nodeEntities.reduce((acc, cur) => acc + cur.serialize(), "")
             return `Context (${selectionState}):\n\`\`\`\n${t3d}\n\`\`\``
        }
        
        return null
    }

    _handlePromptInput(e) { 
        this.prompt = e.target.value 
        // Auto-resize textarea
        const el = e.target
        el.style.height = 'auto'
        el.style.height = Math.min(el.scrollHeight, 120) + 'px'
    }

    _handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            this._handleSubmit()
        }
    }

    _handleSubmit() {
        if (this.mode === 'chat') {
            this._handleChat()
        } else {
            this._handleGenerate()
        }
    }

    async _handleChat() {
        if (this.isGenerating || (!this.prompt.trim() && this.pendingImages.length === 0)) return

        const userMsg = this.prompt.trim()
        const userImages = [...this.pendingImages]
        
        // Build user message content (text + images for Vision API)
        let userContent
        if (userImages.length > 0) {
            userContent = []
            if (userMsg) {
                userContent.push({ type: "text", text: userMsg })
            }
            for (const imgData of userImages) {
                userContent.push({ 
                    type: "image_url", 
                    image_url: { url: imgData } 
                })
            }
        } else {
            userContent = userMsg
        }
        
        // Add to history (store images for display)
        this.history = [...this.history, { 
            role: 'user', 
            content: userMsg,
            images: userImages.length > 0 ? userImages : undefined 
        }]
        this.prompt = ""
        this.pendingImages = []
        this.requestUpdate()

        // Reset textarea height
        const textarea = this.shadowRoot.querySelector('.prompt-input')
        if (textarea) textarea.style.height = 'auto'

        this.isGenerating = true
        this.statusText = "Thinking..."
        this.statusType = ""
        this.abortController = new AbortController()

        try {
            const context = this._getBlueprintContext() || "No blueprint/material nodes currently available."
            
            // Select system prompt based on graphMode and customization
            let systemPrompt = this.systemPrompt || DEFAULT_PROMPT_TEMPLATE
            
            const modeDesc = this.graphMode === "material" ? "Material Editor" : "Blueprint Editor"
            const modeType = this.graphMode === "material" ? "Material node" : "Blueprint"
            
            // Replace placeholders
            systemPrompt = systemPrompt
                .replace(/{{MODE}}/g, modeDesc)
                .replace(/{{MODE_TYPE}}/g, modeType)

            // Handle Context placeholder
            if (systemPrompt.includes("{{CONTEXT}}")) {
                 systemPrompt = systemPrompt.replace(/{{CONTEXT}}/g, context ? `Context:\n${context}` : "")
            } else if (context) {
                 // Append context if no placeholder
                 systemPrompt += `\n\nContext:\n${context}`
            }
            
            // Always reinforce current mode awareness
            systemPrompt += `\n\nCurrent Editor Mode: ${this.graphMode}`
            
            // Build messages array for API call
            const messages = [{ role: "system", content: systemPrompt }]
            
            // Add recent history (last 6 turns)
            const recentHistory = this.history.slice(-6)
            for (const msg of recentHistory) {
                if (msg.role === 'system') continue // Skip system messages like errors
                
                // For history, just use text content (images were already sent)
                if (msg === recentHistory[recentHistory.length - 1]) {
                    // Current message - use full content with images
                    messages.push({ role: msg.role, content: userContent })
                } else {
                    // Previous messages - text only
                    messages.push({ role: msg.role, content: msg.content || "" })
                }
            }

            // Stream response placeholder
            this.history = [...this.history, { role: 'assistant', content: "" }]
            const assistantMsgIndex = this.history.length - 1
            
            const responseText = await this.llmService.chat(messages, this.abortController.signal)
            
            // Update the assistant message
            const updatedHistory = [...this.history]
            updatedHistory[assistantMsgIndex].content = responseText
            this.history = updatedHistory
            
            this.statusText = "Reply received"
            this.statusType = "success"

        } catch (error) {
            if (error.name === 'AbortError') {
                this.statusText = "Stopped"
            } else {
                this.statusText = "Error"
                this.statusType = "error"
                this.history = [...this.history, { role: 'system', content: `Error: ${error.message}` }]
            }
        } finally {
            this.isGenerating = false
            this.abortController = null
            this.requestUpdate()
            this._scrollToBottom()
        }
    }

    _scrollToBottom() {
        setTimeout(() => {
            const historyEl = this.shadowRoot.querySelector('.chat-history')
            if (historyEl) {
                historyEl.scrollTop = historyEl.scrollHeight
            }
        }, 10)
    }

    _handleModeChange(newMode) {
        this.mode = newMode
    }

    /**
     * Handle graph type mode switching (blueprint/material)
     */
    _handleGraphModeChange(newMode) {
        // If graph has nodes and switching to different type, show warning
        const currentType = this.blueprint?.blueprintType
        const targetType = newMode === "material" ? "MATERIAL" : "BLUEPRINT"
        
        if (currentType && currentType !== targetType && this.blueprint?.nodes?.length > 0) {
            this._showModal({
                title: "⚠️ Switch Mode?",
                message: `Current graph contains ${currentType} nodes. Switching to ${newMode.toUpperCase()} mode may cause issues.`,
                confirmText: "Switch Anyway",
                cancelText: "Cancel",
                onConfirm: () => {
                    this.graphMode = newMode
                    this._hideModal()
                }
            })
        } else {
            this.graphMode = newMode
        }
    }

    /**
     * Convert graphMode to blueprintType string
     */
    _modeToType(mode) {
        return mode === "material" ? "MATERIAL" : "BLUEPRINT"
    }

    /**
     * Show modal dialog with config
     */
    _showModal(config) {
        this.modalConfig = config
        this.showModal = true
    }

    /**
     * Hide modal dialog
     */
    _hideModal() {
        this.showModal = false
        this.modalConfig = null
    }

    /**
     * Handle modal confirm action
     */
    _confirmModal() {
        if (this.modalConfig?.onConfirm) {
            this.modalConfig.onConfirm()
        } else {
            this._hideModal()
        }
    }

    _handleModelSelect(e) {
        const index = e.target.value
        if (index !== "" && this.quickModels[index]) {
            const selected = this.quickModels[index]
            this.model = selected.model
            this.provider = selected.provider
            
            // Persist selection
            localStorage.setItem("ueb-ai-model", this.model)
            localStorage.setItem("ueb-ai-provider", this.provider)
            
            // Update LLM Service config for immediate use
            // Note: We don't have the API Key for this provider if it differs from the global one.
            // Assumption: User uses a compatible key or the same key provider.
            const configUpdate = {
                model: selected.model,
                provider: selected.provider,
                baseUrl: selected.baseUrl // Use the stored baseUrl for this quick model
            }
            
            this.llmService.updateConfig(configUpdate)
        }
    }

    /**
     * Handle paste event to capture images
     */
    _handlePaste(e) {
        const items = e.clipboardData?.items
        if (!items) return
        
        for (const item of items) {
            if (item.type.startsWith('image/')) {
                e.preventDefault()
                const file = item.getAsFile()
                if (file) this._addImage(file)
            }
        }
    }

    /**
     * Handle file input change
     */
    _handleFileSelect(e) {
        const files = e.target.files
        if (!files) return
        
        for (const file of files) {
            if (file.type.startsWith('image/')) {
                this._addImage(file)
            }
        }
        // Reset input so same file can be selected again
        e.target.value = ''
    }

    /**
     * Add image file to pending images (convert to base64)
     */
    _addImage(file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            const base64 = e.target.result
            this.pendingImages = [...this.pendingImages, base64]
        }
        reader.readAsDataURL(file)
    }

    /**
     * Remove pending image by index
     */
    _removeImage(index) {
        this.pendingImages = this.pendingImages.filter((_, i) => i !== index)
    }

    /**
     * Open file picker for images
     */
    _openImagePicker() {
        const input = this.shadowRoot.querySelector('#image-input')
        if (input) input.click()
    }


    /* ... drag handlers ... */
    _handleDragStart(e) {
        if (e.target.closest(".tabs") || e.target.closest("button")) return
        this._isDragging = true
        this._dragStartX = e.clientX
        this._dragStartY = e.clientY
        const rect = this.getBoundingClientRect()
        this._panelStartX = rect.left
        this._panelStartY = rect.top
        document.addEventListener("mousemove", this._handleDragMove)
        document.addEventListener("mouseup", this._handleDragEnd)
    }

    _handleDragMove = (e) => {
        if (!this._isDragging) return
        const dx = e.clientX - this._dragStartX
        const dy = e.clientY - this._dragStartY
        this.style.left = `${this._panelStartX + dx}px`
        this.style.top = `${this._panelStartY + dy}px`
        this.style.right = "auto"
    }

    _handleDragEnd = () => {
        this._isDragging = false
        document.removeEventListener("mousemove", this._handleDragMove)
        document.removeEventListener("mouseup", this._handleDragEnd)
    }

    _openSettings() {
        this.dispatchEvent(new CustomEvent("open-settings", { bubbles: true }))
    }

    _handleStop() {
        if (this.abortController) {
            this.abortController.abort()
            this.abortController = null
            this.isGenerating = false
            this.statusText = "Generation stopped"
            this.statusType = "" // Neutral color for stop
        }
    }

    async _handleGenerate() {
        if (this.isGenerating) {
            this._handleStop()
            return
        }

        if (!this.prompt || !this.prompt.trim()) {
            this.statusText = "Please enter a prompt"
            this.statusType = "error"
            return
        }

        // Add user prompt to history
        this.history = [...this.history, { role: 'user', content: this.prompt }]
        const currentPrompt = this.prompt
        this.prompt = "" // Clear prompt
        this.requestUpdate()

        this.isGenerating = true
        this.statusText = "Generating..."
        this.statusType = ""
        
        this.abortController = new AbortController()

        try {
            // Config is already updated via event listener or initial load
            const context = this._getBlueprintContext()
            let promptToSend = currentPrompt
            
            if (context) {
                promptToSend = `${context}\n\nTask: ${currentPrompt}`
            }

            // Select system prompt based on graphMode
            const systemPrompt = this.graphMode === "material" 
                ? MATERIAL_SYSTEM_PROMPT 
                : BLUEPRINT_SYSTEM_PROMPT

            const t3dText = await this.llmService.generate(promptToSend, this.abortController.signal, systemPrompt)
            const nodes = this._injectBlueprint(t3dText)
            
            // Validate generated node types match graphMode
            if (nodes && nodes.length > 0) {
                const expectedType = this._modeToType(this.graphMode)
                const mismatchedNodes = nodes.filter(n => {
                    const nodeType = n.entity.getBlueprintType()
                    return nodeType !== expectedType
                })
                
                if (mismatchedNodes.length > 0) {
                    const actualType = mismatchedNodes[0].entity.getBlueprintType()
                    this.history = [...this.history, { 
                        role: 'system', 
                        content: `\u26a0\ufe0f Generated ${mismatchedNodes.length} ${actualType} nodes in ${this.graphMode.toUpperCase()} mode.` 
                    }]
                }
                
                setTimeout(() => {
                    LayoutEngine.process(nodes)
                }, 50)
            }

            // Add success response to history
            // Add success response to history
            const nodeCount = nodes?.length || 0
            const content = this.debug 
                ? `Generated ${nodeCount} nodes.\n\n\`\`\`\n${t3dText}\n\`\`\`` 
                : `✅ Generated ${nodeCount} node${nodeCount !== 1 ? 's' : ''}.`

            this.history = [...this.history, { 
                role: 'assistant', 
                content: content 
            }]

            this.statusText = "Generation complete!"
            this.statusType = "success"
        } catch (error) {
            if (error.name === 'AbortError') {
                this.statusText = "Generation stopped"
                this.statusType = ""
                this.history = [...this.history, { role: 'system', content: "Generation stopped by user." }]
            } else {
                this.statusText = `Error: ${error.message}`
                this.statusType = "error"
                console.error("Generation failed:", error)
                this.history = [...this.history, { role: 'assistant', content: `Error generating blueprint: ${error.message}` }]
            }
        } finally {
            this.isGenerating = false
            this.abortController = null
            this.requestUpdate()
            this._scrollToBottom()
        }
    }

    _injectBlueprint(t3dText) {
        if (!this.blueprint) throw new Error("Blueprint instance not set")
        const pasteHandler = this.blueprint.template.getPasteInputObject()
        const nodes = pasteHandler.pasted(t3dText)
        if (!nodes || nodes.length === 0) throw new Error("Failed to parse blueprint text or no nodes generated")
        return nodes
    }

    render() {
        return html`
            <div class="ai-panel ${this.isGenerating ? "generating" : ""}"
                @mousedown=${e => e.stopPropagation()}
                @click=${e => e.stopPropagation()}
                @wheel=${e => e.stopPropagation()}
            >
                <div class="panel-header" @mousedown=${this._handleDragStart}>
                    <div class="mode-buttons">
                        <button class="mode-btn ${this.graphMode === "blueprint" ? "active" : ""}"
                                @click=${() => this._handleGraphModeChange("blueprint")}
                                title="Blueprint mode">🔷 BP</button>
                        <button class="mode-btn ${this.graphMode === "material" ? "active material" : ""}"
                                @click=${() => this._handleGraphModeChange("material")}
                                title="Material mode">🎨 Mat</button>
                    </div>
                    <div>
                        <button class="settings-btn" @click=${this._openSettings} title="Settings">⚙</button>
                        <button class="close-btn" @click=${this.hide}>×</button>
                    </div>
                </div>

                <!-- Chat History -->
                <div class="chat-history">
                    ${this.history.length === 0 ? html`
                        <div class="message system">
                            ${this.mode === 'chat' ? 
                                (this.graphMode === 'material' ? 
                                    "Ask questions about material nodes or UE5 shaders." :
                                    "Ask questions about your blueprint or UE5.") : 
                                (this.graphMode === 'material' ?
                                    "Describe the shader effect you want to generate." :
                                    "Describe the blueprint logic you want to generate.")}
                        </div>
                    ` : this.history.map(msg => html`
                        <div class="message ${msg.role}">
                            ${msg.role === 'assistant' 
                                ? unsafeHTML(parseMarkdown(msg.content))
                                : msg.content}
                            ${msg.images && msg.images.length > 0 ? html`
                                <div class="message-images">
                                    ${msg.images.map(img => html`
                                        <img src="${img}" alt="Attached image" />
                                    `)}
                                </div>
                            ` : ''}
                        </div>
                    `)}
                </div>

                <div class="input-area" @paste=${this._handlePaste}>
                    <!-- Image preview area -->
                    ${this.pendingImages.length > 0 ? html`
                        <div class="image-preview-area">
                            ${this.pendingImages.map((img, index) => html`
                                <div class="image-thumb">
                                    <img src="${img}" alt="Pending image" />
                                    <button class="remove-btn" @click=${() => this._removeImage(index)} title="Remove">×</button>
                                </div>
                            `)}
                        </div>
                    ` : ''}
                    
                    <div class="toolbar">
                        <div class="config-row">
                            <select class="model-select" @change=${this._handleModelSelect}>
                                ${this.quickModels.length > 0 ? 
                                    this.quickModels.map((m, index) => html`
                                        <option 
                                            value=${index} 
                                            ?selected=${this.model === m.model && this.provider === m.provider}
                                        >
                                            ${m.model}
                                        </option>
                                    `) : 
                                    html`<option value="">Select Model...</option>`
                                }
                            </select>
                        </div>
                    </div>

                    <textarea
                        class="prompt-input"
                        placeholder="${this._getPlaceholder()}"
                        .value=${this.prompt}
                        @input=${this._handlePromptInput}
                        @keydown=${this._handleKeyDown}
                    ></textarea>
                    
                    <!-- Hidden file input -->
                    <input type="file" id="image-input" accept="image/*" multiple @change=${this._handleFileSelect} />
                    
                    <div class="action-row">
                        <div class="tabs">
                            <button class="tab ${this.mode === "chat" ? "active" : ""}"
                                    @click=${() => this._handleModeChange("chat")}>Chat</button>
                            <button class="tab ${this.mode === "generate" ? "active" : ""}"
                                    @click=${() => this._handleModeChange("generate")}>Generate</button>
                        </div>

                        <div style="display: flex; gap: 8px;">
                            <button
                                class="attach-btn"
                                @click=${this._openImagePicker}
                                title="Attach image (or paste)"
                            >
                                📎
                            </button>
                            <button
                                class="send-btn"
                                ?disabled=${this.isGenerating || (!this.prompt.trim() && this.pendingImages.length === 0)}
                                @click=${this._handleSubmit}
                                title="${this.isGenerating ? 'Stop' : 'Send'}"
                            >
                            ${this.isGenerating ? '■' : '➤'}
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="status-bar ${this.statusType}">${this.statusText}</div>

                ${this.showModal && this.modalConfig ? html`
                    <div class="modal-overlay" @click=${this._hideModal}>
                        <div class="modal" @click=${e => e.stopPropagation()}>
                            <div class="modal-title">${this.modalConfig.title}</div>
                            <div class="modal-message">${this.modalConfig.message}</div>
                            <div class="modal-buttons">
                                <button class="modal-btn cancel" @click=${this._hideModal}>
                                    ${this.modalConfig.cancelText || "Cancel"}
                                </button>
                                <button class="modal-btn confirm" @click=${this._confirmModal}>
                                    ${this.modalConfig.confirmText || "Confirm"}
                                </button>
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>
        `
    }

    /**
     * Get placeholder text based on mode and graphMode
     */
    _getPlaceholder() {
        if (this.mode === 'chat') {
            return this.graphMode === 'material' 
                ? 'Ask about material nodes...' 
                : 'Ask about blueprint nodes...'
        }
        return this.graphMode === 'material'
            ? 'Describe shader effect...'
            : 'Describe blueprint logic...'
    }
}

// Removed: customElements.define is called in index.js
