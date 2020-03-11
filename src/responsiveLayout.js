export const DOUBLE_COLUMN_BREAKPOINT = 1280;

// Grade width is a constant using marign, windowWidth and breakpoints
// Only two-column for now
export function getGradeWidth(windowWidth, margin = 0) {
    if (windowWidth >= DOUBLE_COLUMN_BREAKPOINT) {
        return Math.floor(windowWidth / 2) - (margin + margin / 2);
    }
    return windowWidth;
}

export function get1ColYTranslate(i, gradeWidth) {
    return i * gradeWidth;
}

// We calculate "x" using modulus. Even index grades are shifted by margin,
// and odd grades are shifted by gradeWidth + (margin * 2)
export function getXTranslate(i, gradeWidth, margin = 0) {
    return margin + ((i % 2 !== 0) ? gradeWidth + margin : 0);
}

// We calculate "y" using the number of rows down plus totalVerticalMargin
// and totalStepHeight
export function get2ColYTranslate(i, gradeWidth, margin, totalStepHeight) {
    const totalVerticalMargin = (Math.floor(i / 2) + 1) * margin;
    return (Math.floor(i / 2) * (gradeWidth - 12)) + totalVerticalMargin + totalStepHeight;
}

export function getTransformsAndWidths2Col(gradesLength, windowWidth) {
    const margin = 5;
    // grade groups are square
    const gradeWidth = getGradeWidth(windowWidth, margin);
    const transformsAndWidth = [];
    const stepHeight = 48;
    let totalStepHeight = 0;
    for (let i = 0; i < gradesLength; i++) {
        let x = getXTranslate(i, gradeWidth, margin);
        // make rows
        // we add to total step every other one
        if (i % 2 !== 0) {
            totalStepHeight += stepHeight;
        }

        const y = get2ColYTranslate(i, gradeWidth, margin, totalStepHeight);

        // since we have an odd number of grades, center the last one.
        if (i === gradesLength - 1) {
            x = Math.floor(windowWidth / 4);
        }
        transformsAndWidth.push([x, y, gradeWidth]);
    }
    return transformsAndWidth;
}

export function getTransformsAndWidths1Col(gradesLength, windowWidth) {
    // no margins necessary here, just boxes down.
    // grade groups are square
    const gradeWidth = getGradeWidth(windowWidth);
    const transformsAndWidth = [];

    for (let i = 0; i < gradesLength; i++) {
        let x = 0;
        const y = get1ColYTranslate(i, gradeWidth);
        transformsAndWidth.push([x, y, gradeWidth]);
    }
    return transformsAndWidth;
}

// I'm sending back transforms and width together in an array martix.
// This means width is repeated a bunch of times in that matrix.
// Dodo don't care.
export function getTransformsAndWidths(gradesLength, windowWidth) {
    if (windowWidth >= DOUBLE_COLUMN_BREAKPOINT) {
        return getTransformsAndWidths2Col(gradesLength, windowWidth);
    }
    return getTransformsAndWidths1Col(gradesLength, windowWidth);;
}