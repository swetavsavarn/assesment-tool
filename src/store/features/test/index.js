import { programs, questions } from "@/app/mocks/questions";
import { CONSTANTS } from "@/constants";
import { SOCKET_EVENTS } from "@/lib/socket/events";
import { fireEventWithAck, getCurrentQuestion, isDebugMode } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
const { TEST_SECTIONS } = CONSTANTS
const initialState = {
  permissions: [
    {
      step: 1,
      title: "System Compatibility",
      description:
        "Please make sure your system has a microphone and a camera. Disable any interfering software like Grammar or Spell check plugins.",
      status: "pending", // "completed", "pending", "error"
    },
    {
      step: 2,
      title: "Webcam & Audio Permissions",
      description:
        "Please allow access to your webcam and microphone to proceed.",
      status: "pending",
    },
    {
      step: 3,
      title: "Screen Permissions",
      description:
        "Please ensure you share your entire screen for the test to work properly.",
      status: "pending",
      button: true
    },
  ],
  stream: null, // Store the stream or any related data
  testInfo: {
    maxAllowedWarning: 0,
    question: !isDebugMode() ? [] : questions,
    programs: !isDebugMode() ? [] : programs,
    testStartTime: null,
    testTotalDuration: null,
    warning: 0,
    behaviorWarning: 0,
    sectionsCount: 1
  },
  currentSection: TEST_SECTIONS?.MCQ,
  testId: null,
  currentIndex: 0,
  currentProgramIndex: 0,
  currentQuestion: {},
  nextBtnDisabled: false,
  prevBtnDisabled: true,
  startRecording: false,
  isFullScreen: false
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {

    setTestInfo(state, action) {
      state.testInfo = {
        ...state.testInfo,  // Keep existing properties
        ...action.payload    // Merge new properties
      };
      state.currentIndex = action?.payload?.currentIndex ?? 0
      state.currentQuestion = action.payload.question[action.payload.currentIndex]
    },
    setPermission(state, action) {
      const { step, status } = action.payload;
      state.permissions = state.permissions.map((permission) =>
        permission.step === step ? { ...permission, status } : permission
      );
    },
    setStream: (state, action) => {
      state.stream = action.payload;
    },
    clearStream: (state) => {
      state.stream = null;
    },
    nextQuestion: (state, action) => {

      if (state.currentSection == TEST_SECTIONS.MCQ) {

        let currentQuestion = getCurrentQuestion(state)
        if (currentQuestion.choiceMade == "" && currentQuestion.status !== "review") {
          currentQuestion.status = "skipped";
          fireEventWithAck(action.payload.socket, {
            eventName: SOCKET_EVENTS.ADD_QUESTION_STATUS,
            payload: {
              testId: state?.testId,
              questionStatus: {
                [currentQuestion?.id]: "skipped"
              }
            }
          })
        }
        if (state.currentIndex == state.testInfo.question.length - 1) {
          state.currentSection = TEST_SECTIONS.PROGRAM
          state.currentProgramIndex = 0;
        } else {
          state.currentIndex += 1;
          state.prevBtnDisabled = false
        }

        if (state.testInfo.sectionsCount == 1) {
          state.nextBtnDisabled = state.currentIndex == state.testInfo.question.length - 1;
          state.prevBtnDisabled = state.currentIndex == 0;
        } else {
          state.prevBtnDisabled = state.currentIndex == 0;
          state.nextBtnDisabled = false;
        }



      } else if (state.currentSection == TEST_SECTIONS.PROGRAM) {
        if (state.currentProgramIndex == state.testInfo.programs.length - 1) {

        } else {
          let currentQuestion = getCurrentQuestion(state)
          if (currentQuestion.status !== "review" && currentQuestion.status !== "attempted") {
            currentQuestion.status = "skipped";
            fireEventWithAck(action.payload.socket, {
              eventName: SOCKET_EVENTS.ADD_QUESTION_STATUS,
              payload: {
                testId: state?.testId,
                questionStatus: {
                  [currentQuestion?.id]: "skipped"
                }
              }
            })
          }
          state.currentProgramIndex += 1;
        }
        state.nextBtnDisabled = state.currentProgramIndex === state?.testInfo?.programs.length - 1
      }
      state.prevBtnDisabled = false;

      // state.nextBtnDisabled = state.currentIndex === state?.testInfo?.question.length - 1;
      // state.prevBtnDisabled = state.currentIndex === 0;
    },
    prevQuestion: (state, action) => {
      if (state.currentSection == TEST_SECTIONS.MCQ) {
        if (state.currentIndex == 0) {
          state.prevBtnDisabled = false
        } else {
          const currentQuestion = getCurrentQuestion(state)
          if (currentQuestion.choiceMade == "" && currentQuestion.status !== "review") {
            currentQuestion.status = "skipped"
            fireEventWithAck(action.payload.socket, {
              eventName: SOCKET_EVENTS.ADD_QUESTION_STATUS,
              payload: {
                testId: state?.testId,
                questionStatus: {
                  [currentQuestion?.id]: "skipped"
                }
              }
            })
          }
          state.currentIndex -= 1;
          state.currentQuestion = state.testInfo?.question?.[state.currentIndex];
        }

        if (state.testInfo.sectionsCount == 1) {
          state.nextBtnDisabled = state.currentIndex == state.testInfo.question.length - 1;
          state.prevBtnDisabled = state.currentIndex == 0;
        } else {
          state.prevBtnDisabled = state.currentIndex == 0;
          state.nextBtnDisabled = false;
        }



      } else if (state.currentSection == TEST_SECTIONS.PROGRAM) {
        if (state.currentProgramIndex == 0) {
          state.currentSection = TEST_SECTIONS.MCQ;
          if (state.currentIndex == 0) {
            state.prevBtnDisabled = true;
          }
          state.nextBtnDisabled = false;
        } else {
          const currentQuestion = getCurrentQuestion(state)
          if (currentQuestion.status !== "review" && currentQuestion.status !== "attempted") {
            currentQuestion.status = "skipped"
            fireEventWithAck(action.payload.socket, {
              eventName: SOCKET_EVENTS.ADD_QUESTION_STATUS,
              payload: {
                testId: state?.testId,
                questionStatus: {
                  [currentQuestion?.id]: "skipped"
                }
              }
            })
          }
          state.currentProgramIndex -= 1;
          state.prevBtnDisabled = false;
          state.nextBtnDisabled = false;
        }

      }
      // state.nextBtnDisabled = state.currentIndex === state?.testInfo?.question.length - 1;
      // state.prevBtnDisabled = state.currentIndex === 0;
    },
    goToQuestion: (state, action) => {

      const index = action.payload.idx;


      if (state.currentSection == TEST_SECTIONS.MCQ) {

        console.log(state.testInfo?.question, " state.testInfo?.question>>>");

        if (index >= 0 && index < state.testInfo?.question.length) {
          if (index > state.currentIndex) {
            let payload = []
            for (let i = state.currentIndex; i < index; i++) {
              if (state.testInfo.question[i].choiceMade == "" && state.testInfo.question[i].status !== "review") {
                state.testInfo.question[i].status = "skipped";
                payload.push({
                  [state.testInfo.question[i]?.id]: "skipped"
                })
              }
            }

            fireEventWithAck(action.payload.socket, {
              eventName: SOCKET_EVENTS.ADD_QUESTION_STATUS,
              payload: {
                testId: state?.testId,
                questionStatus: payload
              }
            })

          } else {
            if (state.testInfo.question[state.currentIndex].choiceMade == "" && state.testInfo.question[state.currentIndex].status !== "review") {
              state.testInfo.question[state.currentIndex].status = "skipped";
              fireEventWithAck(action.payload.socket, {
                eventName: SOCKET_EVENTS.ADD_QUESTION_STATUS,
                payload: {
                  testId: state?.testId,
                  questionStatus: {
                    [state.testInfo.question[state.currentIndex]?.id]: "skipped"
                  }
                }
              })
            }
          }

          state.currentIndex = index;
          state.currentQuestion = state.testInfo?.question[state.currentIndex];
        }

        if (state.testInfo.sectionsCount == 1) {
          state.nextBtnDisabled = state.currentIndex == state.testInfo.question.length - 1;
          state.prevBtnDisabled = state.currentIndex == 0;
        } else {
          state.prevBtnDisabled = state.currentIndex == 0;
          state.nextBtnDisabled = false;
        }


      } else if (state.currentSection == TEST_SECTIONS.PROGRAM) {

        const currentQuestion = getCurrentQuestion(state)

        if (index >= 0 && index < state.testInfo?.programs.length) {
          if (index > state.currentProgramIndex) {
            let payload = []
            for (let i = state.currentProgramIndex; i < index; i++) {
              if (state.testInfo.programs[i].status !== "review" && state.testInfo.programs[i].status !== "attempted") {
                state.testInfo.programs[i].status = "skipped";
                payload.push({
                  [state.testInfo.programs[i]?.id]: "skipped"
                })
              }
            }

            fireEventWithAck(action.payload.socket, {
              eventName: SOCKET_EVENTS.ADD_QUESTION_STATUS,
              payload: {
                testId: state?.testId,
                questionStatus: payload
              }
            })

          } else {
            if (state.testInfo.programs[state.currentProgramIndex].status !== "review" && state.testInfo.programs[state.currentProgramIndex].status !== "attempted") {
              state.testInfo.programs[state.currentProgramIndex].status = "skipped";
              fireEventWithAck(action.payload.socket, {
                eventName: SOCKET_EVENTS.ADD_QUESTION_STATUS,
                payload: {
                  testId: state?.testId,
                  questionStatus: {
                    [state.testInfo.programs[state.currentProgramIndex]?.id]: "skipped"
                  }
                }
              })
            }
          }
          state.currentProgramIndex = index;
          state.nextBtnDisabled = state.currentProgramIndex == state.testInfo.programs.length - 1;
          state.prevBtnDisabled = false
        }

      }


    },
    revisitLater: (state) => {
      // const currentQuestion = state.testInfo.question[state.currentIndex];
      const currentQuestion = getCurrentQuestion(state)

      if (state.currentSection == TEST_SECTIONS.MCQ) {
        if (currentQuestion.status === "review") {
          if (currentQuestion.choiceMade !== "") {
            currentQuestion.status = "attempted"
          } else {
            currentQuestion.status = ""
          }
        } else {
          currentQuestion.status = currentQuestion.status === "review" ? "" : "review";
        }
      } else if (state.currentSection == TEST_SECTIONS.PROGRAM) {
        if (currentQuestion.status === "review") {
          if (currentQuestion.isChanged) {
            currentQuestion.status = "attempted"
          } else {
            currentQuestion.status = ""
          }
        } else {
          currentQuestion.status = currentQuestion.status === "review" ? "" : "review";
        }
      }



    },

    markAsAttempted: (state) => {
      const currentQuestion = getCurrentQuestion(state)
      // Toggle the "review" status
      if (currentQuestion.status !== "review")
        currentQuestion.status = "attempted"

    },

    chooseAnswer: (state, action) => {
      const { questionId, selectedIndex } = action.payload;

      const question = state.testInfo.question.find((q) => q.id === questionId);
      if (question) {
        question.choiceMade = selectedIndex; // Set the selected answer
      }
    },
    clearResponse: (state, action) => {
      const questionIndex = state.currentIndex // Index of the question to clear
      if (questionIndex >= 0 && questionIndex < state?.testInfo?.question.length) {
        state.testInfo.question[questionIndex].choiceMade = ""; // Clear the answer
        if (state.testInfo.question[questionIndex].status != "review" && state.testInfo.question[questionIndex].status != "skipped") {
          state.testInfo.question[questionIndex].status = ""; // Clear the answer
          fireEventWithAck(action.payload.socket, {
            eventName: SOCKET_EVENTS.ADD_QUESTION_STATUS,
            payload: {
              questionStatus: {
                [state.testInfo.question[questionIndex]?.id]: ""
              }
            }
          })
        }

      }
    },

    finishTest: (state, action) => {

      let payload = []
      for (let index = 0; index < state.testInfo.question.length; index++) {
        const element = state.testInfo.question[index];

        if (element.choiceMade == "" && element.status !== "review" && element.status !== "skipped") {

          state.testInfo.question[index].status = "skipped";
          payload.push({
            [state.testInfo.question[state.currentIndex]?.id]: "skipped"
          })
        }
      }

      for (let index = 0; index < state.testInfo.programs.length; index++) {
        const element = state.testInfo.programs[index];

        if (element.status !== "review" && element.status !== "skipped" && element.status !== "attempted") {

          state.testInfo.programs[index].status = "skipped";
          payload.push({
            [state.testInfo.programs[state.currentProgramIndex]?.id]: "skipped"
          })
        }
      }

      fireEventWithAck(action.payload.socket, {
        eventName: SOCKET_EVENTS.ADD_QUESTION_STATUS,
        payload: {
          testId: state?.testId,
          questionStatus: payload
        }
      })

    },
    setStartRecording: (state, action) => {
      state.startRecording = action.payload
    },
    setTestId(state, action) {
      state.testId = action.payload
    },
    updateWarnings(state, action) {
      state.testInfo = {
        ...state.testInfo,
        warning: action?.payload?.warning,
        maxAllowedWarning: action?.payload?.maxAllowedWarning,
      }
    },
    setIsFullScreen(state, action) {
      state.isFullScreen = action?.payload
    },
    setCurrentQuestion(state, action) {
      state.currentQuestion = action?.payload
    },
    setCurrentSection(state, action) {
      if (action.payload == TEST_SECTIONS.MCQ) {
        if (state.currentIndex == 0) {
          state.prevBtnDisabled = true
          state.nextBtnDisabled = false
        } else {
          state.prevBtnDisabled = false
          state.nextBtnDisabled = false
        }
      } else if (action.payload == TEST_SECTIONS.PROGRAM) {
        state.prevBtnDisabled = false;
        if (state.currentProgramIndex == state.testInfo.programs.length - 1) {
          state.nextBtnDisabled = true
        }
      }

      state.currentSection = action?.payload
    },

    updateProgramTestCases: (state, action) => {

      const program = state.testInfo.programs[state.currentProgramIndex];
      if (program)
        program.testCases = action.payload
    },

    updateProgram: (state, action) => {
      const program = state.testInfo.programs[state.currentProgramIndex];
      if (program)
        program.userInput = action.payload
    },
    updateProgramError: (state, action) => {
      const program = state.testInfo.programs[state.currentProgramIndex];
      if (program)
        program.error = action.payload
    },

    updateIsCodeChanged: (state, action) => {
      const program = state.testInfo.programs[state.currentProgramIndex];
      if (program)
        program.isChanged = action.payload
    },

    setLoadingTestCases: (state, action) => {
      const program = state.testInfo.programs.find((question) => question.id == action.payload.id);
      if (program)
        program.loading = action.payload.loading
    },
    updateBehaviorWarning: (state, action) => {
      state.testInfo.behaviorWarning = action.payload
    },
    setSectionsCount: (state, action) => {
      state.testInfo.sectionsCount = action.payload
    },
  },
});

export default testSlice.reducer;
export const { setLoadingTestCases, setCurrentQuestion, setTestInfo, finishTest, nextQuestion, prevQuestion, goToQuestion, revisitLater, markAsAttempted, chooseAnswer, clearResponse, setTestId, updateWarnings, setIsFullScreen, setCurrentSection, updateProgramTestCases, updateProgram, updateProgramError, updateIsCodeChanged, updateBehaviorWarning, setSectionsCount } = testSlice.actions;