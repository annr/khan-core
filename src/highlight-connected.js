import { selectAll } from 'd3-selection';
import { scaleLinear } from "d3-scale";

const PINKS = scaleLinear()
    .domain([0, 2])
    .range(["#bc02eb", "#f5d9fc", "#fff"]);

const GREENS = scaleLinear()
    .domain([0, 2])
    .range(["#089101", "#0ffa02", "#aefca9"]);

const BLUES = scaleLinear()
    .domain([-3, 0, 3])
    .range(["#bc02eb", "#036bfc", "#bceb02"]);

const highlightConnected = function (node, NODES, LINKS) {
    // builds distance values for every node
    NODES.forEach(function (d) {
        d.distance = null;
    });

    node.distance = 0;

    var i = -1;
    var foundOne = false;
    while (true) {
        foundOne = false;
        LINKS.forEach(function (link) {
            if (link.target.distance === i + 1 && link.source.distance === null) {
                foundOne = true;
                link.source.distance = i;
                link.source.edgeType = link.type;
            }
        });
        if (!foundOne) break;
        --i;
    }
    i = 1;
    while (true) {
        foundOne = false;
        LINKS.forEach(function (link) {
            if (link.source.distance === i - 1 && link.target.distance === null) {
                foundOne = true;
                link.target.distance = i;
                link.target.edgeType = link.type;
            }
        });
        if (!foundOne) break;
        ++i;
    }

    // this stays highlighted until the user selects another
    selectAll(".standard")
        .style("fill", function (d) {
            // if (d.data.data.codeTrimmed === "CC.4.b") {
            //     debugger;
            // }
            // distance can go up to ....
            if (Math.abs(d.distance) > 8) {
                d.distance = 5;
            }
            if (d.distance !== null && d.edgeType === "non-directional") {
                return BLUES(Math.abs(d.distance));
            } else if (d.distance < 0) {
                return PINKS(Math.abs(d.distance));
            } else if (d.distance > 0) {
                return GREENS(d.distance);
            }
            return "#E4F8F5";
        })
        .attr("stroke-width", (d) => {
            // if some kind of relationship
            if (d.distance !== null) {
                if (d.distance === 0) {
                    return "1.5";
                }
                return "0.5";
            }
            return "0";
        })
        .attr("stroke", (d) => {
            if (d.distance !== null) {
                return "black";
            }
            return "none";
        })
        .attr("stroke-dasharray", (d) => {
            if (d.distance && (Math.abs(d.distance) > 0) && d.edgeType === "non-directional") {
                return "2,3,2";
            }
            return "none";
        });
}

export default highlightConnected;
