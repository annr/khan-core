import React from "react";
import "./SidePanel.css"
// Here we format the side panel
// The contents will be injected into it from the standards

export default class SidePanel extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="side-panel">
                    <h1>Khan Core</h1>
                    <h2 style={{ "fontWeight": "normal" }}>Find and fill math gaps in grades K through 8</h2>
                    <p>Select a standard to show details and relationships. Panning and zooming are enabled.</p>
                    {/* <button className="hide-show-side-panel">
                    Hide Panel
                </button> */}
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
                <div class="fixed-reveal-gradient"></div>
            </React.Fragment>
        );
    }
}