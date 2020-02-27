import React from "react";
import { select } from 'd3-selection';
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
            .padding(5);

        packLayout(root);
        const nodes = root.descendants();

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
            .style("fill", function (d) { return d.children ? color(d.depth) : null; });
    }

    render() {
        return (
            <g transform={`translate(${this.props.transformX},${this.props.transformY})`} className="grade" id={`grade-${this.props.index}`} ref={node => this.node = node}></g>
        );
    }

}