const VisibilityHandler = ({ edges, setVisibleNodes }) => {
    const handleNodeClick = (nodeId) => {

        console.log("nodeId", nodeId);
        setVisibleNodes((prevVisibleNodes) => {
            const isCurrentlyVisible = prevVisibleNodes[nodeId];
            const updatedVisibleNodes = { ...prevVisibleNodes };

            // Show or hide the child nodes, but never hide the clicked node
            if (isCurrentlyVisible) {
                console.log("visibleNodes", updatedVisibleNodes);
                // Hide child nodes recursively
                const hideBranch = (id) => {
                    edges.forEach((edge) => {
                        if (edge.source === id) {
                            updatedVisibleNodes[edge.target] = !updatedVisibleNodes[edge.target];
                            hideBranch(edge.target); // Recursively hide child nodes
                        }
                    });
                };
                hideBranch(nodeId);
            } else {
                // Show the node and its immediate children
                updatedVisibleNodes[nodeId] = true;
                edges.forEach((edge) => {
                    if (edge.source === nodeId) {
                        updatedVisibleNodes[edge.target] = true; // Show direct children
                    }
                });
            }

            return updatedVisibleNodes;
        });
    };

    return { handleNodeClick };
};

export default VisibilityHandler;
