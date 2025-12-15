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
        mode: { type: String },
        prompt: { type: String },
        temperature: { type: Number },
        model: { type: String },
        isGenerating: { type: Boolean },
        statusText: { type: String },
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
            width: 400px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #e0e0e0;
            overflow: hidden;
        }

        .panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            background: #252525;
            border-bottom: 1px solid #3a3a3a;
            cursor: move;
        }

        .tabs {
            display: flex;
            gap: 4px;
        }

        .tab {
            padding: 6px 16px;
            background: transparent;
            border: none;
            border-radius: 4px;
            color: #888;
            cursor: pointer;
            font-size: 13px;
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

        .close-btn {
            background: none;
            border: none;
            color: #888;
            font-size: 18px;
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 4px;
        }

        .close-btn:hover {
            background: #333;
            color: #fff;
        }

        .panel-body {
            padding: 12px;
        }

        .preset-row {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
        }

        .preset-select {
            flex: 1;
            padding: 8px 12px;
            background: #2a2a2a;
            border: 1px solid #3a3a3a;
            border-radius: 4px;
            color: #ccc;
            font-size: 13px;
        }

        .icon-btn {
            width: 32px;
            height: 32px;
            background: #2a2a2a;
            border: 1px solid #3a3a3a;
            border-radius: 4px;
            color: #888;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
        }

        .icon-btn:hover {
            background: #333;
            color: #ccc;
        }

        .prompt-input {
            width: 100%;
            min-height: 100px;
            padding: 12px;
            background: #2a2a2a;
            border: 1px solid #3a3a3a;
            border-radius: 4px;
            color: #e0e0e0;
            font-size: 14px;
            resize: vertical;
            box-sizing: border-box;
            margin-bottom: 12px;
        }

        .prompt-input::placeholder {
            color: #666;
        }

        .prompt-input:focus {
            outline: none;
            border-color: #4a7c8c;
        }

        .config-row {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            gap: 12px;
        }

        .config-label {
            width: 90px;
            color: #888;
            font-size: 13px;
        }

        .config-input {
            flex: 1;
            padding: 6px 10px;
            background: #2a2a2a;
            border: 1px solid #3a3a3a;
            border-radius: 4px;
            color: #e0e0e0;
            font-size: 13px;
            text-align: right;
        }

        .model-select {
            flex: 1;
            padding: 6px 10px;
            background: #2a2a2a;
            border: 1px solid #3a3a3a;
            border-radius: 4px;
            color: #e0e0e0;
            font-size: 13px;
        }

        .generate-btn {
            width: 100%;
            padding: 12px;
            background: #4a4a4a;
            border: none;
            border-radius: 4px;
            color: #e0e0e0;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            margin-top: 8px;
            letter-spacing: 1px;
            transition: background 0.2s;
        }

        .generate-btn:hover:not(:disabled) {
            background: #5a5a5a;
        }

        .generate-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .generate-btn.generating {
            background: #4a7c8c;
        }

        .settings-btn {
            background: none;
            border: none;
            color: #888;
            font-size: 16px;
            cursor: pointer;
            padding: 4px 8px;
        }

        .settings-btn:hover {
            color: #ccc;
        }

        .status-bar {
            padding: 8px 12px;
            background: #252525;
            border-top: 1px solid #3a3a3a;
            font-size: 12px;
            color: #888;
            text-align: center;
        }

        .status-bar.error {
            color: #e57373;
        }

        .status-bar.success {
            color: #81c784;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .generating .status-bar {
            animation: pulse 1.5s infinite;
        }
    `

    constructor() {
        super()
        this.visible = true // Default to visible per user request
        this.mode = "text"
        this.prompt = ""
        this.temperature = 0.5
        this.model = "gpt-4o"
        this.isGenerating = false
        this.statusText = "Ready"

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

    connectedCallback() {
        super.connectedCallback()
        this._loadSettings()
        this._setupKeyboardShortcut()
        // Listen for settings updates to update LLM config
        document.body.addEventListener("ueb-ai-settings-saved", (e) => {
            if (this.llmService) {
                this.llmService.updateConfig(e.detail)
            }
        })
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        document.removeEventListener("keydown", this._keydownHandler)
    }

    _setupKeyboardShortcut() {
        this._keydownHandler = (e) => {
            // Alt+A to toggle panel (Changed from Ctrl+Shift+A to avoid Chrome conflict)
            if (e.altKey && e.code === "KeyA") {
                e.preventDefault()
                this.toggle()
            }
            // Escape to close
            if (e.key === "Escape" && this.visible) {
                this.hide()
            }
        }
        document.addEventListener("keydown", this._keydownHandler)
    }

    _loadSettings() {
        try {
            const savePanel = localStorage.getItem("ueblueprint-ai-settings")
            if (savePanel) {
                const settings = JSON.parse(savePanel)
                this.temperature = settings.temperature ?? 0.5
                this.model = settings.model ?? "gpt-4o"
            }

            // Also load API settings for LLM Service
            const savedApi = localStorage.getItem("ueblueprint-api-settings")
            if (savedApi) {
                this.llmService.updateConfig(JSON.parse(savedApi))
            }
        } catch (e) {
            console.warn("Failed to load AI settings:", e)
        }
    }

    _saveSettings() {
        try {
            const settings = {
                temperature: this.temperature,
                model: this.model
            }
            localStorage.setItem("ueblueprint-ai-settings", JSON.stringify(settings))
            // Update service locally too
            this.llmService.updateConfig(settings)
        } catch (e) {
            console.warn("Failed to save AI settings:", e)
        }
    }

    show() {
        this.visible = true
    }

    hide() {
        this.visible = false
    }

    toggle() {
        this.visible = !this.visible
    }

    _handleModeChange(mode) {
        this.mode = mode
    }

    _handlePromptInput(e) {
        this.prompt = e.target.value
    }

    _handleTemperatureChange(e) {
        this.temperature = parseFloat(e.target.value)
        this._saveSettings()
    }

    _handleModelChange(e) {
        this.model = e.target.value
        this._saveSettings()
    }

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
        // Dispatch event for settings panel
        this.dispatchEvent(new CustomEvent("open-settings", { bubbles: true }))
    }

    async _handleGenerate() {
        if (this.isGenerating) return

        if (!this.prompt || !this.prompt.trim()) {
            this.statusText = "Please enter a prompt"
            return
        }

        this.isGenerating = true
        this.statusText = "Generating..."

        try {
            // Update config with latest panel settings before call
            this.llmService.updateConfig({
                model: this.model,
                temperature: this.temperature
            })

            const t3dText = await this.llmService.generate(this.prompt)
            const nodes = this._injectBlueprint(t3dText)
            
            // Wait for UI to update (create elements) then auto layout
            // We need a short delay because Lit updates are async and we want initial sizes if possible
            if (nodes && nodes.length > 0) {
                 setTimeout(() => {
                    LayoutEngine.process(nodes)
                 }, 50)
            }

            this.statusText = "Generation complete!"
        } catch (error) {
            this.statusText = `Error: ${error.message}`
            console.error("Generation failed:", error)
        } finally {
            this.isGenerating = false
        }
    }

    /**
     * Inject Blueprint T3D text
     */
    _injectBlueprint(t3dText) {
        if (!this.blueprint) {
            throw new Error("Blueprint instance not set")
        }

        // Inject via paste interface
        const pasteHandler = this.blueprint.template.getPasteInputObject()
        const nodes = pasteHandler.pasted(t3dText)

        if (!nodes || nodes.length === 0) {
            throw new Error("Failed to parse blueprint text or no nodes generated")
        }

        return nodes
    }

    render() {
        return html`
            <div class="ai-panel ${this.isGenerating ? "generating" : ""}">
                <div class="panel-header" @mousedown=${this._handleDragStart}>
                    <div class="tabs">
                        <button class="tab ${this.mode === "text" ? "active" : ""}"
                                @click=${() => this._handleModeChange("text")}>Text</button>
                        <button class="tab ${this.mode === "image" ? "active" : ""}"
                                @click=${() => this._handleModeChange("image")}>Image</button>
                        <button class="tab ${this.mode === "node" ? "active" : ""}"
                                @click=${() => this._handleModeChange("node")}>Node</button>
                    </div>
                    <div style="display: flex; gap: 4px;">
                        <button class="settings-btn" @click=${this._openSettings} title="Settings">⚙</button>
                        <button class="close-btn" @click=${this.hide}>×</button>
                    </div>
                </div>

                <div class="panel-body">
                    <div class="preset-row">
                        <select class="preset-select">
                            <option>Select prompt preset</option>
                        </select>
                        <button class="icon-btn" title="Add preset">+</button>
                        <button class="icon-btn" title="Delete preset">×</button>
                        <button class="icon-btn" title="Save preset">💾</button>
                    </div>

                    <textarea
                        class="prompt-input"
                        placeholder="Enter instructions, or leave empty to use selected text..."
                        .value=${this.prompt}
                        @input=${this._handlePromptInput}
                    ></textarea>

                    <div class="config-row">
                        <span class="config-label">Temperature</span>
                        <input
                            type="number"
                            class="config-input"
                            min="0" max="2" step="0.1"
                            .value=${this.temperature}
                            @change=${this._handleTemperatureChange}
                        >
                    </div>

                    <div class="config-row">
                        <span class="config-label">Model</span>
                        <select class="model-select" @change=${this._handleModelChange}>
                            <option value="gpt-4o" ?selected=${this.model === "gpt-4o"}>gpt-4o | OpenAI</option>
                            <option value="gpt-4o-mini" ?selected=${this.model === "gpt-4o-mini"}>gpt-4o-mini | OpenAI</option>
                            <option value="deepseek-chat" ?selected=${this.model === "deepseek-chat"}>deepseek-chat | DeepSeek</option>
                            <option value="gemini-2.5-flash" ?selected=${this.model === "gemini-2.5-flash"}>gemini-2.5-flash | Yunwu</option>
                        </select>
                    </div>

                    <button
                        class="generate-btn ${this.isGenerating ? "generating" : ""}"
                        @click=${this._handleGenerate}
                        ?disabled=${this.isGenerating}
                    >
                        ${this.isGenerating ? "GENERATING..." : "GENERATE"}
                    </button>
                </div>

                <div class="status-bar">${this.statusText}</div>
            </div>
        `
    }
}

// Removed: customElements.define is called in index.js
