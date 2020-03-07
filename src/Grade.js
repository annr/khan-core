import React from "react";
import { select, event } from 'd3-selection';
import { pack } from "d3-hierarchy";
import { hierarchy } from "d3-hierarchy";
import { scaleLinear } from "d3-scale";
import { interpolateHcl } from "d3-interpolate";

import "./Grade.css";

// Used the advice from this article to set up a d3 + React app:
// https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71

export default class Grade extends React.Component {

    constructor(props) {
        super(props)
        this.createGrade = this.createGrade.bind(this)
    }
    componentDidMount() {
        this.createGrade()
    }
    componentDidUpdate() {
        this.createGrade()
    }
    createGrade() {
        const node = this.node;
        const root = hierarchy(this.props.data)
            .sum(function (d) { return 1; })
            .sort(function (a, b) { return b.value - a.value; });

        const packLayout = pack();

        packLayout.size([this.props.gWidth, this.props.gWidth])
            .padding(12);

        packLayout(root);
        const nodes = root.descendants();

        const updateSidePanel = function (d) {
            // if the node is a bullet point of a standard (standard topic),
            // then you want to show the cluster and the standard title
            // and highlight the specific selected topic
            // let topic;
            let node = d;
            if (d.depth > 3) {
                node = d.parent;
                // topic = d;
            }

            // get all the elements from side panel that need to be updated.
            // this is old school!
            const cluster = document.getElementById("cluster");
            const clusterType = document.getElementById("clusterType");
            const clusterDescription = document.getElementById("clusterDescription");
            const heading = document.getElementById("heading");
            const subheading = document.getElementById("subheading");
            const description = document.getElementById("description");

            // capitalize first letter of clusterType
            const type = node.parent.data.data.clusterType;
            const typeStringPrepared = type.charAt(0).toUpperCase() + type.substring(1);

            clusterType.textContent = `${typeStringPrepared} cluster`;
            clusterDescription.innerHTML = node.parent.data.name;
            cluster.style.display = "block";
            subheading.style.display = "none";
            heading.textContent = node.data.data.code;
            description.innerHTML = node.data.data.description;
        }

        var color = scaleLinear()
            .domain([-1, 5])
            .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
            .interpolate(interpolateHcl);

        select(node)
            .selectAll("g")
            .data(nodes)
            .enter().append("g");

        select(node)
            .selectAll("g")
            .data(nodes)
            .append('circle')
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
                    return `${genericClass} node--leaf`;
                }
                return genericClass;
            })
            .on("click", function (d, event) {
                if (!d.children) {
                    updateSidePanel(d);
                }
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

        select(node)
            .selectAll("g")
            .data(nodes).append("text")
            .attr("text-anchor", "middle")
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .attr("dy", "0.3em")
            .attr("class", "label")
            .text((d) => {
                return d.children ? "" : d.data.data.codeTrimmed
            });

        this.addCirclePathGradeName(nodes);
        this.addTooltips(nodes);
    }

    addTooltips(nodes) {
        // I should extract the creation of tooltips.
        const gradeTooltipContainer = select(`#tooltips-grade-${this.props.index}`);
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

    addCirclePathGradeName(nodes) {
        const node = this.node;
        const positionTopRightQuadrant = "34%";
        select(node)
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

        const wrappingText = select(node)
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
            .text((d) => {
                if (d.depth === 0) return d.data.name;
            });
    }

    render() {
        return (
            <g transform={`translate(${this.props.transformX},${this.props.transformY})`} className="grade" id={`grade-${this.props.index}`} ref={node => this.node = node}></g>
        );
    }

}