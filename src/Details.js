import React from "react";

export default class Details extends React.Component {
    render() {
        return this.props.grades.map((i) => {
            const y = this.props.layouts[i][2] + 200;
            return (
                <foreignObject x={this.props.layouts[i][0] + 100} y={y} width={this.props.layouts[i][2] - 100} height={this.props.layouts[i][2]} key={i} id={`details-container-${i}`}>
                    <div xmlns="http://www.w3.org/1999/xhtml" className="testStyle" id={`details-${i}`}>HEY</div>
                </foreignObject>
            );
        });
    }
}