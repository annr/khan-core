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
        super(props);
        this.createZoom = this.createZoom.bind(this);
        this.handleResize = this.handleResize.bind(this)
        this.state = { width: window.innerWidth };
    };

    componentDidMount() {
        this.createZoom();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
        this.setState({ width: window.innerWidth });
    }

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
            gradesNode.attr("transform", event.transform)
        }
    }

    renderGrades() {
        const width = this.state.width;
        const gradeName = ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade'].concat([4, 5, 6, 7, 8].map((n) => n + 'th Grade'));

        // until we know the window width, don't add anything.
        if (width === 0) {
            return null;
        }

        const grades = gradeName.map((d, i) => {
            return <div key={i}>nothing to see here</div>
        });

        return grades;
    }

    render() {
        return (
            <div className="container" ref={container => this.container = container} >
                <svg className="canvas" ref={canvas => this.canvas = canvas}>
                    <g className="grades" ref={grades => this.grades = grades}>
                        {this.renderGrades()}
                    </g>
                </svg>
            </div>
        );
    }
}