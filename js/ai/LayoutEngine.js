/**
 * Layout Engine for UE Blueprint Nodes
 * Arranges nodes automatically based on their connection topology
 */
export default class LayoutEngine {

    /**
     * Process and arrange a set of nodes
     * @param {NodeElement[]} nodes - Array of NodeElement instances
     */
    static process(nodes) {
        if (!nodes || nodes.length === 0) return

        // 1. Build Graph
        const graph = this._buildGraph(nodes)
        
        // 2. Calculate Layers (Topological Sort / BFS)
        const layers = this._calculateLayers(graph)

        // 3. Apply Coordinates
        this._applyCoordinates(layers, nodes[0].blueprint) // Use blueprint from first node reference
    }

    /**
     * Build adjacency list and in-degree map
     */
    static _buildGraph(nodes) {
        const adj = new Map() // NodeGUID -> [TargetNodeGUID]
        const inDegree = new Map() // NodeGUID -> Number
        const nodeMap = new Map() // NodeGUID -> NodeElement

        // Initialize maps
        nodes.forEach(node => {
            const guid = node.entity.NodeGuid.toString()
            adj.set(guid, [])
            inDegree.set(guid, 0)
            nodeMap.set(guid, node)
        })

        // Populate connections
        nodes.forEach(node => {
            const guid = node.entity.NodeGuid.toString()
            const pins = node.getPinEntities()

            pins.forEach(pin => {
                if (pin.isOutput() && pin.LinkedTo && pin.LinkedTo.values) {
                    pin.LinkedTo.values.forEach(link => {
                        const targetNodeName = link.objectName 
                            ? link.objectName.toString() 
                            : link.toString().split(" ")[0]
                        // Note: LinkedTo usually stores NodeName + PinId. 
                        // But we need NodeGuid to map back to our node instances securely.
                        // However, generated T3D might rely on Names. 
                        // Let's try to match by Name since T3D uses Names for linking.
                        
                        // Find target node by Name in our current set
                        const targetNode = nodes.find(n => n.entity.getObjectName() === targetNodeName)
                        
                        if (targetNode) {
                            const targetGuid = targetNode.entity.NodeGuid.toString()
                            
                            // Avoid self-loops
                            if (guid !== targetGuid) {
                                adj.get(guid).push(targetGuid)
                                inDegree.set(targetGuid, (inDegree.get(targetGuid) || 0) + 1)
                            }
                        }
                    })
                }
            })
        })

        return { adj, inDegree, nodeMap }
    }

    /**
     * Calculate layers using BFS
     */
    static _calculateLayers({ adj, inDegree, nodeMap }) {
        const layers = []
        const visited = new Set()
        let queue = []

        // Find initial roots (in-degree 0)
        // If all nodes have dependencies (cycles), pick one arbitrarily or use specific heuristics
        for (const [guid, degree] of inDegree) {
            if (degree === 0) {
                queue.push(guid)
                visited.add(guid)
            }
        }

        // Cycle handling: if no roots found but nodes exist, pick the first one
        if (queue.length === 0 && nodeMap.size > 0) {
            const first = nodeMap.keys().next().value
            queue.push(first)
            visited.add(first)
        }

        while (queue.length > 0) {
            const currentLayer = []
            const nextQueue = []

            for (const guid of queue) {
                currentLayer.push(nodeMap.get(guid))
                
                const neighbors = adj.get(guid) || []
                for (const neighborGuid of neighbors) {
                    // Simple cycle breaking: only visit if not visited
                    if (!visited.has(neighborGuid)) {
                        /* 
                           Strict topological sort requires reducing in-degree.
                           For simple visualization, visiting once is enough. 
                           For better layering, we might want to wait until all deps are processed,
                           but here we use simple BFS level traversal.
                        */
                        inDegree.set(neighborGuid, inDegree.get(neighborGuid) - 1)
                        if (inDegree.get(neighborGuid) <= 0 || !visited.has(neighborGuid)) {
                             // Only add if not scheduled for this layer (dedup handling)
                             if (!nextQueue.includes(neighborGuid) ) {
                                 nextQueue.push(neighborGuid)
                                 visited.add(neighborGuid)
                             }
                        }
                    }
                }
            }

            layers.push(currentLayer)
            queue = nextQueue
        }
        
        // Handle disconnected components (orphaned nodes not reached by Main BFS)
        if (visited.size < nodeMap.size) {
            const orphanLayer = []
            for (const [guid, node] of nodeMap) {
                if (!visited.has(guid)) {
                    orphanLayer.push(node)
                }
            }
            if (orphanLayer.length > 0) {
                layers.push(orphanLayer)
            }
        }

        return layers
    }

    /**
     * Apply coordinates to nodes
     */
    static _applyCoordinates(layers, blueprint) {
        const SPACING_X = 120
        const SPACING_Y = 150
        const START_X = 0
        const START_Y = 0

        let currentX = START_X

        layers.forEach(layer => {
            let currentY = START_Y
            let maxLayerWidth = 0

            layer.forEach(node => {
                // Set Location
                node.setLocation(currentX, currentY)

                // Update Y
                // Use a default height estimate if sizeY is 0 (not rendered yet)
                const nodeHeight = node.sizeY > 0 ? node.sizeY : 120 
                const nodeWidth = node.sizeX > 0 ? node.sizeX : 200
                
                currentY += nodeHeight + SPACING_Y
                maxLayerWidth = Math.max(maxLayerWidth, nodeWidth)
            })

            // Advance X
            currentX += maxLayerWidth + SPACING_X
        })
    }
}
