/**
 * Settings Element - API Configuration Panel
 * Lit-based web component for API provider settings
 */

import { LitElement, html, css } from "lit"

/**
 * @typedef {Object} ProviderConfig
 * @property {string} name
 * @property {string} baseUrl
 * @property {string[]} models
 */

/** @type {Record<string, ProviderConfig>} */
const PROVIDERS = {
    openai: {
        name: "OpenAI",
        baseUrl: "https://api.openai.com/v1",
        models: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo"]
    },
    deepseek: {
        name: "DeepSeek",
        baseUrl: "https://api.deepseek.com/v1",
        models: ["deepseek-chat", "deepseek-coder"]
    },
    gptgod: {
        name: "GPTGod",
        baseUrl: "https://api.gptgod.online/v1",
        models: ["gpt-4o", "gpt-4o-mini", "claude-3-5-sonnet"]
    },
    yunwu: {
        name: "Yunwu",
        baseUrl: "https://yunwu.ai/v1",
        models: ["gemini-2.5-flash-thinking", "gemini-2.5-flash", "gemini-2.5-pro"]
    },
    custom: {
        name: "Custom",
        baseUrl: "",
        models: []
    }
}

export default class SettingsElement extends LitElement {

    static properties = {
        visible: { type: Boolean, reflect: true },
        provider: { type: String },
        apiKey: { type: String },
        baseUrl: { type: String },
        model: { type: String },
        temperature: { type: Number },
        testStatus: { type: String },
        isTesting: { type: Boolean },
        availableModels: { type: Array, state: true },
        isLoadingModels: { type: Array, state: true },
        quickModels: { type: Array, state: true },
        dragOverIndex: { type: Number, state: true }
    }

    static styles = css`
        :host {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.7);
        }

        :host([visible]) {
            display: flex;
        }

        .settings-panel {
            background: #1a1a1a;
            border: 1px solid #3a3a3a;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            width: 550px;
            max-height: 80vh;
            overflow-y: auto;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #e0e0e0;
        }

        .panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            background: #252525;
            border-bottom: 1px solid #3a3a3a;
        }

        .panel-title {
            font-size: 16px;
            font-weight: 500;
        }

        .close-btn {
            background: none;
            border: none;
            color: #888;
            font-size: 20px;
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 4px;
        }

        .close-btn:hover {
            background: #333;
            color: #fff;
        }

        .panel-body {
            padding: 20px;
        }

        .setting-group {
            margin-bottom: 20px;
        }

        .setting-row {
            margin-bottom: 16px;
        }

        .setting-label {
            display: block;
            font-size: 14px;
            color: #e0e0e0;
            margin-bottom: 4px;
        }

        .setting-description {
            font-size: 12px;
            color: #888;
            margin-bottom: 8px;
        }

        .setting-input {
            width: 100%;
            padding: 10px 12px;
            background: #2a2a2a;
            border: 1px solid #3a3a3a;
            border-radius: 4px;
            color: #e0e0e0;
            font-size: 14px;
            box-sizing: border-box;
        }

        .setting-input:focus {
            outline: none;
            border-color: #4a7c8c;
        }

        .setting-select {
            width: 100%;
            padding: 10px 12px;
            background: #2a2a2a;
            border: 1px solid #3a3a3a;
            border-radius: 4px;
            color: #e0e0e0;
            font-size: 14px;
        }

        .input-row {
            display: flex;
            gap: 8px;
        }

        .input-row .setting-input {
            flex: 1;
        }

        .test-btn {
            padding: 10px 16px;
            background: #3a3a3a;
            border: 1px solid #4a4a4a;
            border-radius: 4px;
            color: #e0e0e0;
            font-size: 13px;
            cursor: pointer;
            white-space: nowrap;
        }

        .test-btn:hover:not(:disabled) {
            background: #4a4a4a;
        }

        .test-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .test-status {
            font-size: 12px;
            margin-top: 8px;
            padding: 8px;
            border-radius: 4px;
        }

        .test-status.success {
            background: rgba(129, 199, 132, 0.2);
            color: #81c784;
        }

        .test-status.error {
            background: rgba(229, 115, 115, 0.2);
            color: #e57373;
        }

        .test-status.testing {
            background: rgba(100, 181, 246, 0.2);
            color: #64b5f6;
        }

        .section-title {
            font-size: 14px;
            font-weight: 500;
            color: #4a7c8c;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid #3a3a3a;
        }

        .panel-footer {
            padding: 16px 20px;
            background: #252525;
            border-top: 1px solid #3a3a3a;
            display: flex;
            justify-content: flex-end;
            gap: 8px;
        }

        .save-btn {
            padding: 10px 24px;
            background: #4a7c8c;
            border: none;
            border-radius: 4px;
            color: white;
            font-size: 14px;
            cursor: pointer;
        }

        .save-btn:hover {
            background: #5a8c9c;
        }

        .cancel-btn {
            padding: 10px 24px;
            background: #3a3a3a;
            border: none;
            border-radius: 4px;
            color: #e0e0e0;
            font-size: 14px;
            cursor: pointer;
        }

        .cancel-btn:hover {
            background: #4a4a4a;
        }

        .quick-list-container {
            margin-top: 10px;
            padding: 10px;
            background: #202020;
            border-radius: 4px;
            border: 1px solid #333;
        }

        .quick-list-label {
            font-size: 12px;
            color: #888;
            margin-bottom: 8px;
            display: block;
        }

        .quick-models-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .quick-model-tag {
            display: flex;
            align-items: center;
            background: #2a2a2a;
            border: 1px solid #3a3a3a;
            border-radius: 4px;
            padding: 4px 8px;
            font-size: 12px;
            color: #e0e0e0;
            cursor: pointer;
            user-select: none;
            transition: all 0.2s;
        }

        .quick-model-tag:hover {
            background: #333;
            border-color: #4a7c8c;
        }
        
        .quick-model-tag.dragging {
            opacity: 0.5;
            background: #252525;
        }
        
        .quick-model-tag.drag-over {
            border-left: 2px solid #4a7c8c;
        }

        .quick-model-info {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .delete-quick-btn {
            background: none;
            border: none;
            color: #666;
            margin-left: 6px;
            padding: 2px;
            cursor: pointer;
            font-size: 14px;
            line-height: 1;
            display: flex;
            align-items: center;
        }

        .delete-quick-btn:hover {
            color: #e57373;
        }
        
        .add-quick-btn {
            background: none;
            border: none;
            color: #4a7c8c;
            cursor: pointer;
            font-size: 12px;
            text-decoration: underline;
            padding: 4px 0;
            margin-top: 4px;
            display: inline-block;
        }
        
        .add-quick-btn:hover {
            color: #5a8c9c;
        }
    `

    constructor() {
        super()
        this.visible = false
        this.provider = "openai"
        this.apiKey = ""
        this.baseUrl = PROVIDERS.openai.baseUrl
        this.model = "gpt-4o"
        this.temperature = 0.5
        this.testStatus = ""
        this.isTesting = false
        this.availableModels = []
        this.availableModels = []
        this.isLoadingModels = false
        this.modelsCache = {}
        this.quickModels = []
        this.dragOverIndex = -1
    }

    connectedCallback() {
        super.connectedCallback()
        this._loadSettings()
    }

    _loadSettings() {
        try {
            const saved = localStorage.getItem("ueblueprint-api-settings")
            if (saved) {
                const settings = JSON.parse(saved)
                this.provider = settings.provider ?? "openai"
                this.apiKey = settings.apiKey ?? ""
                this.baseUrl = settings.baseUrl ?? PROVIDERS[this.provider]?.baseUrl ?? ""
                this.model = settings.model ?? "gpt-4o"
                this.temperature = settings.temperature ?? 0.5
                this.quickModels = settings.quickModels ?? []
            }
            
            // Load models cache
            const cache = localStorage.getItem("ueblueprint-api-models-cache")
            if (cache) {
                this.modelsCache = JSON.parse(cache)
            }
            
            this._updateAvailableModels()
            
        } catch (e) {
            console.warn("Failed to load API settings:", e)
        }
    }

    _updateAvailableModels() {
        // Use cached models if available, otherwise fallback to default provider list
        if (this.modelsCache[this.provider] && this.modelsCache[this.provider].length > 0) {
            this.availableModels = this.modelsCache[this.provider]
        } else {
            this.availableModels = PROVIDERS[this.provider]?.models || []
        }
    }

    async _fetchModels() {
        if (!this.apiKey) return

        this.isLoadingModels = true
        try {
            const response = await fetch(`${this.baseUrl}/models`, {
                headers: { 
                    "Authorization": `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                const data = await response.json()
                // Support generic OpenAI format and some variations
                let models = []
                if (Array.isArray(data.data)) {
                    models = data.data.map(m => m.id)
                } else if (Array.isArray(data)) {
                    models = data.map(m => m.id || m)
                }

                if (models.length > 0) {
                    models.sort()
                    this.availableModels = models
                    this.modelsCache[this.provider] = models
                    localStorage.setItem("ueblueprint-api-models-cache", JSON.stringify(this.modelsCache))
                    
                    // If current model is invalid, select first available
                    if (this.model && !models.includes(this.model)) {
                        /* Keep current model even if not in list? Maybe not. */
                    }
                    if (!this.model && models.length > 0) {
                        this.model = models[0]
                         // Save immediately if we auto-selected
                        this._saveSettings()
                    }
                }
            }
        } catch (e) {
            console.error("Failed to fetch models:", e)
        } finally {
            this.isLoadingModels = false
        }
    }

    async _handleRefreshModels() {
        await this._fetchModels()
    }

    _saveSettings() {
        try {
            const settings = {
                provider: this.provider,
                apiKey: this.apiKey,
                baseUrl: this.baseUrl,
                model: this.model,
                temperature: this.temperature,
                quickModels: this.quickModels
            }
            localStorage.setItem("ueblueprint-api-settings", JSON.stringify(settings))
            
            this.dispatchEvent(new CustomEvent("ueb-ai-settings-saved", {
                bubbles: true,
                detail: settings
            }))
        } catch (e) {
            console.warn("Failed to save API settings:", e)
        }
    }

    show() {
        this.visible = true
    }

    hide() {
        this.visible = false
    }

    _handleProviderChange(e) {
        this.provider = e.target.value
        const config = PROVIDERS[this.provider]
        if (config && this.provider !== "custom") {
            this.baseUrl = config.baseUrl
        }
        this.testStatus = ""
        
        this._updateAvailableModels()
        
        this._saveSettings()
        
        // Auto-fetch if first time (empty cache) and we have an API key
        if ((!this.modelsCache[this.provider] || this.modelsCache[this.provider].length === 0) && this.apiKey) {
            this._fetchModels()
        } else {
             // Reset model logic: if we have models, pick first if current is invalid
             // Just ensure this.model is in the list
             if (this.availableModels.length > 0 && !this.availableModels.includes(this.model)) {
                 this.model = this.availableModels[0]
                 this._saveSettings()
             } else if (this.availableModels.length === 0) {
                 this.model = ""
                 this._saveSettings()
             }
        }
    }

    _handleApiKeyChange(e) {
        this.apiKey = e.target.value
        this.testStatus = ""
        this._saveSettings()
    }

    _handleBaseUrlChange(e) {
        this.baseUrl = e.target.value
        this.testStatus = ""
        this._saveSettings()
    }

    _handleModelChange(e) {
        this.model = e.target.value
        this._saveSettings()
    }

    _handleAddQuickModel() {
        if (!this.model) return
        
        const exists = this.quickModels.some(m => 
            m.model === this.model && m.provider === this.provider
        )
        
        if (!exists) {
            this.quickModels = [...this.quickModels, {
                provider: this.provider,
                model: this.model,
                baseUrl: this.baseUrl // Optional: save baseUrl if custom
            }]
            this._saveSettings()
        }
    }

    _handleRemoveQuickModel(index, e) {
        e.stopPropagation()
        const newModels = [...this.quickModels]
        newModels.splice(index, 1)
        this.quickModels = newModels
        this._saveSettings()
    }

    _handleQuickModelClick(qm) {
        this.provider = qm.provider
        // Restore baseUrl if saved, or from provider config
        if (qm.baseUrl && this.provider === 'custom') {
            this.baseUrl = qm.baseUrl
        } else {
            this.baseUrl = PROVIDERS[this.provider]?.baseUrl || qm.baseUrl || ""
        }
        
        // Update models list for this provider
        this._updateAvailableModels()
        
        // Set model
        this.model = qm.model
        
        // Save
        this._saveSettings()
    }

    _handleDragStart(e, index) {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', index)
        e.target.classList.add('dragging')
    }

    _handleDragEnd(e) {
        e.target.classList.remove('dragging')
        this.dragOverIndex = -1
    }

    _handleDragOver(e, index) {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
        if (this.dragOverIndex !== index) {
            this.dragOverIndex = index
        }
    }

    _handleDrop(e, index) {
        e.preventDefault()
        const fromIndex = parseInt(e.dataTransfer.getData('text/plain'))
        if (fromIndex !== index) {
            const newModels = [...this.quickModels]
            const [moved] = newModels.splice(fromIndex, 1)
            newModels.splice(index, 0, moved)
            this.quickModels = newModels
            this._saveSettings()
        }
        this.dragOverIndex = -1
    }



    async _handleTest() {
        if (!this.apiKey) {
            this.testStatus = "error:Please enter an API key"
            return
        }

        this.isTesting = true
        this.testStatus = "testing:Testing connection..."

        try {
            const response = await fetch(`${this.baseUrl}/models`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                const data = await response.json()
                const modelCount = data.data?.length ?? 0
                this.testStatus = `success:Connection successful! Found ${modelCount} models.`
            } else {
                const errorText = await response.text()
                this.testStatus = `error:API error: ${response.status} - ${errorText.slice(0, 100)}`
            }
        } catch (error) {
            this.testStatus = `error:Connection failed: ${error.message}`
        } finally {
            this.isTesting = false
        }
    }

    // Saved automatically on change.
    // _handleSave and _handleCancel are removed.

    _handleOverlayClick(e) {
        if (e.target === this) {
            this.hide()
        }
    }

    _renderTestStatus() {
        if (!this.testStatus) return null

        const [type, message] = this.testStatus.split(":")
        return html`<div class="test-status ${type}">${message}</div>`
    }

    render() {
        const providerConfig = PROVIDERS[this.provider]

        return html`
            <div class="settings-panel" @click=${(e) => e.stopPropagation()}>
                <div class="panel-header">
                    <span class="panel-title">AI Settings</span>
                    <button class="close-btn" @click=${this.hide}>×</button>
                </div>

                <div class="panel-body">
                    <div class="setting-group">
                        <div class="section-title">API Configuration</div>

                        <div class="setting-row">
                            <label class="setting-label">API provider</label>
                            <span class="setting-description">Select API provider</span>
                            <select class="setting-select" @change=${this._handleProviderChange}>
                                ${Object.entries(PROVIDERS).map(([key, config]) => html`
                                    <option value=${key} ?selected=${this.provider === key}>${config.name}</option>
                                `)}
                            </select>
                        </div>

                        <div class="setting-row">
                            <label class="setting-label">${providerConfig?.name ?? "API"} API key</label>
                            <span class="setting-description">Enter your ${providerConfig?.name ?? "API"} API key</span>
                            <div class="input-row">
                                <input
                                    type="password"
                                    class="setting-input"
                                    placeholder="sk-..."
                                    .value=${this.apiKey}
                                    @input=${this._handleApiKeyChange}
                                >
                                <button
                                    class="test-btn"
                                    @click=${this._handleTest}
                                    ?disabled=${this.isTesting}
                                >
                                    ${this.isTesting ? "Testing..." : "Test connection"}
                                </button>
                            </div>
                            ${this._renderTestStatus()}
                        </div>

                        <div class="setting-row">
                            <label class="setting-label">API base URL</label>
                            <span class="setting-description">API base URL</span>
                            <input
                                type="text"
                                class="setting-input"
                                placeholder="https://api.openai.com/v1"
                                .value=${this.baseUrl}
                                @input=${this._handleBaseUrlChange}
                            >
                        </div>
                        
                        <div class="setting-row">
                            <label class="setting-label">Model</label>
                            <span class="setting-description">Select model for generation</span>
                            <div class="input-row">
                                ${this.provider === 'custom' && this.availableModels.length === 0 ? html`
                                    <input 
                                        type="text" 
                                        class="setting-input" 
                                        .value=${this.model} 
                                        @input=${this._handleModelChange}
                                        placeholder="Enter model name"
                                    >
                                ` : html`
                                    <select class="setting-select" @change=${this._handleModelChange}>
                                        ${this.availableModels.map(m => html`
                                            <option value=${m} ?selected=${this.model === m}>${m}</option>
                                        `)}
                                        ${this.availableModels.length === 0 ? html`<option value="">No models available</option>` : ''}
                                    </select>
                                `}
                                <button 
                                    class="test-btn" 
                                    @click=${this._handleRefreshModels}
                                    ?disabled=${this.isLoadingModels || !this.apiKey}
                                    title="Refresh Model List"
                                    style="width: 40px; padding: 0; display: flex; align-items: center; justify-content: center;"
                                >
                                    ${this.isLoadingModels ? "..." : "↻"}
                                </button>
                            </div>
                            <button class="add-quick-btn" @click=${this._handleAddQuickModel}>+ Add to Quick Switch List</button>
                        </div>
                        
                        ${this.quickModels.length > 0 ? html`
                            <div class="quick-list-container">
                                <span class="quick-list-label">Quick Switch: Drag to reorder</span>
                                <div class="quick-models-grid">
                                    ${this.quickModels.map((qm, index) => html`
                                        <div 
                                            class="quick-model-tag ${this.dragOverIndex === index ? 'drag-over' : ''}"
                                            draggable="true"
                                            @dragstart=${(e) => this._handleDragStart(e, index)}
                                            @dragend=${this._handleDragEnd}
                                            @dragover=${(e) => this._handleDragOver(e, index)}
                                            @drop=${(e) => this._handleDrop(e, index)}
                                            @click=${() => this._handleQuickModelClick(qm)}
                                        >
                                            <span class="quick-model-info">
                                                ${qm.model} <span style="opacity:0.6">| ${PROVIDERS[qm.provider]?.name || qm.provider}</span>
                                            </span>
                                            <button class="delete-quick-btn" @click=${(e) => this._handleRemoveQuickModel(index, e)}>×</button>
                                        </div>
                                    `)}
                                </div>
                            </div>
                        ` : ''}
                    </div>

                    </div>


                </div>

                <div class="panel-footer" style="border:none; padding: 10px;">
                    <!-- Auto-save enabled -->
                </div>
            </div>
        ` 
    }
}

// Removed: customElements.define is called in index.js
