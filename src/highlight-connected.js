import { select, selectAll } from 'd3-selection';
import { PREREQS, ENABLED, RELATED } from "./colors";

export const unsetConnected = function (currentNode) {
    selectAll(".standard")
        .classed("selected-node", false)
        .classed("non-directional", false)
        .classed("diminished-node", false)
        .style("fill", null)
        .attr("filter", null);

    select(currentNode).attr("r", (d) => d.r);
}

const getRelationship = (dist, edgeType) => {
    let label;
    const direction = (dist > 0) ? "after" : "before";
    let step = `${Math.abs(dist)} step`;
    if (Math.abs(dist) > 1) {
        step += "s";
    }
    if (edgeType === "non-directional") {
        label = "Related";
    } else if (edgeType === "arrow" && dist < 0) {
        label = "Foundation";
    } else if (edgeType === "arrow" && dist > 0) {
        label = "Enabled";
    }
    return `<b>${label}</b> standard <b>${step}</b> ${direction} selected`
};

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
        .classed("diminished-node", (d) => {
            return d.distance === null;
        })
        .classed("selected-node", (d) => d.distance === 0)
        .classed("non-directional", (d) => {
            if (d.distance && (Math.abs(d.distance) > 0) && d.edgeType === "non-directional") {
                return true;
            }
        })
        .style("fill", function (d) {
            if (d.distance === 0) {
                return "#fff";
            }

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
            if (d.distance !== null) {
                return "url(#raised)";
            }
        });


    selectAll(".tooltip")
        .html((d) => {
            // if it's a leaf node, highlight the any relationship in the tooltip
            if (d.distance) {
                if (!d.children && (d.data && d.data.data)) {
                    // show node name and relationship
                    const relationship = getRelationship(d.distance, d.edgeType);
                    let contents = `<h3> ${d.data.data.code}</h3>`;
                    contents += `<p>${relationship}</p>`;
                    contents += `<p> ${d.data.data.description}</p>`;
                    return contents;
                }
                if (d.data && d.data.data) {
                    return d.data.data.description;
                }
            }
            if (d.data.name !== null) {
                return `<strong>${d.data.name}</strong>`;
            }
            if (!d.children && (d.data && d.data.data)) {
                // show node name and relationship
                let contents = `<h3>${d.data.data.code}</h3>`;
                contents += `<p>${d.data.data.description}</p>`;
                return contents;
            }
            if (d.data && d.data.data) {
                return d.data.data.description;
            }
        });
}

export default highlightConnected;
