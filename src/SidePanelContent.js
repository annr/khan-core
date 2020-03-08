import React from 'react';
import logo from './khan-academy-logo.svg';
import "./SidePanelContent.css";

// This transforms from an intro to the app to the details card
class SidePanelContent extends React.Component {
    render() {
        return (
            <div className="dynamic-content">
                <div id="cluster">
                    <strong id="clusterType">Major cluster</strong><br />
                    <div id="clusterDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</div>
                </div>
                <h1 id="heading">Khan Core</h1>
                <h2 id="subheading" style={{ "fontWeight": "normal" }}>Find and fill math gaps,<br />grades K through 8</h2>
                <div id="description">
                    <p>Select a standard to show details and relationships.</p>
                    <p>Panning and zooming are enabled.</p>
                </div>
                <div id="khanContent">
                    <img src={logo} alt="Khan Academy" width="192" height="42" />
                    <ul id="khanContentLinks"></ul>
                </div>
                {/* <button className="hide-show-side-panel">
                    Hide Panel
                </button> */}
            </div>
        );
    }
}

export default SidePanelContent;
