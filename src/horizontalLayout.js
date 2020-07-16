

const GRADE_WIDTH_START = 920;


export function getTransformsAndWidths1Row(gradesLength, windowWidth) {
    const gradeWidth = GRADE_WIDTH_START;
    const transformsAndWidth = [];
    const gutter = 40;
    const totalWidth = (gradeWidth * gradesLength) + (gutter * (gradesLength - 1));
    const offsetStart = (totalWidth - windowWidth) / 2;

    for (let i = 0; i < gradesLength; i++) {
        let x = (i * (gradeWidth + gutter)) - offsetStart;
        const y = 50;
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