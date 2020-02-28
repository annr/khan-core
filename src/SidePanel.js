import React from "react";
import "./SidePanel.css"
// Here we format the side panel
// The contents will be injected into it from the standards

export default class SidePanel extends React.Component {
    render() {
        return (
            <div className="side-panel">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                {/* <button className="hide-show-side-panel">
                    Hide Panel
                </button> */}
            </div>

        );
    }
}