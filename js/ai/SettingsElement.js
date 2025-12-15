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
        testStatus: { type: String },
        isTesting: { type: Boolean },
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
    `

    constructor() {
        super()
        this.visible = false
        this.provider = "openai"
        this.apiKey = ""
        this.baseUrl = PROVIDERS.openai.baseUrl
        this.testStatus = ""
        this.isTesting = false
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
            }
        } catch (e) {
            console.warn("Failed to load API settings:", e)
        }
    }

    _saveSettings() {
        try {
            const settings = {
                provider: this.provider,
                apiKey: this.apiKey,
                baseUrl: this.baseUrl
            }
            localStorage.setItem("ueblueprint-api-settings", JSON.stringify(settings))
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
    }

    _handleApiKeyChange(e) {
        this.apiKey = e.target.value
        this.testStatus = ""
    }

    _handleBaseUrlChange(e) {
        this.baseUrl = e.target.value
        this.testStatus = ""
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

    _handleSave() {
        this._saveSettings()
        this.dispatchEvent(new CustomEvent("ueb-ai-settings-saved", {
            bubbles: true,
            detail: {
                provider: this.provider,
                apiKey: this.apiKey,
                baseUrl: this.baseUrl
            }
        }))
        this.hide()
    }

    _handleCancel() {
        this._loadSettings() // Revert changes
        this.hide()
    }

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
                    </div>

                    <div class="setting-group">
                        <div class="section-title">Model configuration</div>
                        <div class="setting-row">
                            <span class="setting-description">
                                Available models for ${providerConfig?.name ?? "this provider"}:
                                ${providerConfig?.models?.join(", ") || "Custom models"}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="panel-footer">
                    <button class="cancel-btn" @click=${this._handleCancel}>Cancel</button>
                    <button class="save-btn" @click=${this._handleSave}>Save</button>
                </div>
            </div>
        ` 
    }
}

// Removed: customElements.define is called in index.js
