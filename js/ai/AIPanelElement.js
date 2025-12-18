/**
 * AI Panel Element - AI Assistant Floating Panel
 * Lit-based web component for UE Blueprint AI generation
 */

import { LitElement, html, css } from "lit"
import { unsafeHTML } from "lit/directives/unsafe-html.js"
import LLMService from "./LLMService.js"
import LayoutEngine from "./LayoutEngine.js"
import { BLUEPRINT_SYSTEM_PROMPT, MATERIAL_SYSTEM_PROMPT, BLUEPRINT_CHAT_PROMPT, MATERIAL_CHAT_PROMPT, DEFAULT_PROMPT_TEMPLATE } from "./prompts.js"
import { getSlimPrompt } from "./slimPrompts.js"
import { convertSlimIRToT3D } from "./SlimIRToT3D.js"
import { enhancePromptWithExamples } from "./NodeExampleService.js"
import { getClassIndexText } from "./NodeClassIndex.js"
import { parseMarkdown } from "./MarkdownParser.js"
import LinearColorEntity from "../entity/LinearColorEntity.js"
import ObjectEntity from "../entity/ObjectEntity.js"
import nodeTitle from "../decoding/nodeTitle.js"

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
        systemPrompt: { type: String },
        providerConfigs: { type: Object },
        // Slim IR mode (experimental) - generates compact JSON then converts to T3D
        useSlimIR: { type: Boolean },
        maxHistoryLength: { type: Number },
        contextMode: { type: String },
        temperature: { type: Number }
    }

    static styles = css`
        :host {
            position: fixed;
            top: 30px;
            right: 0;
            bottom: 0;
            z-index: 9999;
            display: none;
        }

        :host([visible]) {
            display: flex;
        }

        .ai-panel {
            background: #1a1a1a;
            border: 1px solid #3a3a3a;
            border-radius: 0;
            box-shadow: -4px 0 16px rgba(0, 0, 0, 0.3);
            width: 400px;
            height: 100%;
            min-width: 280px;
            max-width: 90vw;
            resize: horizontal;
            overflow: auto;
            direction: rtl; /* Move resize handle to left side */
            display: flex;
            flex-direction: column;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #e0e0e0;
        }

        .ai-panel > * {
            direction: ltr; /* Reset text direction for content */
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
            background: transparent;
            padding: 2px;
            border-radius: 4px;
        }

        .tab {
            padding: 4px 12px;
            background: transparent;
            border: none;
            border-bottom: 2px solid transparent;
            border-radius: 0;
            color: #666;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.2s;
        }

        .tab:hover {
            color: #aaa;
        }

        .tab.active {
            border-bottom-color: #4a7c8c;
            color: #fff;
        }

        .tab.active.material {
            border-bottom-color: #7c4a8c;
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

        .prompt-wrapper {
            display: flex;
            flex-direction: column;
        }

        .prompt-resize-handle {
            height: 6px;
            background: transparent;
            cursor: ns-resize;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 2px;
        }

        .prompt-resize-handle::before {
            content: '';
            width: 40px;
            height: 3px;
            background: #3a3a3a;
            border-radius: 2px;
            transition: background 0.2s;
        }

        .prompt-resize-handle:hover::before {
            background: #5a5a5a;
        }

        .prompt-input {
            width: 100%;
            min-height: 60px;
            max-height: 400px;
            padding: 10px;
            background: #1a1a1a;
            border: 1px solid #3a3a3a;
            border-radius: 6px;
            color: #e0e0e0;
            font-size: 14px;
            resize: none;
            direction: ltr;
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
        this.providerConfigs = {}
        this.debug = false
        this.systemPrompt = DEFAULT_PROMPT_TEMPLATE
        this.abortController = null
        this.pendingImages = [] // Images pending to be sent with next message
        this.useSlimIR = localStorage.getItem("ueb-ai-slim-ir") !== "false" // Default enabled
        this.maxHistoryLength = 10
        this.contextMode = "auto"
        this.contextMode = "auto"
        this.temperature = 1.0

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
                this.providerConfigs = settings.providerConfigs || {}
                this.quickModels = settings.quickModels || []
                this.debug = settings.debug || false
                this.llmService.setDebug(this.debug)
                this.systemPrompt = settings.systemPrompt || DEFAULT_PROMPT_TEMPLATE
                this.maxHistoryLength = settings.maxHistoryLength ?? 10
                this.contextMode = settings.contextMode ?? "auto"
                
                // If the user actively chose a provider/model in settings, update the active selection
                if (settings.provider && settings.providerConfigs[settings.provider]?.apiKey) {
                     this.provider = settings.provider
                     if (settings.model) {
                         this.model = settings.model
                     }
                }

                // If we currently have no valid provider selected, fallback to settings
                if (!this.model || !this.provider) {
                    this.model = settings.model || ""
                    this.provider = settings.provider || ""
                }

                // Construct config to apply (respecting local override)
                let configUpdate = { ...settings }
                
                // If local selection exists, ensure we use its provider config
                if (this.model && this.provider && this.providerConfigs[this.provider]) {
                    const pConfig = this.providerConfigs[this.provider]
                    configUpdate = {
                        ...configUpdate,
                        apiKey: pConfig.apiKey,
                        baseUrl: pConfig.baseUrl,
                        model: this.model,
                        provider: this.provider
                    }
                    
                    // Apply quick model specific baseUrl if any
                    const quickEntry = this.quickModels.find(qm => qm.model === this.model && qm.provider === this.provider)
                    if (quickEntry && quickEntry.baseUrl) {
                        configUpdate.baseUrl = quickEntry.baseUrl
                    }
                }

                this.llmService.updateConfig(configUpdate)
                // Force UI update to check if warning should be removed
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
            // Shortcuts disabled
        }
        document.addEventListener("keydown", this._keydownHandler)
    }

    _loadSettings() {
        try {
            // Load global settings
            const savedApi = localStorage.getItem("ueblueprint-api-settings")
            if (savedApi) {
                const settings = JSON.parse(savedApi)
                
                // Store provider configs for switching
                this.providerConfigs = settings.providerConfigs || {}
                
                // Update local state
                this.quickModels = settings.quickModels || []
                this.debug = settings.debug || false
                if (this.llmService) this.llmService.setDebug(this.debug)
                this.systemPrompt = settings.systemPrompt || DEFAULT_PROMPT_TEMPLATE
                this.maxHistoryLength = settings.maxHistoryLength ?? 10
                this.contextMode = settings.contextMode ?? "auto"
                
                // 1. Base config from active global settings
                let configToUse = { ...settings }
                
                // 2. Check for local override (Quick Switch selection)
                const savedModel = localStorage.getItem("ueb-ai-model")
                const savedProvider = localStorage.getItem("ueb-ai-provider")
                
                if (savedModel && savedProvider) {
                    this.model = savedModel
                    this.provider = savedProvider
                } else {
                    // Fallback to global defaults
                    this.model = settings.model || ""
                    this.provider = settings.provider || ""
                }
                
                // Load temperature
                const savedTemp = localStorage.getItem("ueb-ai-temperature")
                if (savedTemp !== null) {
                    this.temperature = parseFloat(savedTemp)
                } else if (settings.temperature !== undefined) {
                    this.temperature = settings.temperature
                } else {
                    this.temperature = 1.0
                }
                
                // 3. Construct effective config for LLMService
                // If we have a provider override, try to get its specific config (ApiKey etc) from providerConfigs
                if (this.provider && this.providerConfigs[this.provider]) {
                    const pConfig = this.providerConfigs[this.provider]
                    configToUse = {
                        ...configToUse,
                        apiKey: pConfig.apiKey,
                        baseUrl: pConfig.baseUrl, 
                        model: this.model,
                        provider: this.provider,
                        temperature: this.temperature
                    }
                } else {
                     // Just ensure model is correct if we didn't find provider config
                     configToUse.model = this.model
                     configToUse.provider = this.provider
                }
                
                // If the quick model has a specific custom baseUrl, apply it
                const quickEntry = this.quickModels.find(qm => qm.model === this.model && qm.provider === this.provider)
                if (quickEntry && quickEntry.baseUrl) {
                    configToUse.baseUrl = quickEntry.baseUrl
                }

                this.llmService.updateConfig(configToUse)
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

    /**
     * Get compressed blueprint context for LLM
     * P1 Optimization: Reduce token usage by 50-70%
     */
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
            // Determine context mode
            let useSummary = false
            
            if (this.contextMode === 'none') {
                 return null
            } else if (this.contextMode === 'summary') {
                 useSummary = true
            } else if (this.contextMode === 'full') {
                 useSummary = false
            } else {
                 // Auto mode: Summary if > 50 nodes AND no specific selection
                 // If selectionState is "Selected nodes", user specifically wants context for these, so use full.
                 // If "All nodes" (fallback) and count is high, use summary.
                 if (selectionState === "All nodes" && nodes.length > 50) {
                      useSummary = true
                 }
            }

            // P1: Compressed context format
            const compressed = this._compressContext(nodes, useSummary)
            const modeLabel = useSummary ? "Summary" : "Full"
            return `Context (${selectionState}, ${nodes.length} nodes, ${modeLabel}):\n${compressed}`
        }
        
        return null
    }
    
    /**
     * Compress node context to summary format
     * Format: [NodeType] pin1←, →pin2*
     * @param {Array} nodes - Node elements
     * @param {boolean} summaryOnly - If true, only show node types/names, no pins
     * @returns {string} - Compressed context
     */
    _compressContext(nodes, summaryOnly = false) {
        // Build a map of node Name -> display name for connection resolution
        const nodeNameToTitle = new Map()
        for (const node of nodes) {
            const entity = node.entity
            const name = entity.Name?.toString()
            if (name) {
                let title = nodeTitle(entity)
                if (!title) {
                    if (entity.FunctionReference?.MemberName) {
                        title = entity.FunctionReference.MemberName.toString()
                    } else {
                        const typePath = entity.getType?.() || entity.getClass?.() || ''
                        const lastDot = typePath.lastIndexOf('.')
                        title = lastDot >= 0 ? typePath.substring(lastDot + 1) : typePath
                    }
                }
                nodeNameToTitle.set(name, title || name)
            }
        }
        
        return nodes.map(node => {
            const entity = node.entity
            
            // Get node display name
            let nodeTypeName = nodeTitle(entity)
            if (!nodeTypeName) {
                if (entity.FunctionReference?.MemberName) {
                    nodeTypeName = entity.FunctionReference.MemberName.toString()
                } else if (entity.CustomFunctionName) {
                    nodeTypeName = entity.CustomFunctionName.toString()
                } else {
                    const typePath = entity.getType?.() || entity.getClass?.() || ''
                    const lastDot = typePath.lastIndexOf('.')
                    nodeTypeName = lastDot >= 0 ? typePath.substring(lastDot + 1) : typePath
                }
            }
            
            // If summary only, skip pins
            if (summaryOnly) {
                return `[${nodeTypeName}]`
            }
            
            // Get pin summary with connection targets
            const pins = entity.getPinEntities?.() || []
            const pinDescriptions = []
            
            for (const pin of pins.slice(0, 8)) {
                const pinName = pin.PinName?.toString() || 'pin'
                const linkedTo = pin.LinkedTo?.values || []
                
                if (linkedTo.length > 0) {
                    // Has connections - show targets
                    const targets = linkedTo.slice(0, 2).map(ref => {
                        const targetNodeName = ref.objectName?.toString()
                        const targetTitle = nodeNameToTitle.get(targetNodeName) || targetNodeName || '?'
                        return `[${targetTitle}]`
                    }).join(',')
                    
                    if (pin.isInput?.()) {
                        pinDescriptions.push(`←${pinName} from ${targets}`)
                    } else {
                        pinDescriptions.push(`→${pinName} to ${targets}`)
                    }
                } else {
                    // No connection - show default value if meaningful
                    const defaultVal = pin.DefaultValue
                    if (defaultVal !== undefined && defaultVal !== null) {
                        const valStr = defaultVal.toString?.() || ''
                        if (valStr && valStr !== '' && valStr !== '0' && valStr !== 'false') {
                            pinDescriptions.push(`${pinName}=${valStr.slice(0, 20)}`)
                        }
                    }
                }
            }
            
            const summary = pinDescriptions.length > 0 ? pinDescriptions.join(', ') : 'no connections'
            return `[${nodeTypeName}] ${summary}`
        }).join('\\n')
    }

    
    /**
     * Validate T3D syntax before injection
     * P1 Optimization: Catch parsing errors early
     * @param {string} t3dText - T3D text to validate
     * @returns {{valid: boolean, error?: string, parsed?: any}} - Validation result
     */
    _validateT3D(t3dText) {
        if (!t3dText || !t3dText.trim()) {
            return { valid: false, error: 'Empty T3D text' }
        }
        
        // Check for basic T3D structure
        if (!t3dText.includes('Begin Object')) {
            return { valid: false, error: 'Missing "Begin Object" declaration' }
        }
        
        // Check for truncation (missing End Object)
        const beginCount = (t3dText.match(/Begin Object/g) || []).length
        const endCount = (t3dText.match(/End Object/g) || []).length
        if (beginCount !== endCount) {
            return { valid: false, error: `Truncated T3D: ${beginCount} "Begin Object" but ${endCount} "End Object"` }
        }
        
        // Try to parse using the grammar
        try {
            const parsed = ObjectEntity.grammarMultipleObjects.parse(t3dText)
            
            // Check if parse returned valid result
            if (parsed === undefined || parsed === null) {
                return { valid: false, error: 'Parser returned empty result' }
            }
            
            if (!Array.isArray(parsed)) {
                return { valid: false, error: `Parser returned non-array: ${typeof parsed}` }
            }
            
            if (parsed.length === 0) {
                return { valid: false, error: 'No valid nodes found in T3D' }
            }
            
            return { valid: true, parsed }
        } catch (e) {
            // Extract more useful error info
            const errorMsg = e.message || 'T3D parsing failed'
            const stack = e.stack ? e.stack.split('\n').slice(0, 3).join('\n') : ''
            console.error('[T3D Validation] Parse exception:', e)
            return { valid: false, error: `${errorMsg}${stack ? '\n' + stack : ''}` }
        }
    }

    _handlePromptInput(e) { 
        this.prompt = e.target.value 
        
        // If user manually resized, respect that height (don't auto-shrink/grow)
        if (this._manualPromptHeight) return

        // Auto-resize textarea
        const el = e.target
        el.style.height = 'auto'
        el.style.height = Math.min(el.scrollHeight, 120) + 'px'
    }

    _handleKeyDown(e) {
        // Stop propagation to prevent graph interactions (Arrow keys, Del, etc.)
        e.stopPropagation()

        // Ctrl+Enter to send, plain Enter for newline
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault()
            this._handleSubmit()
        }
    }

    /* Prompt textarea resize from top */
    _handlePromptResizeStart(e) {
        e.preventDefault()
        const textarea = this.shadowRoot.querySelector('.prompt-input')
        if (!textarea) return

        this._isResizingPrompt = true
        this._promptResizeStartY = e.clientY
        this._promptStartHeight = textarea.offsetHeight

        this._promptResizeMove = this._handlePromptResizeMove.bind(this)
        this._promptResizeEnd = this._handlePromptResizeEnd.bind(this)
        document.addEventListener('mousemove', this._promptResizeMove)
        document.addEventListener('mouseup', this._promptResizeEnd)
    }

    _handlePromptResizeMove(e) {
        if (!this._isResizingPrompt) return
        const textarea = this.shadowRoot.querySelector('.prompt-input')
        if (!textarea) return

        // Dragging up (negative delta) should increase height
        const deltaY = this._promptResizeStartY - e.clientY
        const newHeight = Math.max(60, Math.min(400, this._promptStartHeight + deltaY))
        textarea.style.height = newHeight + 'px'
    }

    _handlePromptResizeEnd() {
        this._isResizingPrompt = false
        
        // Capture final height to prevent auto-resize from overriding it
        const textarea = this.shadowRoot.querySelector('.prompt-input')
        if (textarea) {
            this._manualPromptHeight = textarea.style.height
        }
        
        document.removeEventListener('mousemove', this._promptResizeMove)
        document.removeEventListener('mouseup', this._promptResizeEnd)
    }

    /**
     * Build messages array for LLM call, incorporating history and context
     * @param {string} userPrompt - Current user prompt
     * @param {string} systemPrompt - System prompt to use
     * @param {string} context - Blueprint context string
     * @param {number} historyLimit - Max number of history items to include
     * @returns {Array} Messages array for llmService.chat
     */
    _buildMessagesForGeneration(userPrompt, systemPrompt, context, historyLimit = 10) {
        const messages = [{ role: "system", content: systemPrompt }]
        
        // Add recent history (respecting limit)
        // For generation, we might want a shorter history to focus on the current task
        const limit = Math.max(2, historyLimit)
        const historyToInclude = this.history.slice(-limit)
        
        for (const msg of historyToInclude) {
            if (msg.role === 'system') continue
            
            // If it's the very last message in history, and it matches our current prompt attempt,
            // we skip it here and add it at the end with context.
            // However, this.history usually already contains the message we just added.
            // To avoid duplication and ensure context is in the right place:
            if (msg.role === 'user' && msg === historyToInclude[historyToInclude.length - 1] && msg.content === userPrompt) {
                continue
            }
            
            messages.push({ role: msg.role, content: msg.content || "" })
        }
        
        // Add current prompt with context as the final message
        let finalContent = userPrompt
        if (context) {
            finalContent = `Context:\n${context}\n\nTask: ${userPrompt}`
        }
        messages.push({ role: "user", content: finalContent })
        
        return messages
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
        if (textarea) {
            textarea.style.height = 'auto'
            this._manualPromptHeight = null
        }

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
            const messages = this._buildMessagesForGeneration(userMsg, systemPrompt, context, this.maxHistoryLength || 10)
            
            // Handle Vision (images) for the last message if needed
            if (userImages.length > 0) {
                const lastMsg = messages[messages.length - 1]
                const content = [{ type: "text", text: lastMsg.content }]
                for (const imgData of userImages) {
                    content.push({ type: "image_url", image_url: { url: imgData } })
                }
                lastMsg.content = content
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
            
            // Prepare config update
            let configUpdate = {
                model: selected.model,
                provider: selected.provider,
                baseUrl: selected.baseUrl // Start with quick model's base URL (if any)
            }
            
            // If we have provider configs, grab the API key and fallback base URL
            // This handles switching providers (e.g. OpenAI -> Gemini)
            if (this.providerConfigs && this.providerConfigs[selected.provider]) {
                const pConfig = this.providerConfigs[selected.provider]
                configUpdate.apiKey = pConfig.apiKey
                if (!configUpdate.baseUrl) {
                    configUpdate.baseUrl = pConfig.baseUrl
                }
            }
            
            this.llmService.updateConfig(configUpdate)
        }
    }
    
    _handleTemperatureChange(e) {
        let val = parseFloat(e.target.value)
        if (isNaN(val)) val = 1.0
        // Clamp between 0 and 2 (most LLMs range)
        val = Math.max(0, Math.min(2, val))
        
        this.temperature = val
        localStorage.setItem("ueb-ai-temperature", val.toString())
        
        this.llmService.updateConfig({ temperature: val })
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
            
            // === Slim IR Mode ===
            // Use compact JSON generation then convert to T3D
            console.log('%c[Generate] useSlimIR =', 'color: #ff9800', this.useSlimIR)
            if (this.useSlimIR) {
                this.statusText = "Generating (Slim IR)..."
                const result = await this._handleSlimIRGenerate(currentPrompt, context)
                const nodeCount = result.nodes?.length || 0
                const content = this.debug 
                    ? `Generated ${nodeCount} nodes via Slim IR.\n\n\`\`\`json\n${JSON.stringify(result.slimIR, null, 2)}\n\`\`\`\n\n\`\`\`\n${result.t3dText}\n\`\`\`` 
                    : `✅ Generated ${nodeCount} node${nodeCount !== 1 ? 's' : ''} (Slim IR).`
                
                this.history = [...this.history, { role: 'assistant', content }]
                this.statusText = "Generation complete!"
                this.statusType = "success"
                return
            }
            
            // === Legacy T3D Mode ===
            let promptToSend = currentPrompt
            
            if (context) {
                promptToSend = `${context}\n\nTask: ${currentPrompt}`
            }

            // Select system prompt based on graphMode and enhance with relevant examples
            const baseSystemPrompt = this.graphMode === "material" 
                ? MATERIAL_SYSTEM_PROMPT 
                : BLUEPRINT_SYSTEM_PROMPT
            
            // P1: Inject available node types index
            const classIndexText = await getClassIndexText(this.graphMode)
            const promptWithIndex = classIndexText 
                ? `${baseSystemPrompt}\n\n${classIndexText}`
                : baseSystemPrompt
            
            // Dynamically inject relevant T3D examples based on user prompt
            const systemPrompt = await enhancePromptWithExamples(
                promptWithIndex, 
                currentPrompt, 
                this.graphMode
            )

            const messages = this._buildMessagesForGeneration(promptToSend, systemPrompt, context, 5)
            const t3dText = await this.llmService.chat(messages, this.abortController.signal)
            
            // P1: Validate T3D syntax (soft validation - warn but still try)
            const validation = this._validateT3D(t3dText)
            if (!validation.valid) {
                // Log full error details to console for debugging
                console.group('%c[T3D Pre-Validation Warning]', 'color: #ffa94d; font-weight: bold')
                console.warn('Pre-validation failed:', validation.error)
                console.log('%cGenerated T3D:', 'color: #ffa94d')
                console.log(t3dText)
                console.log('%cPrompt:', 'color: #69db7c')
                console.log(currentPrompt)
                console.log('%cAttempting injection anyway...', 'color: #74c0fc')
                console.groupEnd()
                
                // Don't block - still try to inject, _injectBlueprint has its own error handling
            }
            
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
        
        // Post-process: Set material node link colors to white/gray (like UE Material Editor)
        this._postProcessMaterialLinkColors(nodes)
        
        return nodes
    }
    
    /**
     * Post-process material nodes to set their link colors to white/gray
     * This matches UE Material Editor's behavior where all links are white
     * @param {NodeElement[]} nodes 
     */
    _postProcessMaterialLinkColors(nodes) {
        // Material link color: rgb(200, 200, 200) - light gray/white
        const materialLinkColor = new LinearColorEntity({ R: 200/255, G: 200/255, B: 200/255, A: 1 })
        
        for (const node of nodes) {
            if (!node.entity?.isMaterial()) continue
            
            // Get all pins and their connected links
            const pins = node.getPinElements()
            for (const pin of pins) {
                // Update pin color for material nodes
                pin.color = materialLinkColor
                
                // Update all links connected to this pin
                const links = this.blueprint.getLinks(pin)
                for (const link of links) {
                    link.color = materialLinkColor
                }
            }
        }
    }

    /**
     * Handle generation using Slim IR mode
     * Generates compact JSON, converts to T3D, then injects
     * @param {string} userPrompt - Original user prompt
     * @param {string} context - Blueprint context
     */
    async _handleSlimIRGenerate(userPrompt, context) {
        let promptToSend = userPrompt
        if (context) {
            promptToSend = `Current graph context:\n${context}\n\nTask: ${userPrompt}`
        }

        // Use simplified Slim IR prompt
        const systemPrompt = getSlimPrompt(this.graphMode)
        
        console.group('%c[Slim IR Generation]', 'color: #00d4ff; font-weight: bold')
        console.log('%c=== SLIM IR MODE ACTIVE ===', 'color: #00ff00; font-size: 14px; font-weight: bold')
        console.log('Mode:', this.graphMode)
        console.log('User prompt:', userPrompt)
        console.log('%cSystem prompt size: ' + systemPrompt.length + ' bytes', 
            systemPrompt.length < 5000 ? 'color: #00ff00; font-weight: bold' : 'color: #ff0000; font-weight: bold')
        console.log('System prompt preview:', systemPrompt.substring(0, 200) + '...')
        
        // Get LLM response (should be JSON)
        const messages = this._buildMessagesForGeneration(userPrompt, systemPrompt, context, 5)
        const responseText = await this.llmService.chat(messages, this.abortController.signal)
        
        console.log('LLM response:', responseText)
        
        // Parse JSON response
        let slimIR
        try {
            // Try to extract JSON from response (in case LLM adds extra text)
            const jsonMatch = responseText.match(/\{[\s\S]*\}/)
            if (!jsonMatch) {
                throw new Error('No JSON object found in response')
            }
            slimIR = JSON.parse(jsonMatch[0])
        } catch (parseErr) {
            console.error('Failed to parse Slim IR JSON:', parseErr)
            console.log('Raw response:', responseText)
            console.groupEnd()
            throw new Error(`Failed to parse Slim IR: ${parseErr.message}`)
        }
        
        console.log('Parsed Slim IR:', slimIR)
        console.log('Slim IR size:', JSON.stringify(slimIR).length, 'bytes')
        
        // Convert Slim IR to T3D
        const conversionResult = convertSlimIRToT3D(slimIR, this.graphMode)
        
        if (!conversionResult.success) {
            console.error('Slim IR conversion failed:', conversionResult.errors)
            console.groupEnd()
            throw new Error(`Slim IR conversion failed: ${conversionResult.errors.join(', ')}`)
        }
        
        const t3dText = conversionResult.t3d
        console.log('Generated T3D:', t3dText)
        console.log('T3D size:', t3dText.length, 'bytes')
        console.log('Expansion ratio:', (t3dText.length / JSON.stringify(slimIR).length).toFixed(1) + 'x')
        console.groupEnd()
        
        // Inject and process nodes
        const nodes = this._injectBlueprint(t3dText)
        
        if (nodes && nodes.length > 0) {
            setTimeout(() => {
                LayoutEngine.process(nodes)
            }, 50)
        }
        
        return { nodes, t3dText, slimIR }
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
                                title="Blueprint mode">Blueprint</button>
                        <button class="mode-btn ${this.graphMode === "material" ? "active material" : ""}"
                                @click=${() => this._handleGraphModeChange("material")}
                                title="Material mode">Material</button>
                    </div>
                    <div>
                        <button class="settings-btn" @click=${this._openSettings} title="Settings">⚙</button>
                    </div>
                </div>

                <!-- Chat History -->
                <div class="chat-history">
                    ${(!this.provider || !this.providerConfigs[this.provider]?.apiKey) ? html`
                        <div class="message system" style="color: #ef5350; border: 1px solid #ef5350; padding: 12px; border-radius: 6px; background: rgba(239, 83, 80, 0.1); text-align: center;">
                            <div>⚠️ API Configuration Required</div>
                            <div style="margin-top: 8px; color: #ccc;">
                                Please <a href="#" @click=${(e) => { e.preventDefault(); this._openSettings() }} style="color: #4fc3f7; text-decoration: underline;">Open Settings</a> to configure your API Provider and Key.
                            </div>
                        </div>
                    ` : this.history.length === 0 ? html`
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

                    <div class="prompt-wrapper">
                        <div class="prompt-resize-handle" @mousedown=${this._handlePromptResizeStart}></div>
                        <textarea
                            class="prompt-input"
                            placeholder="${this._getPlaceholder()}"
                            .value=${this.prompt}
                            @input=${this._handlePromptInput}
                            @keydown=${this._handleKeyDown}
                        ></textarea>
                    </div>
                    
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
