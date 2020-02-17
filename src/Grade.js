import React from "react";
import { select } from 'd3-selection';

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
            .selectAll("g")
            .data([this.props.index])
            .enter()
            .append("g")
            .append("text")
            .text(this.props.index);
    }

    render() {
        // setting the viewBox to 600x600 for now. It's big enough to show the details of a grade circle,
        // while displaying K and 1st Grade side-by-side on a laptop.
        return <svg viewBox="0 0 600 600" height="100%" width="100%" preserveAspectRatio="xMidYMid slice">
            <g className="grade" id={`grade-${this.props.index}`} ref={node => this.node = node}></g>
        </svg>
    }

}