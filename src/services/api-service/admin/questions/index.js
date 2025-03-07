import { onQueryStarted, transFormResponse, transformErrorResponse } from "@/services/api.config";
import { ENDPOINTS } from "@/store/endpoints";
import { rootApi } from "@/services/api";
import store from "@/store";
import { objectToQueryParams } from "@/utils";
import { setJobPositions, setSkills, setTest } from "@/store/features/questions";
import { CONSTANTS } from "@/constants";
import { v4 as uuidv4 } from 'uuid';


/* ------------------------------------------------------------------------------------------------------------------------------ */
/* Question APIs */
/* ------------------------------------------------------------------------------------------------------------------------------ */
const { QUESTION_TYPES } = CONSTANTS

const APIS = rootApi.injectEndpoints({
  endpoints: (build) => ({

    // Get Question Template
    getAllQuestions: build.mutation({
      query: (body) => {
        return {
          url: `${ENDPOINTS.ADMIN.QUESTIONS.GET_ALL}?${objectToQueryParams(body)}`, // New endpoint for GET template
          method: "GET",
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, false),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, false),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, false),
    }),


    // Get Question Template
    getQuestionTemplate: build.mutation({
      query: () => {
        return {
          url: "/api/v1/admin/test/question/template", // New endpoint for GET template
          method: "GET",
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, true),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, true),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, true),
    }),

    // Upload Question File
    uploadQuestionFile: build.mutation({
      query: (formData) => {
        return {
          url: "/api/v1/admin/test/question/file", // New endpoint for file upload
          method: "POST",
          body: formData, // Assuming you're sending FormData for file uploads
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, true),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, true),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, true),
    }),

    // Create New Question
    createQuestion: build.mutation({
      query: (body) => {


        let payload = {
          skillId: body?.skillId || "",
          levelId: body?.levelId || "",
          question: body?.question || "",
          duration: parseInt(body?.duration, 10) || 0, // Ensure duration is a number
          testCases: body?.testCases?.map((item) => ({
            ...item,
            id: uuidv4()
          })),
          programmingLanguage: body?.programmingLanguage,
          type: body?.type,
          choices: [
            body?.optionA || "",
            body?.optionB || "",
            body?.optionC || "",
            body?.optionD || "",
          ]
        }

        if (body?.type == QUESTION_TYPES.QUESTION) {
          payload.answer = body.correctOption || "",
            payload.choices = [
              body?.optionA || "",
              body?.optionB || "",
              body?.optionC || "",
              body?.optionD || "",
            ]
        }

        return {
          url: ENDPOINTS.ADMIN.QUESTIONS.CREATE, // New endpoint for creating a question
          method: "POST",
          body: payload,
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, true),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, true),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, true),
    }),

    // Update Question
    updateQuestion: build.mutation({
      query: (body) => {

        let payload = {
          questionId: body?.questionId,
          skillId: body?.skillId || "",
          testCases: body?.testCases?.map((item) => ({
            ...item,
            id: !item?.id ? uuidv4() : item?.id
          })),
          programmingLanguage: body?.programmingLanguage,
          choices: [
            body?.optionA || "",
            body?.optionB || "",
            body?.optionC || "",
            body?.optionD || "",
          ],
          levelId: body?.levelId || "",
          question: body?.question || "",
          duration: parseInt(body?.duration, 10) || 0, // Ensure duration is a number
        }

        if (body?.type == QUESTION_TYPES.QUESTION) {
          payload.answer = body.correctOption || "",
            payload.choices = [
              body?.optionA || "",
              body?.optionB || "",
              body?.optionC || "",
              body?.optionD || "",
            ]
        }

        return {
          url: ENDPOINTS.ADMIN.QUESTIONS.UPDATE, // New endpoint for updating a question
          method: "PUT", // Method for update
          body: payload,
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, true),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, true),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, true),
    }),

    // Import Questions
    importQuestions: build.mutation({
      query: (body) => {

        const formData = new FormData();
        formData.append("file", body?.file)
        return {
          url: `${ENDPOINTS.ADMIN.QUESTIONS.IMPORT}?skillId=${body?.skillId}&levelId=${body?.levelId}`, // New endpoint for deleting a question, passing the ID
          method: "POST",
          body: formData
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, true),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, true),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, true),
    }),
    // Delete Question
    deleteQuestion: build.mutation({
      query: (body) => {
        return {
          url: `${ENDPOINTS.ADMIN.QUESTIONS.DELETE}?questionId=${body?.id}`, // New endpoint for deleting a question, passing the ID
          body,
          method: "DELETE",
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, false),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, false),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, false),
    }),

    // Generate TEst
    generateTest: build.mutation({
      query: (body) => {

        if (!body?.programCount) {
          body.programCount = 0
        }
        return {
          url: `${ENDPOINTS.ADMIN.QUESTIONS.GENERATE_TEST}`, // New endpoint for deleting a question, passing the ID
          method: "POST",
          body
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, true),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, true),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, true),
    }),

    // Get All Tests
    getAllTests: build.mutation({
      query: (body) => {
        return {
          url: `${ENDPOINTS.ADMIN.QUESTIONS.GET_ALL_TESTS}?${objectToQueryParams(body)}`, // New endpoint for GET template
          method: "POST",
          body
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, false),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, false),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, false),
    }),

    // Get All Tests
    getAllJobPositions: build.mutation({
      query: (body) => {
        return {
          url: `${ENDPOINTS.ADMIN.TEST.GET_ALL_JOB_POSITIONS}`, // New endpoint for GET template
          method: "GET",
          body
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, false),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, false, () => {
          console.log(res?.data, "????????");

          store.dispatch(setJobPositions(res?.data?.data))
        }),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, false),
    }),


    // Get Test Details
    getTestDetails: build.mutation({
      query: (body) => {
        return {
          url: `${ENDPOINTS.ADMIN.TEST.DETAILS}?testId=${body?.testId}`, // New endpoint for GET template
          method: "GET",
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, true),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, true, () => {
          store.dispatch(setTest(res?.data?.data))
        }),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, true),
    }),
    // Get Test Details
    getTestQuestionsPdf: build.mutation({
      query: (body) => {
        return {
          url: `${ENDPOINTS.ADMIN.TEST.VIEW_QUESTIONS_PDF}?testId = ${body?.testId} `, // New endpoint for GET template
          method: "GET",
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, true),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, true, () => {
          store.dispatch(setTest(res?.data?.data))
        }),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, true),
    }),

    // Delete Question
    deleteTest: build.mutation({
      query: (body) => {
        return {
          url: `${ENDPOINTS.ADMIN.TEST.DELETE}?testId = ${body?.id} `, // New endpoint for deleting a question, passing the ID
          method: "DELETE",
          body
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, true),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, true),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, true),
    }),


    //  Send test in mail to user
    sendTest: build.mutation({
      query: (body) => {
        return {
          url: `${ENDPOINTS.ADMIN.TEST.SEND_TEST} `, // New endpoint for deleting a question, passing the ID
          method: "POST",
          body
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, true),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, true),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, true),
    }),


    // Get All Tests
    getQuestionsCount: build.mutation({
      query: (body) => {
        return {
          url: `${ENDPOINTS.ADMIN.QUESTIONS.GET_QUESTIONS_COUNT} `, // New endpoint for GET template
          method: "GET",
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, false),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, false, () => {
          store.dispatch(setSkills(res?.data?.data))
        }),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, false),
    }),


    //  compile code
    compileCode: build.mutation({
      query: (body) => {
        return {
          url: ENDPOINTS.USER.COMPILER, // New endpoint for deleting a question, passing the ID
          method: "POST",
          body
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, false),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, false),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, false),
    }),

    //  compile code
    addBehaviourWarning: build.mutation({
      query: (body) => {
        return {
          url: ENDPOINTS.USER.ADD_BEHAVIOUR_WARNING, // New endpoint for deleting a question, passing the ID
          method: "POST",
          body
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, false),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, false),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, false),
    }),

  }),
});

export const {
  useGetAllQuestionsMutation,
  useGetQuestionMutation,
  useUploadQuestionFileMutation,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useImportQuestionsMutation,
  useGenerateTestMutation,
  useGetAllTestsMutation,
  useDeleteTestMutation,
  useGetTestDetailsMutation,
  useGetTestQuestionsPdfMutation,
  useSendTestMutation,
  useGetQuestionsCountMutation,
  useCompileCodeMutation,
  useAddBehaviourWarningMutation,
  useGetAllJobPositionsMutation

} = APIS;
