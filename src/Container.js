import React from "react";

// This top-level d3 import is for zoom, which for some reason doesn't work as an import on it's own. 
// TODO (ann): Figure this out later!
import * as d3 from "d3";
import { select, event } from 'd3-selection';
import { easeQuadOut } from 'd3-ease';
import Grades from "./Grades";
import Details from "./Details";
import Tooltips from "./Tooltips";

import "./Container.css";
import { getTransformsAndWidths, getOffsetStart } from "./horizontalLayout.js";

export default class Container extends React.Component {
    constructor(props) {
        super(props);
        this.createZoom = this.createZoom.bind(this);
        this.state = { width: window.innerWidth };
    };

    componentDidMount() {
        this.createZoom();
    }

    componentDidUpdate() {
        this.createZoom();
    }

    createZoom() {
        const grades = this.grades;
        const canvas = this.canvas;

        const gradesNode = select(grades);
        const canvasNode = select(canvas);

        // set the scale extent first value to be able to fit 9 grades @~920 each
        // for the ease out later below.
        var zoom = d3.zoom()
            .scaleExtent([0.125, 5])
            .on('zoom', zoomed);

        canvasNode.call(zoom);

        function zoomed() {
            gradesNode.attr("transform", event.transform);
        }

        // do it
        // setTimeout(() => {
        //     zoom.scaleBy(canvasNode.transition().ease(easeQuadOut).duration(3000), 0.125);
        //     setTimeout(() => {
        //         const title = document.getElementById("khan-core-title");
        //         title.style.fill = "black";
        //         setTimeout(() => {
        //             const title = document.getElementById("khan-core-subtitle");
        //             title.style.fill = "black";
        //         }, 2000);
        //     }, 4000);
        // }, 1000);
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

    // we'll use a helper from horizontalLayout to align title generally with horizontal grades
    renderTitle() {
        const width = this.state.width;
        const gradeCount = 9; // show grades K - 8 for now.

        // until we know the window width, don't add anything.
        if (width === 0) {
            return null;
        }

        const titlePosition = [-getOffsetStart(width, gradeCount), -400];

        // we don't want the begining of the title to be at the very left edge, because
        // sometime that side gets cut off!
        titlePosition[0] += 500;

        console.log(titlePosition);
        return (
            <g>
                <text id="khan-core-title" className="khan-core-title" fill="black" x={titlePosition[0] + ""} y={titlePosition[1]}>
                    Khan Core
                </text>
                <text id="khan-core-subtitle" className="khan-core-subtitle" fill="black" x={titlePosition[0] + 1900 + ""} y={titlePosition[1]}>
                    Common Core Math + Khan Academy
                </text>
            </g>
        );
    }

    // we'll use a helper from horizontalLayout to align title generally with horizontal grades
    renderDetailAreas() {
        const width = this.state.width;
        const gradeCount = 9; // show grades K - 8 for now.

        // until we know the window width, don't add anything.
        if (width === 0) {
            return null;
        }
        const layouts = getTransformsAndWidths(gradeCount, width);
        return <Details layouts={layouts} grades={[...Array(9).keys()]} />;
    }

    render() {
        return (
            <React.Fragment>
                <div className="container" ref={container => this.container = container} >
                    <svg className="canvas" ref={canvas => this.canvas = canvas}>
                        <filter id="raised" height="200%" width="200%">
                            <feDropShadow dx="3" dy="5" stdDeviation="2" floodColor="#000" floodOpacity="0.5" />
                        </filter>
                        <filter id="raised-example" height="200%" width="200%">
                            <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.5" />
                        </filter>
                        <filter id="inset-shadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feComponentTransfer in="SourceAlpha">
                                <feFuncA type="table" tableValues="1 0" />
                            </feComponentTransfer>
                            <feGaussianBlur stdDeviation="4" />
                            <feOffset dx="0" dy="5" result="offsetblur" />
                            <feFlood floodColor="rgb(0, 0, 0)" result="color" />
                            <feComposite in2="offsetblur" operator="in" />
                            <feComposite in2="SourceAlpha" operator="in" />
                            <feMerge>
                                <feMergeNode in="SourceGraphic" />
                                <feMergeNode />
                            </feMerge>
                        </filter>
                        <filter id="inset-shadow-example" x="-50%" y="-50%" width="200%" height="200%">
                            <feComponentTransfer in="SourceAlpha">
                                <feFuncA type="table" tableValues="1 0" />
                            </feComponentTransfer>
                            <feGaussianBlur stdDeviation="2" />
                            <feOffset dx="0" dy="2" result="offsetblur" />
                            <feFlood floodColor="rgb(0, 0, 0)" result="color" />
                            <feComposite in2="offsetblur" operator="in" />
                            <feComposite in2="SourceAlpha" operator="in" />
                            <feMerge>
                                <feMergeNode in="SourceGraphic" />
                                <feMergeNode />
                            </feMerge>
                        </filter>
                        <g ref={grades => this.grades = grades}>
                            {this.renderTitle()}
                            {this.renderGrades()}
                            {this.renderDetailAreas()}
                        </g>
                    </svg>
                </div>
                <Tooltips grades={[...Array(9).keys()]} />
            </React.Fragment>
        );
    }
}