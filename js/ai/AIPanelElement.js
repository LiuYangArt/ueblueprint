/**
 * AI Panel Element - AI Assistant Floating Panel
 * Lit-based web component for UE Blueprint AI generation
 */

import { LitElement, html, css } from "lit"
import LLMService from "./LLMService.js"
import LayoutEngine from "./LayoutEngine.js"

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
        // Array of { role: 'user' | 'assistant', content: string }
        history: { type: Array }
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
            width: 420px;
            height: 600px;
            display: flex;
            flex-direction: column;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #e0e0e0;
            overflow: hidden;
            transition: height 0.3s ease;
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
        this.model = localStorage.getItem("ueb-ai-model") || ""
        this.provider = localStorage.getItem("ueb-ai-provider") || ""
        this.quickModels = []
        this.settings = {
            baseUrl: "",
            apiKey: "",
            model: "",
            provider: "openai" // Default provider
        }
        this.abortController = null

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
                // If model/provider are not set from localStorage, or if they are no longer valid,
                // fall back to settings.
                if (!this.model || !this.provider) {
                    this.model = settings.model || ""
                    this.provider = settings.provider || ""
                }
                this.requestUpdate()
            }
        })
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        document.removeEventListener("keydown", this._keydownHandler)
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
        if (this.isGenerating || !this.prompt.trim()) return

        const userMsg = this.prompt.trim()
        this.history = [...this.history, { role: 'user', content: userMsg }]
        this.prompt = ""
        this.requestUpdate()

        // Reset textarea height
        const textarea = this.shadowRoot.querySelector('.prompt-input')
        if (textarea) textarea.style.height = 'auto'

        this.isGenerating = true
        this.statusText = "Thinking..."
        this.statusType = ""
        this.abortController = new AbortController()

        try {
            // Gather context from blueprint
            let context = "Context: No blueprint nodes available."
            if (this.blueprint) {
                // Try to get selected nodes first
                let nodes = this.blueprint.getNodes(true)
                let selectionState = "Selected nodes"
                
                // If no selection, get all nodes
                if (nodes.length === 0) {
                    nodes = this.blueprint.getNodes(false)
                    selectionState = "All nodes"
                }

                if (nodes.length > 0) {
                    // Use Blueprint's serialization logic roughly
                    // Only serializing entities
                    const nodeEntities = nodes.map(n => n.entity)
                    const t3d = nodeEntities.reduce((acc, cur) => acc + cur.serialize(), "")
                    context = `Context (${selectionState}):\n\`\`\`\n${t3d}\n\`\`\``
                }
            }

            // Construct prompt
            const systemPrompt = `You are a helper for Unreal Engine Blueprints.
${context}
Answer the user's question based on the provided blueprint context if relevant.
Use concise language.`
            
            let fullPrompt = `${systemPrompt}\n\n`
            // Append recent history (limited to last few turns to save context)
            const recentHistory = this.history.slice(-6) 
            for (const msg of recentHistory) {
                if (msg === recentHistory[recentHistory.length - 1]) continue 
                fullPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`
            }
            fullPrompt += `User: ${userMsg}\nAssistant:`

            // Stream response placeholder
            this.history = [...this.history, { role: 'assistant', content: "" }]
            const assistantMsgIndex = this.history.length - 1
            
            const responseText = await this.llmService.generate(fullPrompt, this.abortController.signal)
            
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

        this.isGenerating = true
        this.statusText = "Generating..."
        this.statusType = ""
        
        this.abortController = new AbortController()

        try {
            // Config is already updated via event listener or initial load
            const t3dText = await this.llmService.generate(this.prompt, this.abortController.signal)
            const nodes = this._injectBlueprint(t3dText)
            
            if (nodes && nodes.length > 0) {
                 setTimeout(() => {
                    LayoutEngine.process(nodes)
                 }, 50)
            }

            this.statusText = "Generation complete!"
            this.statusType = "success"
        } catch (error) {
            if (error.name === 'AbortError') {
                this.statusText = "Generation stopped"
                this.statusType = ""
            } else {
                this.statusText = `Error: ${error.message}`
                this.statusType = "error"
                console.error("Generation failed:", error)
            }
        } finally {
            this.isGenerating = false
            this.abortController = null
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
                                "Ask questions about your blueprint or UE5." : 
                                "Describe the blueprint logic you want to generate."}
                        </div>
                    ` : this.history.map(msg => html`
                        <div class="message ${msg.role}">
                            ${msg.content}
                        </div>
                    `)}
                </div>

                <div class="input-area">
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
                        placeholder="${this.mode === 'chat' ? 'Ask a question...' : 'Describe functionality...'}"
                        .value=${this.prompt}
                        @input=${this._handlePromptInput}
                        @keydown=${this._handleKeyDown}
                    ></textarea>
                    
                    <div class="action-row">
                        <div class="tabs">
                            <button class="tab ${this.mode === "chat" ? "active" : ""}"
                                    @click=${() => this._handleModeChange("chat")}>Chat</button>
                            <button class="tab ${this.mode === "generate" ? "active" : ""}"
                                    @click=${() => this._handleModeChange("generate")}>Generate</button>
                        </div>

                        <button
                            class="send-btn"
                            ?disabled=${this.isGenerating || !this.prompt.trim()}
                            @click=${this._handleSubmit}
                            title="${this.isGenerating ? 'Stop' : 'Send'}"
                        >
                            ${this.isGenerating ? '■' : '➤'}
                        </button>
                    </div>
                </div>
                
                <div class="status-bar ${this.statusType}">${this.statusText}</div>
            </div>
        `
    }
}

// Removed: customElements.define is called in index.js
