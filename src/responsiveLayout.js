export const MOBILE_BREAKPOINT = 768;
export const WIDESCREEN_BREAKPOINT = 1281;

// Grade width is a constant using marign, windowWidth and breakpoints
// Only two-column for now
export function getGradeWidth(windowWidth, margin) {
    return Math.floor(windowWidth / 2) - (margin + margin / 2);
}

// We calculate "x" using modulus. Even index grades are shifted by margin,
// and odd grades are shifted by gradeWidth + (margin * 2)
export function getStandardXTranslate(i, gradeWidth, margin) {
    return margin + ((i % 2 !== 0) ? gradeWidth + margin : 0);
}

// We calculate "y" using the number of rows down plus totalVerticalMargin
// and totalStepHeight
export function getStandardYTranslate(i, gradeWidth, margin, totalStepHeight) {
    const totalVerticalMargin = (Math.floor(i / 2) + 1) * margin;
    return (Math.floor(i / 2) * (gradeWidth - 12)) + totalVerticalMargin + totalStepHeight;
}

// I'm sending back transforms and width together in an array martix. 
// This means width is repeated a bunch of times in that matrix. Some
// people would have a problem with this but Dodo don't care. 
export function getTransformsAndWidths(gradesLength, windowWidth) {
    const margin = 5;
    // grade groups are square
    const gradeWidth = getGradeWidth(windowWidth, margin);
    const transformsAndWidth = [];
    const stepHeight = 48;
    let totalStepHeight = 0;
    for (let i = 0; i < gradesLength; i++) {
        let x = getStandardXTranslate(i, gradeWidth, margin);
        // make rows
        // we add to total step every other one
        if (i % 2 !== 0) {
            totalStepHeight += stepHeight;
        }

        const y = getStandardYTranslate(i, gradeWidth, margin, totalStepHeight);

        // since we have an odd number of grades, center the last one.
        if (i === gradesLength - 1) {
            x = Math.floor(windowWidth / 4);
        }
        transformsAndWidth.push([x, y, gradeWidth]);
    }
    return transformsAndWidth;
}