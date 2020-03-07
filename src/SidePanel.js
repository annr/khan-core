import React from "react";
import "./SidePanel.css"
import SidePanelContent from "./SidePanelContent";

export default class SidePanel extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="side-panel">
                    <SidePanelContent />
                    {/* pad the bottom to clear the gradient */}
                    <br />
                </div>
                <div className="fixed-reveal-gradient"></div>
            </React.Fragment>
        );
    }
}