import { CONSTANTS } from "@/constants"


const { TEST_SECTIONS } = CONSTANTS

export const testSelector = (state) => state.test
export const testIdSelector = (state) => state.test?.testId
export const currentSectionSelector = (state) => state.test?.currentSection
export const currentQuestionSelector = (state) => {
    state.test?.currentSection
    if (state.test?.currentSection == TEST_SECTIONS.MCQ) {
        return state?.test?.testInfo?.question?.[state?.test?.currentIndex]
    } else {
        return state?.test?.testInfo?.programs?.[state?.test?.currentProgramIndex]
    }
}
