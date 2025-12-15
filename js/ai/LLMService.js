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

    /**
     * Generate Blueprint T3D from prompt
     * @param {string} userPrompt
     * @returns {Promise<string>} T3D text
     */
    async generate(userPrompt) {
        if (!this.config.apiKey) {
            throw new Error("API Key is missing. Please configure it in settings.")
        }

        const baseUrl = this.config.baseUrl || "https://api.openai.com/v1"
        const model = this.config.model || "gpt-4o"
        const temperature = this.config.temperature ?? 0.5

        try {
            const response = await fetch(`${baseUrl}/chat/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.config.apiKey}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        { role: "user", content: userPrompt }
                    ],
                    temperature: temperature,
                    stream: false
                })
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
            const content = data.choices[0]?.message?.content

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
}
