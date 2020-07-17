import React from "react";
import "./Details.css";

export default class Details extends React.Component {
    render() {
        return this.props.grades.map((i) => {
            const y = this.props.layouts[i][2] + 100;
            return (
                <foreignObject x={this.props.layouts[i][0] + 200} y={y} width={this.props.layouts[i][2] - 400} height={this.props.layouts[i][2]} key={i} id={`details-container-${i}`}>
                    <div xmlns="http://www.w3.org/1999/xhtml" className="testStyle" id={`details-${i}`}></div>
                </foreignObject>
            );
        });
    }
}