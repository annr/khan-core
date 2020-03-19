import React, { useState } from 'react';
import logo from './khan-academy-logo.svg';
import "./SidePanelContent.css";

// This transforms from an intro to the app to the details card
export default function SidePanelContent() {
    const [isOpen, toggle] = useState(true);
    return (
        <React.Fragment>
            <button type="button" aria-label="Toggle side bar" id="collapseIcon" className={isOpen ? "open" : "closed"} onClick={() => toggle(!isOpen)}>
                <svg width="20" height="30" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <polyline points="5 5 15 15 5 25" stroke="rgba(0,0,0,0.5)" strokeWidth="3" strokeLinecap="butt" fill="none" strokeLinejoin="round"></polyline>
                </svg>
            </button>
            <h1 className="appName">Khan Core</h1>
            <div id="panelConent">
                <div id="initialContent">
                    <h2 style={{ "fontWeight": "normal" }}>Find and fill math gaps in grades <span style={{ "whiteSpace": "nowrap" }}>K through 8.</span></h2>
                    <p>Use this map to explore grade school math content using using relationships built into the Common Core State Standards.</p>
                    <p>Links to Khan Academy content are provided.</p>
                    <h3>To Use:</h3>
                    <p>Select a standard to see details and resources in this panel.</p>
                    <p>You may zoom in and out and drag for better views.</p>
                </div>
                <div id="dynamicContent">
                    <div id="cluster">
                        <strong id="clusterType"></strong><br />
                        <div id="clusterDescription"></div>
                    </div>
                    <div id="selectedStandardHeadingWrapper"></div>
                    <div id="description">
                    </div>
                    <div id="khanContent">
                        <img src={logo} alt="Khan Academy" width="192" height="42" />
                        <ul id="khanContentLinks"></ul>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}
