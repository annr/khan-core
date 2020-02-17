import React from "react";

// This is for zoom, which for some reason doesn't work as an import on it's own. 
// TODO (ann): Figure this out later!
import * as d3 from "d3";
import data from "./data/ccssm-flare.json";
import { select, event } from 'd3-selection';
import Grade from "./Grade";

import "./Container.css";

export default class Container extends React.Component {
    constructor(props) {
        super(props)
        this.createZoom = this.createZoom.bind(this)
    }
    componentDidMount() {
        this.createZoom()
    }
    componentDidUpdate() {
        this.createZoom()
    }
    createZoom() {
        const canvas = this.canvas;
        const container = this.container;

        const containerNode = select(container);
        const canvasNode = select(canvas);

        var zoom = d3.zoom()
            .scaleExtent([0.1, 5])
            .on('zoom', zoomed);

        containerNode.call(zoom);

        function zoomed() {
            var transform = event.transform;
            canvasNode.style("transform", "translate(0px,0px) scale(" + transform.k + ")");
        }
    }

    renderGrades() {
        const gradeName = ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade'].concat([4, 5, 6, 7, 8].map((n) => n + 'th Grade'));
        const grades = gradeName.map((d, i) => {
            return (
                <Grade index={i} data={data[i]} key={i} />
            );
        });

        return grades;
    }

    render() {
        return (
            <div className="container" ref={container => this.container = container} >
                <div className="canvas" ref={canvas => this.canvas = canvas}>
                    {this.renderGrades()}
                </div>
            </div>
        );
    }
}