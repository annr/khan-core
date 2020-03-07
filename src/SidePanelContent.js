import React from 'react';
import "./SidePanelContent.css";

// This transforms from an intro to the app to the details card
class SidePanelContent extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div id="cluster">
                    <strong id="clusterType">Major cluster</strong><br />
                    <div id="clusterDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</div>
                </div>
                <h1 id="heading">Khan Core</h1>
                <h2 id="subheading" style={{ "fontWeight": "normal" }}>Find and fill math gaps, grades K through 8</h2>
                <div id="description">
                    <p>Select a standard to show details and relationships.</p>
                    <p>Panning and zooming are enabled.</p>
                </div>
                {/* <button className="hide-show-side-panel">
                    Hide Panel
                </button> */}
            </React.Fragment >
        );
    }
}

export default SidePanelContent;
