import React, { useState } from 'react';
import { scaleLinear } from "d3-scale";
import "./Legend.css"

const PREREQS = scaleLinear().domain([1, 6])
    .range(["mediumorchid", "#fcdef1"]);

const ENABLED = scaleLinear().domain([1, 6])
    .range(["gold", "lightgoldenrodyellow"]);

const RELATED = scaleLinear().domain([1, 6])
    .range(["#9db8e0", "white"]);

export default function Legend() {
    const [isOpen, toggle] = useState(false);
    function renderSelected() {
        return (
            <svg height="36" width="36" className="legendItem">
                <circle r="12" cx="18" cy="18" className="selected-node-example"></circle>
                <circle r="15" cx="18" cy="18" className="selectedRing-example"></circle>
            </svg>
        );
    }

    function renderRelated() {
        return (
            <svg height="36" width="36" className="legendItem">
                <circle r="15" cx="18" cy="18" className="non-directional-example" fill={RELATED(1)}></circle>
            </svg>
        );
    }

    function renderPrerequisite() {
        return (
            <svg height="36" width="36" className="legendItem">
                <circle r="15" cx="18" cy="18" className="prerequisite-example" fill={PREREQS(1)}></circle>
            </svg>
        );
    }

    function renderEnabled() {
        return (
            <svg height="40" width="40" className="legendItem">
                <circle r="15" cx="18" cy="18" className="enabled-example" fill={ENABLED(1)}></circle>
            </svg>
        );
    }

    function renderMajor() {
        return (
            <svg height="36" width="36" className="legendItem">
                <circle r="15" cx="18" cy="18" className="cluster-example"></circle>
                <circle r="15" cx="18" cy="18" className="major-example"></circle>
            </svg>
        );
    }

    function renderAdditional() {
        return (
            <svg height="36" width="36" className="legendItem">
                <circle r="15" cx="18" cy="18" className="cluster-example"></circle>
                <circle r="15" cx="18" cy="18" className="additional-example"></circle>
            </svg>
        );
    }

    function renderSupporting() {
        return (
            <svg height="36" width="36" className="legendItem">
                <circle r="15" cx="18" cy="18" className="cluster-example"></circle>
                <circle r="15" cx="18" cy="18" className="supporting-example"></circle>
            </svg>
        );
    }

    return (
        <div id="legend" className={`panel ${isOpen ? "legend-open" : "legend-closed"}`}>
            <button type="button" aria-label="Toggle side bar" id="legendToggleIcon" className={`toggle-icon ${isOpen ? "legendOpen" : "legendClosed"}`} onClick={() => toggle(!isOpen)}>
                <svg width="20" height="30" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <polyline points="5 5 15 15 5 25" stroke="rgba(0,0,0,0.4)" strokeWidth="3" strokeLinecap="round" fill="none" strokeLinejoin="round"></polyline>
                </svg>
            </button>
            <dl>
                <dt onClick={() => toggle(!isOpen)}>
                    Legend
                </dt>
                <dl className="standardsList">
                    <dd>{renderSelected()} selected standard</dd>
                    <dd>{renderRelated()} related standard</dd>
                    <dd>{renderPrerequisite()} prerequisite standard</dd>
                    <dd>{renderEnabled()} enabled standard</dd>
                </dl>
                <dl className="clustersList">
                    <dd>{renderMajor()} major cluster</dd>
                    <dd>{renderAdditional()} additional cluster</dd>
                    <dd>{renderSupporting()} supporting cluster</dd>
                </dl>
            </dl>
        </div>
    );
}