import React from "react";
import { select, event } from 'd3-selection';
import { pack } from "d3-hierarchy";
import { hierarchy } from "d3-hierarchy";
import { scaleLinear } from "d3-scale";
import { interpolateHcl } from "d3-interpolate";

import data from "./data/ccssm-flare.json";
import cc from "./data/cc.json";

import updateSidePanel, { resetSidePanel } from "./update-side-panel";
import highlightConnected, { unsetConnected } from "./highlight-connected";

import "./Grades.css";

// Used the advice from this article to set up a d3 + React app:
// https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71

// CC_CONNECTION_NODES are a reference to the d3 node by id.
// we build them manually here as a hack
const CC_CONNECTION_NODES = [];
const CC_LINKS = [];

export default class Grades extends React.Component {

    constructor(props) {
        super(props)
        this.createGrades = this.createGrades.bind(this)
    }
    componentDidMount() {
        this.createGrades()
    }
    componentDidUpdate() {
        this.createGrades()
    }
    createGrades() {
        const layouts = this.props.layouts;
        const grades = this.container;

        // first create the containers for the grades with their attributes set
        select(grades)
            .selectAll("g")
            .data([...Array(9).keys()])
            .enter()
            .append("g")
            .attr("id", (d) => {
                return `grade-${d}`;
            })
            .attr("class", "grade")
            .attr("transform", (d) => {
                return `translate(${layouts[d][0]},${layouts[d][1]})`
            });

        var color = scaleLinear()
            .domain([-1, 5])
            .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
            .interpolate(interpolateHcl);

        data.forEach((grade, i) => {

            const root = hierarchy(grade)
                .sum(function (d) { return 1; })
                .sort(function (a, b) { return b.value - a.value; });

            const packLayout = pack();

            // the padding and label size is based on the size of the circles.
            // for padding, 1 pad per 100
            const padding = Math.ceil(layouts[i][2] / 124);
            // the reason we set label sizes relative to the circle is because the 
            // media query will change when the window is expanded, but the circle
            // size will not. These are ems.
            const labelSize = (Math.floor(layouts[i][2] / 12) - 10) / 100;
            const gradeHeadingSize = (Math.ceil(layouts[i][2] / 30)) / 10;

            packLayout.size([layouts[i][2], layouts[i][2]])
                .padding(padding);

            packLayout(root);

            const nodes = root.descendants();

            const g = select(`#grade-${i}`)
                .selectAll("g")
                .data(nodes)
                .enter()
                .append("g");

            g.append('circle')
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) { return d.y; })
                .attr('r', d => d.r)
                .attr("class", function (d) {
                    const genericClass = "node";
                    if (d.depth === 0) {
                        return genericClass + " node--root";
                    }
                    if (d.depth === 2) {
                        if (!d.data.data.clusterType) throw new Error("This level needs a cluster type");
                        return `${genericClass} node--cluster-${d.data.data.clusterType}`;
                    }
                    if (d.depth === 3 && d.children) {
                        return `${genericClass} node--has-topics`;
                    }
                    if (!d.children) {
                        return `${genericClass} node--leaf standard`;
                    }
                    return genericClass;
                })
                .on("mouseover", function (d, event) {
                    select(`#tooltip-${d.data.id}`).style("display", "inline");
                })
                .on("mousemove", function (d) {
                    select(`#tooltip-${d.data.id}`)
                        .style("top", `${(event.pageY + 16)}px`)
                        .style("left", `${(event.pageX + 16)}px`);
                })
                .on("mouseout", function (d) {
                    select(`#tooltip-${d.data.id}`).style("display", "none");
                })
                .on("click", function (d, event) {
                    if (!d.children) {
                        // if is already selected, unset panel
                        // remove any selected rings
                        select("#selectedRing").remove();
                        const classNames = this.className.baseVal;
                        if (classNames.indexOf('selected-node') !== -1) {
                            resetSidePanel(d);
                            unsetConnected(this);
                        } else {
                            updateSidePanel(d);
                            highlightConnected(d, CC_CONNECTION_NODES, CC_LINKS);

                            select(this.parentNode)
                                .append("circle")
                                .attr("cx", function (d) {
                                    return d.x;
                                })
                                .attr("cy", function (d) { return d.y; })
                                .attr('r', d => d.r)
                                .attr("id", "selectedRing");
                        }
                    }
                })
                .style("fill", function (d) {
                    if (d.depth === 2) {
                        if (!d.data.data.clusterType) throw new Error("This level needs a cluster type");
                        return `url(#${d.data.data.clusterType})`;
                    }
                    // Hard-code (not ideal) the bgcolor for grouped standards --
                    // standards that have "standard topics" or bullet points
                    // Ex. K.CC.4 has K.CC.4.a, K.CC.4.b, and K.CC.4.c
                    if (d.depth === 3 && d.children) {
                        return "#92BFCC";
                    }
                    return d.children ? color(d.depth) : null;
                })
                .attr("stroke-width", function (d) {
                    if (d.depth === 2) {
                        return 0.5;
                    }
                })
                .attr("stroke", function (d) {
                    if (d.depth === 2) {
                        return "hsl(228,30%,40%)";
                    }
                });

            g.append("text")
                .attr("text-anchor", "middle")
                .attr("x", function (d) { return d.x; })
                .attr("y", function (d) { return d.y; })
                .attr("dy", "0.3em")
                .attr("class", "label")
                .attr("id", (d) => {
                    return `leaf-node-label-${d.data.id}`
                })
                .style("font-size", (d) => {
                    if (!d.children) {
                        const tooWideLabels = ["NBT.A.3.a", "NBT.A.3.b"];
                        if (tooWideLabels.indexOf(d.data.data.codeTrimmed) !== -1) {
                            const shrunkLabelSize = labelSize * 0.9
                            return shrunkLabelSize + "em";
                        }
                        return labelSize + "em";
                    }
                })
                .text((d) => {
                    return d.children ? "" : d.data.data.codeTrimmed;
                });

            this.addCirclePathGradeName(i, nodes, gradeHeadingSize);
            this.addTooltips(i, nodes);

            // For each of the nodes, make a selectable reference using the id
            // Node ids are unique so we can just keep adding them
            // we only add lead nodes so this is going to be an inefficient array.
            for (let i = 0; i < nodes.length; i++) {
                if (!nodes[i].children) {
                    if (nodes[i] && nodes[i].data && nodes[i].data.id) {
                        CC_CONNECTION_NODES[parseInt(nodes[i].data.id, 10)] = nodes[i];
                    }
                }
            }

        }); // end grades loop

        // after all the grades and connection nodes have been populated, we can make the links.
        const edges = cc.edges;
        const nd_edges = cc.nd_edges;
        for (let j = 0; j < edges.length; j++) {
            // first check that these nodes exist
            const target = parseInt(edges[j].to, 10);
            const source = parseInt(edges[j].from, 10);
            if (CC_CONNECTION_NODES[target] && CC_CONNECTION_NODES[source]) {
                CC_LINKS.push({ source: CC_CONNECTION_NODES[source], target: CC_CONNECTION_NODES[target], type: "arrow" });
            }
        }

        for (let k = 0; k < nd_edges.length; k++) {
            // first check that these nodes exist
            const target = parseInt(nd_edges[k].to, 10);
            const source = parseInt(nd_edges[k].from, 10);
            if (CC_CONNECTION_NODES[target] && CC_CONNECTION_NODES[source]) {
                CC_LINKS.push({ source: CC_CONNECTION_NODES[source], target: CC_CONNECTION_NODES[target], type: "non-directional" });
            }
        }
    } // end createGrades

    addTooltips(index, nodes) {
        // I should extract the creation of tooltips.
        const gradeTooltipContainer = select(`#tooltips-grade-${index}`);
        gradeTooltipContainer.selectAll("div")
            .data(nodes)
            .enter()
            .append("div")
            .style("display", "none")
            .attr("id", (d) => `tooltip-${d.data.id}`)
            .attr("class", "tooltip")
            .html((d) => {
                if (d.data.name !== null) {
                    return `<strong>${d.data.name}</strong>`;
                }
                if (d.data && d.data.data) {
                    return d.data.data.description;
                }
            });
    }

    addCirclePathGradeName(i, nodes, gradeHeadingSize) {
        const positionTopRightQuadrant = "33%";
        select(`#grade-${i}`)
            .selectAll("g")
            .data(nodes).append("path")
            .attr("d", function (d) {
                if (d.depth === 0) {
                    const x = d.x - d.r;
                    return `M ${x},${d.y} a ${d.r},${d.r} 0 1,1 0,1 z`;
                };
            })
            .attr("id", function (d) {
                if (d.depth === 0) {
                    return `heading-for-${d.data.id}`;
                }
            })
            .attr("class", (d) => {
                if (d.depth === 0) {
                    return "circlePath";
                }
            });

        const wrappingText = select(`#grade-${i}`)
            .selectAll("g")
            .data(nodes).append("text")
            .attr("class", (d) => {
                if (d.depth === 0) return "gradeHeading";
            })
            .attr("id", (d) => {
                if (d.depth === 0) return `heading-${d.data.id}`;
            });

        wrappingText
            .append("textPath")
            .attr("role", "heading")
            .attr("startOffset", (d) => {
                if (d.depth === 0) return positionTopRightQuadrant;
            })
            .attr("xlink:xlink:href", (d) => {
                if (d.depth === 0) return `#heading-for-${d.data.id}`;
            })
            .style("font-size", gradeHeadingSize + "em")
            .text((d) => {
                if (d.depth === 0) return d.data.name;
            });
    }

    render() {
        return <g className="grades" ref={container => this.container = container} />
    }

}