import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MindMap = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = 800;
        const height = 600;

        svg.attr('viewBox', [-width / 2, -height / 2, width, height]);

        const root = d3.hierarchy(data);
        const treeLayout = d3.tree().size([width, height]);
        treeLayout(root);

        // Create a group for zoom and pan
        const g = svg.append('g').attr('class', 'zoom-layer');

        // Draw links
        g.selectAll('line')
            .data(root.links())
            .enter()
            .append('line')
            .attr('x1', (d) => d.source.x)
            .attr('y1', (d) => d.source.y)
            .attr('x2', (d) => d.target.x)
            .attr('y2', (d) => d.target.y)
            .style('stroke', '#555');

        // Draw nodes
        g.selectAll('circle')
            .data(root.descendants())
            .enter()
            .append('circle')
            .attr('cx', (d) => d.x)
            .attr('cy', (d) => d.y)
            .attr('r', 5)
            .style('fill', '#999');

        g.selectAll('text')
            .data(root.descendants())
            .enter()
            .append('text')
            .attr('x', (d) => d.x)
            .attr('y', (d) => d.y)
            .attr('dy', -10)
            .attr('text-anchor', 'middle')
            .text((d) => d.data.name);

        // Zoom and Pan functionality
        const zoom = d3.zoom().on('zoom', (event) => {
            g.attr('transform', event.transform);
        });
        svg.call(zoom);
    }, [data]);

    return <svg ref={svgRef} className="mindmap-svg"></svg>;
};

export default MindMap;
