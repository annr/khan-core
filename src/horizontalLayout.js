

const GRADE_WIDTH_START = 920;
const GUTTER = 40;

function getTotalWidth(gradeWidth, gradesLength) {
    return (gradeWidth * gradesLength) + (GUTTER * (gradesLength - 1));
}

export function getOffsetStart(windowWidth, gradesLength) {
    const totalWidth = getTotalWidth(GRADE_WIDTH_START, gradesLength);
    return (totalWidth - windowWidth) / 2;
}

export function getTransformsAndWidths1Row(gradesLength, windowWidth) {
    const transformsAndWidth = [];
    const offsetStart = getOffsetStart(windowWidth, gradesLength);

    for (let i = 0; i < gradesLength; i++) {
        let x = (i * (GRADE_WIDTH_START + GUTTER)) - offsetStart;
        const y = 50;
        transformsAndWidth.push([x, y, GRADE_WIDTH_START]);
    }
    return transformsAndWidth;
}


// I'm sending back transforms and width together in an array martix.
// This means width is repeated a bunch of times in that matrix.
// Dodo don't care.
export function getTransformsAndWidths(gradesLength, windowWidth) {
    return getTransformsAndWidths1Row(gradesLength, windowWidth);
}