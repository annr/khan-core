import { select, selectAll } from 'd3-selection';
import { scaleLinear } from "d3-scale";

const PREREQS = scaleLinear().domain([1, 6])
    .range(["mediumorchid", "#fcdef1"])

const ENABLED = scaleLinear().domain([1, 6])
    .range(["gold", "lightgoldenrodyellow"])

const RELATED = scaleLinear().domain([1, 6])
    .range(["#9db8e0", "white"])

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
        .classed("selected-node", (d) => d.distance === 0)
        .classed("non-directional", (d) => {
            if (d.distance && (Math.abs(d.distance) > 0) && d.edgeType === "non-directional") {
                return true;
            }
        })
        .attr("r", (d) => {
            if (d.distance === 0) {
                // make selected node slightly smaller to accomodate thick stroke
                return d.r - 5;
            }
            return d.r;
        })
        .style("fill", function (d) {
            // if (d.data.data.codeTrimmed === "CC.4.b") {
            //     debugger;
            // }
            // distance can go up to ....
            if (Math.abs(d.distance) > 8) {
                d.distance = 5;
            }
            if (d.distance !== null && d.edgeType === "non-directional") {
                return RELATED(Math.abs(d.distance));
            } else if (d.distance < 0) {
                return PREREQS(Math.abs(d.distance));
            } else if (d.distance > 0) {
                return ENABLED(d.distance);
            }
        })
        .attr("filter", (d) => {
            if (d.distance < 0) {
                return "url(#inset-shadow)";
            }
            if (d.distance > 0) {
                return "url(#raised)";
            }
        })
        .attr("stroke-width", (d) => {
            // if some kind of relationship
            if (d.distance !== null) {
                if (d.distance === 0) {
                    return 5;
                }
            }
        });
}

export default highlightConnected;
