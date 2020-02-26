import {
    WIDESCREEN_BREAKPOINT,
    getGradeWidth,
    getStandardXTranslate,
    getStandardYTranslate
} from './responsiveLayout';

test("getGradeWidth returns a value for 2 columns if windowWidth is between MOBILE_BREAKPOINT and WIDESCREEN_BREAKPOINT", () => {
    const margin = 30;
    const windowWidth = WIDESCREEN_BREAKPOINT - 10;
    const gradeWidth = getGradeWidth(windowWidth, margin);
    const expectedGradeWidth = 590;
    expect(gradeWidth).toBe(expectedGradeWidth);
});


test("getStandardXTranslate returns margin value for even indexes (left column) and gradeWidth + (marin * 2) for odd", () => {
    const margin = 30;
    const gradeWidth = 560;
    // 0 is the first index and should be considered even
    const xEven = getStandardXTranslate(0, gradeWidth, margin);
    expect(xEven).toBe(margin);
    const xOdd = getStandardXTranslate(1, gradeWidth, margin);
    const expectedXOdd = (margin * 2) + gradeWidth;
    expect(xOdd).toBe(expectedXOdd);
});

test("getStandardYTranslate returns (gradeWidth * rows) + totalVerticalHeight and totalStepHeight", () => {
    // (Math.floor(i / 2) * gradeWidth) + totalVerticalMargin + totalStepHeight;
    const margin = 30;
    const gradeWidth = 560;
    const stepHeight = 124;
    let totalStepHeight = 0;
    // first row
    let i = 0;
    if (i % 2 !== 0) {
        totalStepHeight += stepHeight;
    }

    const yGradeIndex0 = getStandardYTranslate(i, gradeWidth, margin, totalStepHeight);
    expect(yGradeIndex0).toBe(margin);

    i++;
    if (i % 2 !== 0) {
        totalStepHeight += stepHeight;
    }
    const yGradeIndex1 = getStandardYTranslate(i, gradeWidth, margin, totalStepHeight);

    expect(yGradeIndex0).toBe(yGradeIndex1 - totalStepHeight);

    i = i + 2;
    if (i % 2 !== 0) {
        totalStepHeight += stepHeight;
    }
    const expectedY = gradeWidth + ((Math.floor(i / 2) + 1) * margin) + totalStepHeight;
    const ySecondRow = getStandardYTranslate(i, gradeWidth, margin, totalStepHeight);
    expect(ySecondRow).toBe(expectedY);
});
