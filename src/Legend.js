import React, { useState } from 'react';
import "./Legend.css"
import { PREREQS, ENABLED, RELATED } from "./colors";

// test

export default function Legend() {
    // const [isOpen, toggle] = useState(window.innerHeight > 900 && window.innerWidth > 900 ? true : false);
    const [isOpen, toggle] = useState(false ? true : false);
    function renderSelected() {
        return (
            <svg height="36" width="36" className="legendItem">
                <circle r="14" cx="18" cy="18" fill="white" stroke="black" strokeWidth="3"></circle>
            </svg>
        );
    }

    function renderConcurrent() {
        return (
            <svg height="38" width="38" className="legendItem">
                <circle r="14" cx="18" cy="18" className="non-directional-example" fill={RELATED(3)}></circle>
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

    function renderPostrequisite() {
        return (
            <svg height="36" width="36" className="legendItem">
                <circle r="15" cx="18" cy="18" className="enabled-example" fill={ENABLED(1)}></circle>
            </svg>
        );
    }

    function renderMajor() {
        return (
            <svg height="36" width="36" className="legendItem">
                <circle r="15" cx="18" cy="18" className="major-example"></circle>
            </svg>
        );
    }

    function renderAdditional() {
        return (
            <svg height="36" width="36" className="legendItem">
                <circle r="15" cx="18" cy="18" className="additional-example"></circle>
            </svg>
        );
    }

    function renderSupporting() {
        return (
            <svg height="36" width="36" className="legendItem">
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
                    <dd>{renderSelected()} Selected</dd>
                    <dd>{renderPrerequisite()} Pre-requisite</dd>
                    <dd>{renderPostrequisite()} Post-requisite</dd>
                    <dd>{renderConcurrent()} Related / Concurrent</dd>
                </dl>
                <dl className="clustersList">
                    <dd>{renderMajor()} Major cluster</dd>
                    <dd>{renderSupporting()} Supporting cluster</dd>
                    <dd>{renderAdditional()} Additional cluster</dd>
                </dl>
            </dl>
        </div>
    );
}