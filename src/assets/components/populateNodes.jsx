import { MarkerType } from 'reactflow';
import {node} from "globals";

const createNode = (id, label, x, y, type, content = '', trgtPos = 'left', srcPos = 'right') => ({
    id,
    type,
    position: { x, y },
    data: { label, content },
    targetPosition: trgtPos,
    sourcePosition: srcPos,
});

const createEdge = (source, target) => ({
    id: `${source}-${target}`,
    source,
    target,
    style: { strokeWidth: 1, stroke: '#9c65cd' },
    type: 'smoothstep',
});

// Function to iterate through the JSON and generate the nodes and edges arrays
export const populateNodes = (jsonData) => {
    const nodes = [];
    const edges = [];

    let x = 0;
    let y = 0;
    let mainY = 0;

    let usedNodes = [];

    const processObject = (obj, parentId = null, depth = 0, parentY = 0) => {
        // Sort arrays within objects by size, descending
        const keys = Object.keys(obj).sort((a, b) => {
            const aSize = Array.isArray(obj[a]) ? obj[a].length : 0;
            const bSize = Array.isArray(obj[b]) ? obj[b].length : 0;
            return bSize - aSize;
        });

        keys.forEach((key, index) => {
            const item = obj[key];
            const nodeId = key.toLowerCase().replace(/\s+/g, '-'); // Unique id for the node

            // Skip if the object is empty
            if (typeof item === 'object' && obj.class >= 0) {
                return;
            }

            // Handle special node types (e.g., character-card)
            if (item.class && item.class.includes('card')) {
                // Ensure that card nodes are positioned at the same level as their parent (use `parentY`)
                nodes.push(createNode(nodeId, item.title || key, x, parentY + (index * 150), 'cardNode', item.content));
                edges.push(createEdge(parentId, nodeId)); // Connect card node to list items
            } else {
                // Regular node creation
                console.log("What is parentID of " + nodeId + ": " + parentId);
                if(parentId === null){
                    nodes.push(createNode(nodeId, key, x, y, 'input'));
                }
                nodes.push(createNode(nodeId, key, x, y, 'default'));

                // Add edge to the parent if there is one
                if (parentId) {
                    edges.push(createEdge(parentId, nodeId));
                }

                // Adjust the y-axis for child objects based on depth and index
                if (typeof item === 'object') {
                    x += 400; // Branch off horizontally for child objects
                    if (Object.keys(item).length > 1 && parentId !== null) {
                        Object.entries(item).forEach(([key, value]) => {
                            console.log(`${key}: ` + nodeId);
                        });

                        if (usedNodes.includes(nodeId)) {
                            console.log("Used Node, spacing by 150")
                            y += 150;
                        } else {
                            console.log("New node: " + nodeId + ", pushing nodeID to usedNodes");
                            usedNodes.push(nodeId);
                            console.log(usedNodes.includes(nodeId));
                        }
                    }
                    // Keep child nodes at their parent's y-level for branching
                    processObject(item, nodeId, depth + 1, y);
                    x -= 400;
                }

                // If parentId is null (root nodes), space them further apart vertically
                if (typeof item === 'object' && parentId === null) {
                    console.log("First Conditional Node ID: " + nodeId)
                    mainY += 150;
                    y = mainY; // Space vertically for each new root node
                }else{
                    /*y += parentY + (index * 150) + 150;
                    */
                    const lastNode = nodes.length > 0 ? nodes[nodes.length - 1] : null;
                    if (lastNode) {
                        console.log("Second Conditional Node ID: " + nodeId)
                        y = lastNode.position.y + 150;
                    } else if(typeof item === 'object' && parentId === null) {
                        /*y += 150;*/
                    }
                }
            }
        });
    };

    // Start processing the JSON from the root
    processObject(jsonData);
    console.log('Generated Nodes:', nodes);
    console.log('Generated Edges:', edges);
    return { nodes, edges };
};
