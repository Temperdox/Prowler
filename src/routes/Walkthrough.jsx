import { useState, useEffect } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css'; // Import the required styles
import '../assets/css/Walkthrough.css';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VisibilityHandler from '../assets/components/VisibilityHandler.jsx'; // Import the visibility handler
/*import { populateNodes } from './../components/populateNodes.jsx';
import walkthroughData from './../walkthrough.json';*/
import CardNode from "../assets/components/CardNode.jsx";
import { iNodes as initialNodes, iEdges as initialEdges } from '../assets/components/InitialElements.jsx';
import {useNavigate} from "react-router-dom";



const nodeTypes = {
    cardNode: CardNode, // Register the custom card node
};

const nodeClassName = (node) => node.type;

const Walkthrough = ({ setView }) => {
    // Populate nodes and edges from the walkthrough JSON
    /*const { nodes: initialNodes, edges: initialEdges } = populateNodes(walkthroughData);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);*/
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const navigate = useNavigate(); // Hook for navigation

    // Set the top-level nodes to be visible by default
    const [visibleNodes, setVisibleNodes] = useState({
        'generalInformation': true,
        'introduction': true,
        'mainCamp': true,
        'mainLocations': true,
        'subLocations': true
    });


    // Hook up the visibility handler
    const { handleNodeClick } = VisibilityHandler({ edges, setVisibleNodes });

    // Update node visibility based on the state
    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => ({
                ...node,
                hidden: !visibleNodes[node.id], // Use the visibility state to determine whether the node is hidden
            }))
        );
        setEdges((eds) =>
            eds.map((edge) => ({
                ...edge,
                hidden: !(visibleNodes[edge.source] && visibleNodes[edge.target]), // Show edge if both connected nodes are visible
            }))
        );
    }, [visibleNodes]);

    // Render flow chart using reactflow
    const renderNodes = () => (
        <div className="node-connections">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                onNodeClick={(_, node) => handleNodeClick(node.id)} // Pass the node id to the visibility handler
                nodesDraggable={false} // Disable node dragging
                nodesConnectable={false} // Disable node connections
            >
                <MiniMap  zoomable pannable nodeClassName={nodeClassName}/>
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );

    return (
        <div className="walkthrough-container">

            {/* Header with back button */}
            <div className="header">
                <button onClick={() => navigate('/')} className="back-button">
                    <FontAwesomeIcon icon={faArrowLeft} className="back-icon" /> <span className="back-text">Back</span>
                </button>
            </div>

            {renderNodes()}

        </div>
    );
};

export default Walkthrough;
