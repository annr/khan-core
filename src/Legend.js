import React from "react";
import { scaleLinear } from "d3-scale";
import "./Legend.css"

const PREREQS = scaleLinear().domain([1, 6])
    .range(["mediumorchid", "#fcdef1"]);

const ENABLED = scaleLinear().domain([1, 6])
    .range(["gold", "lightgoldenrodyellow"]);

const RELATED = scaleLinear().domain([1, 6])
    .range(["#9db8e0", "white"]);

export default class Legend extends React.Component {

    // constructor(props) {
    //     super(props)
    //     this.createLegend = this.createLegend.bind(this)
    // }
    // componentDidMount() {
    //     this.createLegend()
    // }
    // componentDidUpdate() {
    //     this.createLegend()
    // }
    // createLegend() {

    // }

    renderSelected() {
        return (
            <svg height="36" width="36" className="legendItem">
                <circle r="12" cx="18" cy="18" class="selected-node-example"></circle>
                <circle r="15" cx="18" cy="18" class="selectedRing-example"></circle>
            </svg>
        );
    }

    renderRelated() {
        return (
            <svg height="36" width="36" className="legendItem">
                <circle r="15" cx="18" cy="18" class="non-directional-example" fill={RELATED(1)}></circle>
            </svg>
        );
    }

    renderPrerequisite() {
        return (
            <svg height="36" width="36" className="legendItem">
                <circle r="15" cx="18" cy="18" class="prerequisite-example" fill={PREREQS(1)}></circle>
            </svg>
        );
    }

    renderEnabled() {
        return (
            <svg height="40" width="40" className="legendItem">
                <circle r="15" cx="18" cy="18" class="enabled-example" fill={ENABLED(1)}></circle>
            </svg>
        );
    }

    renderMajor() {
        return (
            <svg height="36" width="36" className="legendItem">
                <circle r="15" cx="18" cy="18" class="cluster-example"></circle>
                <circle r="15" cx="18" cy="18" class="major-example"></circle>
            </svg>
        );
    }

    renderAdditional() {
        return (
            <svg height="36" width="36" className="legendItem">
                <circle r="15" cx="18" cy="18" class="cluster-example"></circle>
                <circle r="15" cx="18" cy="18" class="additional-example"></circle>
            </svg>
        );
    }

    renderSupporting() {
        return (
            <svg height="36" width="36" className="legendItem">
                <circle r="15" cx="18" cy="18" class="cluster-example"></circle>
                <circle r="15" cx="18" cy="18" class="supporting-example"></circle>
            </svg>
        );
    }

    render() {
        return (
            <div id="legend">
                <dl>
                    <dt>
                        Legend
                    </dt>
                    <dl className="standardsList">
                        <dd>{this.renderSelected()} selected standard</dd>
                        <dd>{this.renderRelated()} related standard</dd>
                        <dd>{this.renderPrerequisite()} prerequisite standard</dd>
                        <dd>{this.renderEnabled()} enabled standard</dd>
                    </dl>
                    <dl className="clustersList">
                        <dd>{this.renderMajor()} major cluster</dd>
                        <dd>{this.renderAdditional()} additional cluster</dd>
                        <dd>{this.renderSupporting()} supporting cluster</dd>
                    </dl>
                </dl>
            </div>
        );
    }
}