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
    // DeepSeek removed
    gemini: {
        name: "Google Gemini",
        baseUrl: "https://generativelanguage.googleapis.com/v1beta",
        models: ["gemini-2.5-flash", "gemini-2.5-pro", "gemini-1.5-pro", "gemini-1.5-flash"]
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
    openrouter: {
        name: "OpenRouter",
        baseUrl: "https://openrouter.ai/api/v1",
        models: ["google/gemini-2.0-flash-exp:free", "google/gemini-exp-1206:free", "deepseek/deepseek-r1-distill-llama-70b:free", "meta-llama/llama-3.3-70b-instruct:free"]
    },
    custom: {
        name: "Custom",
        baseUrl: "",
        models: []
    }
}

import { DEFAULT_PROMPT_TEMPLATE } from "./prompts.js"

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
        dragOverIndex: { type: Number, state: true },
        showModelDropdown: { type: Boolean, state: true },
        modelFilter: { type: String, state: true },
        debug: { type: Boolean },
        systemPrompt: { type: String },
        maxHistoryLength: { type: Number },
        contextMode: { type: String }
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

        .model-selector {
            position: relative;
            flex: 1;
        }
        
        .model-dropdown-list {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #252525;
            border: 1px solid #3a3a3a;
            border-radius: 4px;
            max-height: 300px;
            overflow-y: auto;
            z-index: 100;
            margin-top: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            display: none;
        }

        .model-dropdown-list.show {
            display: block;
        }

        .model-option {
            padding: 8px 12px;
            cursor: pointer;
            border-bottom: 1px solid #2a2a2a;
            font-size: 13px;
        }
        
        .model-option:hover {
            background: #333;
        }

        .model-option.selected {
            background: #4a7c8c;
            color: white;
        }
    `

    constructor() {
        super()
        this.visible = false
        this.provider = "openai"
        // Current active values (syncs with providerConfigs[provider])
        this.apiKey = ""
        this.baseUrl = PROVIDERS.openai.baseUrl
        this.model = "gpt-4o"
        this.temperature = 0.5
        
        // Multi-provider storage
        this.providerConfigs = {}
        
        this.testStatus = ""
        this.isTesting = false
        this.availableModels = []
        this.isLoadingModels = false
        this.modelsCache = {}
        this.quickModels = []
        this.dragOverIndex = -1
        this.showModelDropdown = false
        this.modelFilter = ""
        this.debug = false
        this.maxHistoryLength = 10
        this.contextMode = "auto"
    }

    connectedCallback() {
        super.connectedCallback()
        this._loadSettings()
    }

    _loadSettings() {
        try {
            const saved = localStorage.getItem("ueblueprint-api-settings")
            let settings = {}
            if (saved) {
                settings = JSON.parse(saved)
            }

            // Global settings
            this.provider = settings.provider ?? "openai"
            this.quickModels = settings.quickModels ?? []
            this.provider = settings.provider ?? "openai"
            this.quickModels = settings.quickModels ?? []
            this.debug = settings.debug ?? false
            this.systemPrompt = settings.systemPrompt ?? DEFAULT_PROMPT_TEMPLATE
            this.maxHistoryLength = settings.maxHistoryLength ?? 10
            this.contextMode = settings.contextMode ?? "auto"

            // Load provider configs
            if (settings.providerConfigs) {
                this.providerConfigs = settings.providerConfigs
            } else {
                // Migration: Create default configs from what we have or defaults
                // If we have legacy flat settings, assign them to the saved provider
                // or default to OpenAI if none saving
                this.providerConfigs = {}
                
                // Initialize all providers with defaults
                for (const [key, config] of Object.entries(PROVIDERS)) {
                    this.providerConfigs[key] = {
                        apiKey: "",
                        baseUrl: config.baseUrl,
                        model: config.models[0] || "",
                        temperature: 0.5
                    }
                }

                // If migration is needed (settings exist but no providerConfigs)
                if (saved) {
                    const legacyProvider = settings.provider || "openai"
                    this.providerConfigs[legacyProvider] = {
                        apiKey: settings.apiKey || "",
                        baseUrl: settings.baseUrl || PROVIDERS[legacyProvider]?.baseUrl || "",
                        model: settings.model || PROVIDERS[legacyProvider]?.models?.[0] || "",
                        temperature: settings.temperature ?? 0.5
                    }
                }
            }

            // Ensure current provider has a config object
            if (!this.providerConfigs[this.provider]) {
                 this.providerConfigs[this.provider] = {
                    apiKey: "",
                    baseUrl: PROVIDERS[this.provider]?.baseUrl || "",
                    model: PROVIDERS[this.provider]?.models?.[0] || "",
                    temperature: 0.5
                }
            }

            // Sync current state with active provider config
            this._applyProviderConfig(this.provider)

            // Load models cache
            const cache = localStorage.getItem("ueblueprint-api-models-cache")
            if (cache) {
                this.modelsCache = JSON.parse(cache)
            }
            
            this._updateAvailableModels()
            
        } catch (e) {
            console.warn("Failed to load API settings:", e)
            // Fallback initialization
            this.providerConfigs = {}
            for (const [key, config] of Object.entries(PROVIDERS)) {
                this.providerConfigs[key] = {
                    apiKey: "",
                    baseUrl: config.baseUrl,
                    model: config.models[0] || "",
                    temperature: 0.5
                }
            }
        }
    }

    _applyProviderConfig(provider) {
        const config = this.providerConfigs[provider] || {}
        this.apiKey = config.apiKey || ""
        this.baseUrl = config.baseUrl || PROVIDERS[provider]?.baseUrl || ""
        this.model = config.model || PROVIDERS[provider]?.models?.[0] || ""
        this.temperature = config.temperature ?? 0.5
    }

    _updateProviderConfig(provider, updates) {
        if (!this.providerConfigs[provider]) {
             this.providerConfigs[provider] = {}
        }
        this.providerConfigs[provider] = { ...this.providerConfigs[provider], ...updates }
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
            // Remove trailing slash from baseUrl if present
            const safeBaseUrl = this.baseUrl.replace(/\/+$/, '')
            let url = `${safeBaseUrl}/models`
            let headers = {
                "Content-Type": "application/json"
            }

            if (this.provider === 'gemini') {
                url = `${url}?key=${this.apiKey}`
            } else {
                headers["Authorization"] = `Bearer ${this.apiKey}`
            }

            const response = await fetch(url, {
                headers: headers
            })

            if (response.ok) {
                const data = await response.json()
                // Support generic OpenAI format and some variations
                let models = []
                if (this.provider === 'gemini' && Array.isArray(data.models)) {
                    // Gemini format: { models: [{ name: "models/gemini-pro" }] }
                    // We strip "models/" prefix for simpler display/usage if preferred, or keep as is.
                    // The user config likely expects short names "gemini-2.5-flash" but API returns "models/gemini-2.5-flash".
                    // Let's filter/clean.
                    models = data.models.map(m => m.name.replace(/^models\//, ''))
                } else if (Array.isArray(data.data)) {
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
                        this._updateProviderConfig(this.provider, { model: this.model })
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
            // Update current provider config state before saving to be sure
            this._updateProviderConfig(this.provider, {
                apiKey: this.apiKey,
                baseUrl: this.baseUrl,
                model: this.model,
                temperature: this.temperature
            })

            const settings = {
                provider: this.provider,
                providerConfigs: this.providerConfigs, // Save all configs
                quickModels: this.quickModels,
                debug: this.debug,
                systemPrompt: this.systemPrompt,
                maxHistoryLength: this.maxHistoryLength,
                contextMode: this.contextMode,
                
                // Legacy fields for backward compatibility (optional, but good for safety)
                apiKey: this.apiKey,
                baseUrl: this.baseUrl,
                model: this.model,
                temperature: this.temperature
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
        const newProvider = e.target.value
        this.provider = newProvider
        
        // Ensure config exists
        if (!this.providerConfigs[this.provider]) {
             this.providerConfigs[this.provider] = {
                apiKey: "",
                baseUrl: PROVIDERS[this.provider]?.baseUrl || "",
                model: PROVIDERS[this.provider]?.models?.[0] || "",
                temperature: 0.5
            }
        }

        // Apply new provider settings to UI state
        this._applyProviderConfig(this.provider)
        
        this.testStatus = ""
        
        this._updateAvailableModels()
        
        this._saveSettings()
        
        // Auto-fetch if first time (empty cache) and we have an API key
        if ((!this.modelsCache[this.provider] || this.modelsCache[this.provider].length === 0) && this.apiKey) {
            this._fetchModels()
        } else {
             // Reset model logic
             if (this.availableModels.length > 0 && !this.availableModels.includes(this.model)) {
                 this.model = this.availableModels[0]
                 this._updateProviderConfig(this.provider, { model: this.model })
                 this._saveSettings()
             } else if (this.availableModels.length === 0 && !this.model) {
                 this.model = ""
                 this._saveSettings()
             }
        }
    }

    _handleApiKeyChange(e) {
        this.apiKey = e.target.value
        this.testStatus = ""
        this._updateProviderConfig(this.provider, { apiKey: this.apiKey })
        this._saveSettings()
    }

    _handleBaseUrlChange(e) {
        this.baseUrl = e.target.value
        this.testStatus = ""
        this._updateProviderConfig(this.provider, { baseUrl: this.baseUrl })
        this._saveSettings()
    }

    _handleModelChange(e) {
        this.model = e.target.value
        this._updateProviderConfig(this.provider, { model: this.model })
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
        const oldProvider = this.provider
        this.provider = qm.provider
        
        // 1. Ensure config object exists
        if (!this.providerConfigs[this.provider]) {
             this.providerConfigs[this.provider] = {
                apiKey: "",
                baseUrl: PROVIDERS[this.provider]?.baseUrl || "",
                model: PROVIDERS[this.provider]?.models?.[0] || "",
                temperature: 0.5
            }
        }

        // 2. Apply saved config (API Key, etc.)
        this._applyProviderConfig(this.provider)

        // 3. Override with specific quick model details
        // Restore baseUrl if saved in quick model (mostly for custom)
        if (qm.baseUrl && this.provider === 'custom') {
            this.baseUrl = qm.baseUrl
        }
        
        // Set the model from the quick shortcut
        this.model = qm.model
        
        // Update state to match
        this._updateAvailableModels()
        
        // Update the provider config to reflect this new model selection
        this._updateProviderConfig(this.provider, { 
            model: this.model,
            baseUrl: this.baseUrl
        })

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



    _handleModelFilterInput(e) {
        this.modelFilter = e.target.value
        this.showModelDropdown = true
        // If user clears input, still show dropdown
    }

    _handleModelInputFocus() {
        this.modelFilter = this.model
        this.showModelDropdown = true
    }
    
    _handleModelInputBlur() {
        // Small delay to allow click event on option to fire before closing
        setTimeout(() => {
            this.showModelDropdown = false
            // If we didn't select a new model (dropdown closed), revert display to current model
            // But if the user typed a custom model name and we want to support that?
            // For now, let's strictly support selection from list OR custom input if list is empty.
            // But wait, what if the user types something valid that is in the list but didn't click?
            // Let's just reset to this.model for visual consistency
            if (!this.showModelDropdown) {
                 this.modelFilter = this.model
                 this.requestUpdate()
            }
        }, 200)
    }

    _handleModelSelect(m) {
        this.model = m
        this.modelFilter = m
        this.showModelDropdown = false
        this._saveSettings()
    }

    _handleDebugChange(e) {
        this.debug = e.target.checked
        this._saveSettings()
    }

    _handleSystemPromptChange(e) {
        this.systemPrompt = e.target.value
        this._saveSettings()
    }

    _resetSystemPrompt() {
        this.systemPrompt = DEFAULT_PROMPT_TEMPLATE
        this._saveSettings()
    }

    _handleHistoryLengthChange(e) {
        let val = parseInt(e.target.value)
        if (isNaN(val) || val < 2) val = 2
        this.maxHistoryLength = val
        this._saveSettings()
    }

    _handleContextModeChange(e) {
        this.contextMode = e.target.value
        this._saveSettings()
    }

    async _handleTest() {
        if (!this.apiKey) {
            this.testStatus = "error:Please enter an API key"
            return
        }

        this.isTesting = true
        this.testStatus = "testing:Testing connection..."

        try {
            // Remove trailing slash from baseUrl if present
            const safeBaseUrl = this.baseUrl.replace(/\/+$/, '')
            let url = `${safeBaseUrl}/models`
            let headers = {
                "Content-Type": "application/json"
            }

            if (this.provider === 'gemini') {
                url = `${url}?key=${this.apiKey}`
            } else {
                headers["Authorization"] = `Bearer ${this.apiKey}`
            }

            const response = await fetch(url, {
                method: "GET",
                headers: headers
            })

            if (response.ok) {
                const data = await response.json()
                let modelCount = 0
                if (Array.isArray(data.models)) {
                    modelCount = data.models.length
                } else {
                    modelCount = data.data?.length ?? 0
                }
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
                        <div class="section-title" style="display: flex; justify-content: space-between; align-items: center;">
                            <span>API Configuration</span>
                            <span style="font-size: 12px; color: #888; font-weight: normal;">Data is stored locally</span>
                        </div>

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

                        <div class="setting-group">
                            <div class="section-title">System Prompt</div>
                            <div class="setting-row">
                                <label class="setting-label">Chat System Prompt (Template)</label>
                                <span class="setting-description">
                                    Customize the AI persona. Supports placeholders: 
                                    <code>{{MODE}}</code> (Blueprint/Material), 
                                    <code>{{CONTEXT}}</code> (Selected nodes).
                                </span>
                                <textarea
                                    class="setting-input"
                                    style="height: 120px; font-family: monospace; line-height: 1.4;"
                                    .value=${this.systemPrompt}
                                    @input=${this._handleSystemPromptChange}
                                    placeholder="You are a UE5 {{MODE}} expert..."
                                ></textarea>
                                <button 
                                    class="add-quick-btn" 
                                    @click=${this._resetSystemPrompt}
                                    style="margin-top: 4px;"
                                >
                                    Reset to Default
                                </button>
                            </div>
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
                                    <div class="model-selector">
                                        <input
                                            type="text"
                                            class="setting-input"
                                            .value=${this.showModelDropdown ? this.modelFilter : this.model}
                                            @input=${this._handleModelFilterInput}
                                            @focus=${this._handleModelInputFocus}
                                            @blur=${this._handleModelInputBlur}
                                            placeholder="Select or search model..."
                                        >
                                        <div class="model-dropdown-list ${this.showModelDropdown ? 'show' : ''}">
                                            ${this.availableModels
                                                .filter(m => !this.modelFilter || m.toLowerCase().includes(this.modelFilter.toLowerCase()))
                                                .map(m => html`
                                                    <div 
                                                        class="model-option ${this.model === m ? 'selected' : ''}"
                                                        @mousedown=${() => this._handleModelSelect(m)}
                                                    >
                                                        ${m}
                                                    </div>
                                                `)}
                                            ${this.availableModels.filter(m => !this.modelFilter || m.toLowerCase().includes(this.modelFilter.toLowerCase())).length === 0 ? html`
                                                <div class="model-option" style="cursor: default; color: #888;">No matching models</div>
                                            ` : ''}
                                        </div>
                                    </div>
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
                        
                        <div class="setting-row" style="margin-top: 16px; border-top: 1px solid #3a3a3a; padding-top: 12px;">
                             <div class="input-row" style="align-items: center;">
                                 <input 
                                     type="checkbox" 
                                     id="debug-switch"
                                     .checked=${this.debug}
                                     @change=${this._handleDebugChange}
                                     style="width: auto; margin-right: 8px;"
                                 >
                                 <label for="debug-switch" class="setting-label" style="margin-bottom: 0; cursor: pointer;">Debug Mode</label>
                             </div>
                             <span class="setting-description" style="margin-left: 20px; display: block;">Show generation logs in chat history</span>
                        </div>

                        <div class="setting-row" style="margin-top: 12px; border-top: 1px solid #3a3a3a; padding-top: 12px;">
                            <label class="setting-label">Chat History Limit (Messages)</label>
                            <div class="input-row" style="align-items: center;">
                                <input 
                                    type="number" 
                                    class="setting-input" 
                                    .value=${String(this.maxHistoryLength)}
                                    @change=${this._handleHistoryLengthChange}
                                    min="2" max="50" step="2"
                                >
                            </div>
                            <span class="setting-description">Number of messages to keep in context (each round is 2 messages)</span>
                        </div>

                        <div class="setting-row" style="margin-top: 12px;">
                            <label class="setting-label">Context Mode</label>
                            <span class="setting-description">Optimize token usage for large graphs</span>
                            <select class="setting-select" @change=${this._handleContextModeChange}>
                                <option value="auto" ?selected=${this.contextMode === 'auto'}>Auto (Smart Summary)</option>
                                <option value="full" ?selected=${this.contextMode === 'full'}>Always Full Context</option>
                                <option value="summary" ?selected=${this.contextMode === 'summary'}>Always Summary (Nodes Only)</option>
                                <option value="none" ?selected=${this.contextMode === 'none'}>None (No Context)</option>
                            </select>
                        </div>
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
