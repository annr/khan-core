import {
    DOUBLE_COLUMN_BREAKPOINT,
    getGradeWidth,
    get1ColYTranslate,
    getXTranslate,
    get2ColYTranslate
} from './responsiveLayout';

test("getGradeWidth returns some if windowWidth is DOUBLE_COLUMN_BREAKPOINT", () => {
    const margin = 30;
    const windowWidth = DOUBLE_COLUMN_BREAKPOINT;
    const gradeWidth = getGradeWidth(windowWidth, margin);
    const expectedGradeWidth = 595;
    expect(gradeWidth).toBe(expectedGradeWidth);
});

test("getGradeWidth returns some value if windowWidth is above DOUBLE_COLUMN_BREAKPOINT", () => {
    const margin = 30;
    const windowWidth = DOUBLE_COLUMN_BREAKPOINT + 1000;
    const gradeWidth = getGradeWidth(windowWidth, margin);
    const expectedGradeWidth = 1095;
    expect(gradeWidth).toBe(expectedGradeWidth);
});

test("getXTranslate returns margin value for even indexes (left column) and gradeWidth + (marin * 2) for odd", () => {
    const margin = 30;
    const gradeWidth = 560;
    // 0 is the first index and should be considered even
    const xEven = getXTranslate(0, gradeWidth, margin);
    expect(xEven).toBe(margin);
    const xOdd = getXTranslate(1, gradeWidth, margin);
    const expectedXOdd = (margin * 2) + gradeWidth;
    expect(xOdd).toBe(expectedXOdd);
});

test("get1ColYTranslate returns gradeWidth * rows", () => {
    // (Math.floor(i / 2) * gradeWidth) + totalVerticalMargin + totalStepHeight;
    const gradeWidth = 560;
    let i = 0;
    const yGradeIndex0 = get1ColYTranslate(i, gradeWidth);
    expect(yGradeIndex0).toBe(0);
    i = 5;
    const yGradeIndex5 = get1ColYTranslate(i, gradeWidth);
    expect(yGradeIndex5).toBe(gradeWidth * i);
});

test("get2ColYTranslate returns (gradeWidth * rows) + totalVerticalHeight and totalStepHeight", () => {
    // (Math.floor(i / 2) * gradeWidth) + totalVerticalMargin + totalStepHeight;
    const margin = 30;
    const gradeWidth = 560;
    const stepHeight = 12;
    let totalStepHeight = 0;
    // first row
    let i = 0;
    if (i % 2 !== 0) {
        totalStepHeight += stepHeight;
    }

    const yGradeIndex0 = get2ColYTranslate(i, gradeWidth, margin, totalStepHeight);
    expect(yGradeIndex0).toBe(margin);

    i++;
    if (i % 2 !== 0) {
        totalStepHeight += stepHeight;
    }
    const yGradeIndex1 = get2ColYTranslate(i, gradeWidth, margin, totalStepHeight);

    expect(yGradeIndex0).toBe(yGradeIndex1 - totalStepHeight);

    i = i + 2;
    if (i % 2 !== 0) {
        totalStepHeight += stepHeight;
    }
    const expectedY = (gradeWidth - stepHeight) + ((Math.floor(i / 2) + 1) * margin) + totalStepHeight;
    const ySecondRow = get2ColYTranslate(i, gradeWidth, margin, totalStepHeight);
    expect(ySecondRow).toBe(expectedY);
});
