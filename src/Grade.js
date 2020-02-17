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
            .attr('width', 50)
            .attr('height', 50)
            .attr("fill", "pink")
    }

    render() {
        // setting the viewBox to 600x600 for now. It's big enough to show the details of a grade circle,
        // while displaying K and 1st Grade side-by-side on a laptop.
        return <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
            <g className="grade" id={`grade-${this.props.index}`} ref={node => this.node = node}></g>
        </svg>
    }

}