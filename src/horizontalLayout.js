export const DOUBLE_COLUMN_BREAKPOINT = 1278;

// extraWidth is required to make circles a bit bigger for the 2-col layout
// we need to do this for standard topic labels which have an extra character and
// can be too wide

// Grade width is a constant using marign, windowWidth and breakpoints
// Only two-column for now
export function getGradeWidth(windowWidth, margin = 0, extraWidth = 0) {
    if (windowWidth >= DOUBLE_COLUMN_BREAKPOINT) {
        return Math.floor(extraWidth / 2) + Math.floor(windowWidth / 2) - (margin + margin / 2);
    }
    return windowWidth;
}

export function getTransformsAndWidths1Row(gradesLength, windowWidth) {
    // no margins necessary here, just boxes down.
    // grade groups are square
    const gradeWidth = getGradeWidth(windowWidth);
    const transformsAndWidth = [];

    for (let i = 0; i < gradesLength; i++) {
        const gutter = 40;
        const margin = 60;
        let x = margin + (i * (gradeWidth + gutter));
        const y = 100;
        transformsAndWidth.push([x, y, gradeWidth]);
    }
    return transformsAndWidth;
}


// I'm sending back transforms and width together in an array martix.
// This means width is repeated a bunch of times in that matrix.
// Dodo don't care.
export function getTransformsAndWidths(gradesLength, windowWidth) {
    return getTransformsAndWidths1Row(gradesLength, windowWidth);
}