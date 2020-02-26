import React from "react";
import { select } from 'd3-selection';

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
        //const data = this.props.data;

        select(node)
            .selectAll("rect")
            .data([this.props.index])
            .enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            // .attr('width', this.props.gWidth)
            // .attr('height', this.props.gWidth)
            .attr('width', this.props.gWidth)
            .attr('height', this.props.gWidth)
            .attr("fill", "pink")
            .attr("stroke", "green")
            .attr("stroke-width", 2)

        select(node)
            .selectAll("text")
            .data([this.props.index])
            .enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr('x', 100)
            .attr('y', 100)
            .attr("fill", "black")
            .attr("size", 200)
            .text(this.props.index)
    }

    render() {
        return (
            <g transform={`translate(${this.props.transformX},${this.props.transformY})`} className="grade" id={`grade-${this.props.index}`} ref={node => this.node = node}></g>
        );
    }

}