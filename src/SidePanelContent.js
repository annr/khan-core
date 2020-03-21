import React from 'react';
import logo from './khan-academy-logo.svg';
import "./SidePanelContent.css";

// This transforms from an intro to the app to the details card
export default function SidePanelContent() {
    return (
        <div id="panelConent">
            <div id="initialContent">
                <h1 className="sidePanelHeading">Khan Core</h1>
                <h2 style={{ "fontWeight": "normal" }}>Find and fill math gaps in grades <span style={{ "whiteSpace": "nowrap" }}>K through 8.</span></h2>
                <p>Use this map to explore grade school math content using using relationships built into the Common Core State Standards.</p>
                <h3>To Use:</h3>
                <p className="instructionsWrapper">Select a standard to see details and <img src={logo} alt="Khan Academy" width="128" height="28" className="inlineLogo" /> resources.</p>
                <p>Zoom in and out and drag for better views.</p>
                <p>
                    <a
                        className="github-link"
                        href="https://github.com/annr/khan-core"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub project
                    </a>
                </p>
            </div>
            <div id="selectedStandardHeadingWrapper"></div>
            <div id="dynamicContent">
                <div id="cluster">
                    <strong id="clusterType"></strong><br />
                    <div id="clusterDescription"></div>
                </div>
                <div id="description">
                </div>
                <div id="khanContent">
                    <img src={logo} alt="Khan Academy" width="192" height="42" />
                    <ul id="khanContentLinks"></ul>
                </div>
            </div>
        </div>
    );
}
