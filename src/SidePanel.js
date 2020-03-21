import React, { useState } from 'react';
import "./SidePanel.css"
import SidePanelContent from "./SidePanelContent";

export default function SidePanel() {
    const [isOpen, toggle] = useState(true);
    return (
        <div id="side-panel" className={isOpen ? "side-panel-open" : "side-panel-closed"} >
            <div className="toggleWrapper">
                <button type="button" aria-label="Toggle side bar" id="collapseIcon" className={isOpen ? "open" : "closed"} onClick={() => toggle(!isOpen)}>
                    <svg width="20" height="30" xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <polyline points="5 5 15 15 5 25" stroke="rgba(0,0,0,0.5)" strokeWidth="3" strokeLinecap="butt" fill="none" strokeLinejoin="round"></polyline>
                    </svg>
                </button>
            </div>
            <SidePanelContent />
        </div >
    );
}
