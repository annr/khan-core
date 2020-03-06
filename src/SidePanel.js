import React from "react";
import "./SidePanel.css"
// Here we format the side panel
// The contents will be injected into it from the standards

export default class SidePanel extends React.Component {
    render() {
        return (
            <div className="side-panel">
                <h1>Khan Core</h1>
                <h2 style={{ "fontWeight": "normal" }}>Find and fill math gaps in grades K through 8</h2>
                <p>Select a standard to show details and relationships. Panning and zooming are enabled.</p>
                {/* <button className="hide-show-side-panel">
                    Hide Panel
                </button> */}
            </div>

        );
    }
}