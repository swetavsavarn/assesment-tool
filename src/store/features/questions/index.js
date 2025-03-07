import { getSkillId } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  skills: [
  ],
  experienceLevels: [],
  questions: [],
  question: {},
  test: {},
  feedback: {},
  avgRatings: {},
  dashboardData: {},
  jobPositions: []
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    // Set skills from payload
    setSkills(state, action) {
      state.skills = action.payload;
    },
    // Set experience levels
    setExperienceLevels(state, action) {
      state.experienceLevels = action.payload;
    },
    // Set questions
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    // Set a single question
    setQuestion(state, action) {
      state.question = action.payload;
    },
    // Add a new skill
    addSkill(state, action) {
      state.skills.push({
        ...action.payload, skillName: action.payload.name, skillId: action.payload.id, levels: state.experienceLevels?.map((level) => ({
          "levelId": level?.id,
          "levelName": level?.levelName || level?.name || level?.title,
          "noOfQuestions": 0
        }))
      }); // Add the new skill
    },
    // Edit an existing skill by ID
    editSkill(state, action) {
      const { id, name } = action.payload;
      const existingSkill = state.skills.find(skill => (skill.skillId || skill?.id) === id);
      if (existingSkill) {
        existingSkill.name = name; // Update the skill name
      }
    },
    // Delete a skill by ID
    removeSkill(state, action) {
      const idsToRemove = Array.isArray(action.payload) ? action.payload : [action.payload];
      state.skills = state.skills.filter(skill => !idsToRemove.includes(getSkillId(skill)));
    },
    // Set a single question
    setTest(state, action) {
      state.test = action.payload;
    },
    // Set a single feedback
    setFeedback(state, action) {
      state.feedback = action.payload;
    },

    setAvgRatings(state, action) {
      state.avgRatings = action.payload;
    },
    setDashboardData(state, action) {
      state.dashboardData = action.payload
    },
    setJobPositions(state, action) {
      state.jobPositions = action.payload
    },
  },
});

export default questionsSlice.reducer;
export const {
  setSkills,
  setExperienceLevels,
  setQuestions,
  setQuestion,
  addSkill,
  editSkill,
  removeSkill,
  setTest,
  setFeedback,
  setAvgRatings,
  setDashboardData,
  setJobPositions
} = questionsSlice.actions;
