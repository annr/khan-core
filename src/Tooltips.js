import React from 'react';
import "./Tooltips.css";

class Tooltips extends React.Component {
    render() {
        return this.props.grades.map((i) => <div key={i} id={`tooltips-grade-${i}`}></div>)
    }
}

export default Tooltips;
