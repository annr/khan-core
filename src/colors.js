import { scaleLinear } from "d3-scale";

export const PREREQS = scaleLinear().domain([1, 6])
    .range(["mediumorchid", "#fcdef1"]);

export const ENABLED = scaleLinear().domain([1, 6])
    .range(["#ff9933", "#ff9933"]);

export const RELATED = scaleLinear().domain([1, 6])
    .range(["#ff9999", "white"]);
