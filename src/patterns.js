import { select } from "d3-selection";

export function addMajorPattern(id, radius, color1, color2) {
    const widthHeight = radius * 2;
    const xY = Math.round(widthHeight * 0.13);
    const patternWidthHeight = Math.round(widthHeight * 0.78);

    var svg = select("body")
        .append("svg")
        .attr("width", widthHeight)
        .attr("height", widthHeight);

    var pattern = svg.append("defs")
        .append("pattern")
        .attr("id", "cluster-pattern-" + id)
        .attr("patternUnits", "userSpaceOnUse")
        .attr("width", widthHeight)
        .attr("height", widthHeight);

    pattern
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", widthHeight)
        .attr("height", widthHeight)
        .attr("fill", "magenta")
        .attr("stroke", "black")
        .attr("stroke-width", 3);

    pattern
        .append("rect")
        .attr("x", xY)
        .attr("y", xY)
        .attr("rx", radius / 4)
        .attr("width", patternWidthHeight)
        .attr("height", patternWidthHeight)
        .attr("fill", color2);
};