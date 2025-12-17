/**
 * LLM Service - Handles API communication
 */

import { SYSTEM_PROMPT } from "./prompts.js"

export default class LLMService {
    
    constructor(config = {}) {
        this.config = config
    }

    updateConfig(config) {
        this.config = { ...this.config, ...config }
    }

    setDebug(enabled) {
        this.debug = enabled
    }

    /**
     * Generate T3D from prompt
     * @param {string} userPrompt
     * @param {AbortSignal} [signal] Optional abort signal
     * @param {string} [systemPrompt] Optional system prompt override
     * @returns {Promise<string>} T3D text
     */
    /**
     * Generate T3D from prompt
     * @param {string} userPrompt
     * @param {AbortSignal} [signal] Optional abort signal
     * @param {string} [systemPrompt] Optional system prompt override
     * @returns {Promise<string>} T3D text
     */
    async generate(userPrompt, signal, systemPrompt = SYSTEM_PROMPT) {
        if (!this.config.apiKey) {
            throw new Error("API Key is missing. Please configure it in settings.")
        }

        const rawBaseUrl = this.config.baseUrl || "https://api.openai.com/v1"
        const baseUrl = rawBaseUrl.replace(/\/+$/, '')
        const model = this.config.model || "gpt-4o"
        const temperature = this.config.temperature ?? 0.5
        const provider = this.config.provider || "openai"

        try {
            let requestBody = {}
            let fetchUrl = ""
            let fetchHeaders = {
                "Content-Type": "application/json"
            }

            if (provider === "gemini") {
                // Gemini REST API
                fetchUrl = `${baseUrl}/models/${model}:generateContent?key=${this.config.apiKey}`
                // Gemini supports system instructions in a specific way or via prompt concatenation
                // The modern API has systemInstruction field
                requestBody = {
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: userPrompt }]
                        }
                    ],
                    systemInstruction: {
                        parts: [{ text: systemPrompt }]
                    },
                    generationConfig: {
                        temperature: temperature
                    }
                }
            } else {
                // OpenAI / Standard Format
                fetchUrl = `${baseUrl}/chat/completions`
                fetchHeaders["Authorization"] = `Bearer ${this.config.apiKey}`
                requestBody = {
                    model: model,
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userPrompt }
                    ],
                    temperature: temperature,
                    stream: false
                }
            }

            // Debug logging
            if (this.debug) {
                console.group('%c[LLM Debug] Generate Request', 'color: #4CAF50; font-weight: bold')
                console.log('%cProvider:', 'color: #2196F3', provider)
                console.log('%cEndpoint:', 'color: #2196F3', fetchUrl)
                console.log('%cModel:', 'color: #2196F3', model)
                console.log('%cFull Payload:', 'color: #9C27B0', JSON.stringify(requestBody, null, 2))
                console.groupEnd()
            }

            const response = await fetch(fetchUrl, {
                method: "POST",
                headers: fetchHeaders,
                body: JSON.stringify(requestBody),
                signal: signal
            })

            if (!response.ok) {
                const errorText = await response.text()
                let errorMsg = `API Error ${response.status}`
                try {
                    const errorJson = JSON.parse(errorText)
                    if (errorJson.error?.message) {
                        errorMsg += `: ${errorJson.error.message}`
                    }
                } catch (e) {
                    errorMsg += `: ${errorText.substring(0, 100)}`
                }
                throw new Error(errorMsg)
            }

            const data = await response.json()
            let content = ""

            if (provider === "gemini") {
                content = data.candidates?.[0]?.content?.parts?.[0]?.text
            } else {
                content = data.choices?.[0]?.message?.content
            }

            if (!content) {
                throw new Error("No content received from LLM")
            }

            // Simple cleanup: remove markdown code blocks if present
            const cleanContent = content.replace(/^```\w*\n?/, "").replace(/\n?```$/, "").trim()
            
            return cleanContent

        } catch (error) {
            console.error("LLM Service Error:", error)
            throw error
        }
    }

    /**
     * Chat with messages array (supports multi-turn and images)
     * @param {Array} messages - OpenAI format messages [{ role, content }]
     *        content can be string or array for vision: [{ type: "text", text }, { type: "image_url", image_url: { url } }]
     * @param {AbortSignal} [signal] - Optional abort signal
     * @returns {Promise<string>} Response text
     */
    async chat(messages, signal) {
        if (!this.config.apiKey) {
            throw new Error("API Key is missing. Please configure it in settings.")
        }

        const rawBaseUrl = this.config.baseUrl || "https://api.openai.com/v1"
        const baseUrl = rawBaseUrl.replace(/\/+$/, '')
        const model = this.config.model || "gpt-4o"
        const temperature = this.config.temperature ?? 0.7
        const provider = this.config.provider || "openai"

        try {
            let requestBody = {}
            let fetchUrl = ""
            let fetchHeaders = {
                "Content-Type": "application/json"
            }

            if (provider === "gemini") {
                fetchUrl = `${baseUrl}/models/${model}:generateContent?key=${this.config.apiKey}`
                
                // Convert OpenAI messages to Gemini contents
                // OpenAI: [{ role: 'system'|'user'|'assistant', content: ... }]
                // Gemini: contents: [{ role: 'user'|'model', parts: [{ text: ... }] }]
                // System instructions are separate in Gemini
                
                const geminiContents = []
                let systemInstruction = null

                for (const msg of messages) {
                    if (msg.role === 'system') {
                        systemInstruction = { parts: [{ text: msg.content }] }
                        continue
                    }
                    
                    const role = msg.role === 'assistant' ? 'model' : 'user'
                    const parts = []
                    
                    if (Array.isArray(msg.content)) {
                        // Handle multimodal (text + images)
                        for (const part of msg.content) {
                            if (part.type === 'text') {
                                parts.push({ text: part.text })
                            } else if (part.type === 'image_url') {
                                // Extract base64 from data URL if possible, or use logic for URI
                                // Assuming part.image_url.url is a data URL (data:image/png;base64,...)
                                // Gemini expects inlineData
                                const dataUrl = part.image_url.url
                                if (dataUrl.startsWith('data:')) {
                                    const match = dataUrl.match(/^data:(.+);base64,(.+)$/)
                                    if (match) {
                                        parts.push({
                                            inlineData: {
                                                mimeType: match[1],
                                                data: match[2]
                                            }
                                        })
                                    }
                                }
                            }
                        }
                    } else {
                        parts.push({ text: msg.content })
                    }
                    
                    geminiContents.push({ role, parts })
                }

                requestBody = {
                    contents: geminiContents,
                    generationConfig: {
                        temperature: temperature
                    }
                }
                
                if (systemInstruction) {
                    requestBody.systemInstruction = systemInstruction
                }

            } else {
                fetchUrl = `${baseUrl}/chat/completions`
                fetchHeaders["Authorization"] = `Bearer ${this.config.apiKey}`
                requestBody = {
                    model: model,
                    messages: messages,
                    temperature: temperature,
                    stream: false
                }
            }

            // Debug logging
            if (this.debug) {
                console.group('%c[LLM Debug] Chat Request', 'color: #4CAF50; font-weight: bold')
                console.log('%cProvider:', 'color: #2196F3', provider)
                console.log('%cFull Payload:', 'color: #9C27B0', JSON.stringify(requestBody, null, 2))
                console.groupEnd()
            }

            const response = await fetch(fetchUrl, {
                method: "POST",
                headers: fetchHeaders,
                body: JSON.stringify(requestBody),
                signal: signal
            })

            if (!response.ok) {
                const errorText = await response.text()
                let errorMsg = `API Error ${response.status}`
                try {
                    const errorJson = JSON.parse(errorText)
                    if (errorJson.error?.message) {
                        errorMsg += `: ${errorJson.error.message}`
                    }
                } catch (e) {
                    errorMsg += `: ${errorText.substring(0, 100)}`
                }
                throw new Error(errorMsg)
            }

            const data = await response.json()
            let content = ""

            if (provider === "gemini") {
                content = data.candidates?.[0]?.content?.parts?.[0]?.text
            } else {
                content = data.choices?.[0]?.message?.content
            }

            if (!content) {
                throw new Error("No content received from LLM")
            }

            return content.trim()

        } catch (error) {
            console.error("LLM Chat Error:", error)
            throw error
        }
    }
}
