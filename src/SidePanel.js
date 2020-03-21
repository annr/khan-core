import React, { useState } from 'react';
import "./SidePanel.css"
import SidePanelContent from "./SidePanelContent";

export default function SidePanel() {
    const [isOpen, toggle] = useState(true);
    return (
        <div id="side-panel" className={`panel ${isOpen ? "side-panel-open" : "side-panel-closed"}`} >
            <button type="button" aria-label="Toggle side bar" id="sidePanelToggleIcon" className={`toggle-icon ${isOpen ? "open" : "closed"}`} onClick={() => toggle(!isOpen)}>
                <svg width="20" height="30" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <polyline points="5 5 15 15 5 25" stroke="rgba(0,0,0,0.4)" strokeWidth="3" strokeLinecap="round" fill="none" strokeLinejoin="round"></polyline>
                </svg>
            </button>
            <SidePanelContent />
        </div >
    );
}
