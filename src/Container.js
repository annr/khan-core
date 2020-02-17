import React from "react";
import Grade from "./Grade";

export default class Container extends React.Component {
    render() {
        const gradeName = ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade'].concat([4, 5, 6, 7, 8].map((n) => n + 'th Grade'));

        const grades = gradeName.map((d, i) => {
            return (
                <div className="container" key={i}>
                    <Grade index={i} />
                </div>
            );
        });

        return (
            <React.Fragment>
                {grades}
            </React.Fragment>
        );
    }
}