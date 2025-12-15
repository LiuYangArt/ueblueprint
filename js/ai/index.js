/**
 * AI Module Export
 * Entry point for AI-related components
 */

import AIPanelElement from "./AIPanelElement.js"
import SettingsElement from "./SettingsElement.js"

export { AIPanelElement, SettingsElement }

/**
 * Initialize AI components and attach to blueprint
 * @param {import("../Blueprint.js").default} blueprint - Blueprint instance
 * @returns {{panel: AIPanelElement, settings: SettingsElement}}
 */
export function initAIComponents(blueprint) {
    // Create AI panel
    const panel = document.createElement("ueb-ai-panel")
    panel.blueprint = blueprint
    document.body.appendChild(panel)

    // Create settings panel
    const settings = document.createElement("ueb-ai-settings")
    document.body.appendChild(settings)

    // Connect events
    panel.addEventListener("open-settings", () => {
        settings.show()
    })

    settings.addEventListener("settings-saved", (e) => {
        console.log("AI settings saved:", e.detail)
    })

    return { panel, settings }
}

// Auto-register on import if not already defined
if (!customElements.get("ueb-ai-panel")) {
    customElements.define("ueb-ai-panel", AIPanelElement)
}
if (!customElements.get("ueb-ai-settings")) {
    customElements.define("ueb-ai-settings", SettingsElement)
}
