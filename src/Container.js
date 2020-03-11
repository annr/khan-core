import React from "react";

// This top-level d3 import is for zoom, which for some reason doesn't work as an import on it's own. 
// TODO (ann): Figure this out later!
import * as d3 from "d3";
import { select, event } from 'd3-selection';
import Grades from "./Grades";
import Tooltips from "./Tooltips";

import "./Container.css";
import { getTransformsAndWidths } from "./responsiveLayout.js";

export default class Container extends React.Component {
    constructor(props) {
        super(props);
        this.createZoom = this.createZoom.bind(this);
        // this.handleResize = this.handleResize.bind(this)
        this.state = { width: window.innerWidth };
    };

    componentDidMount() {
        this.createZoom();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    // handleResize() {
    //     //this.setState({ width: window.innerWidth });
    // }

    componentDidUpdate() {
        this.createZoom();
    }

    createZoom() {
        const grades = this.grades;
        const canvas = this.canvas;

        const gradesNode = select(grades);
        const canvasNode = select(canvas);

        var zoom = d3.zoom()
            .scaleExtent([0.2, 5])
            .on('zoom', zoomed);

        canvasNode.call(zoom);

        function zoomed() {
            gradesNode.attr("transform", event.transform);
        }
    }

    renderGrades() {
        const width = this.state.width;
        const gradeCount = 9; // show grades K - 8 for now.

        // until we know the window width, don't add anything.
        if (width === 0) {
            return null;
        }

        // for now, we are figuring out how to lay out the grades based on window width.
        const layouts = getTransformsAndWidths(gradeCount, width);

        return <Grades layouts={layouts} />;
    }

    render() {
        return (
            <React.Fragment>
                <div className="container" ref={container => this.container = container} >
                    <svg className="canvas" ref={canvas => this.canvas = canvas}>
                        <g ref={grades => this.grades = grades}>
                            {this.renderGrades()}
                        </g>
                    </svg>
                </div>
                <Tooltips grades={[...Array(9).keys()]} />
            </React.Fragment>
        );
    }
}