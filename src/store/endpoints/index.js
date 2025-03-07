export const ENDPOINTS = {
  ADMIN: {
    AUTH: {
      LOGIN: "/api/v1/admin/auth/login"
    },
    SKILLS: {
      GET_ALL: "/api/v1/admin/test/skill/all",
      CREATE_SKILL: "/api/v1/admin/test/skill",
      DELETE_SKILL: "/api/v1/admin/test/skill",
      UPDATE_SKILL: "/api/v1/admin/test/skill"
    },
    TEMPLATE: {
      GET_ALL_PAGINATION: "/api/v1/admin/test/template/all",
      GET_ALL: "/api/v1/admin/test/template/get-all",
      GET_TEMPLATE: "/api/v1/admin/test/skill",
      DELETE: "/api/v1/admin/test/template",
      GENERATE_TEST_FROM_TEMPLATE: "/api/v1/admin/test/generate-from-template",
      PDF: "/api/v1/admin/test/template/pdf",
      EDIT_TEMPLATE: "/api/v1/admin/test/template",
    },
    LEVELS: {
      GET_ALL: "/api/v1/admin/test/level/all"
    },
    QUESTIONS: {
      GET_ALL: "/api/v1/admin/test/question",
      GET_TEMPLATE: "/api/v1/admin/test/question/template",
      UPLOAD_FILE: "/api/v1/admin/test/question/file",
      CREATE: "/api/v1/admin/test/question",
      UPDATE: "/api/v1/admin/test/question",
      DELETE: "/api/v1/admin/test/question",
      GET: "/api/v1/admin/test/question",
      IMPORT: "/api/v1/admin/test/question/file",
      GENERATE_TEST: "/api/v1/admin/test/generate",
      GET_ALL_TESTS: "/api/v1/admin/test/all",
      GET_QUESTIONS_COUNT: "/api/v1/admin/test/skill/all/question/count"
    },
    TEST: {
      DELETE: "/api/v1/admin/test",
      DETAILS: "/api/v1/admin/test/details",
      VIEW_QUESTIONS_PDF: "/api/v1/admin/test/pdf/questions",
      SEND_TEST: "/api/v1/admin/test/details/email",
      TEST_RESULT_PDF: "/api/v1/admin/test/pdf/candidate/response",
      GET_ALL_JOB_POSITIONS: "/api/v1/admin/test/positions"
    },
    FEEDBACKS: {
      GET_ALL: "/api/v1/admin/test/feedback/all",
      DELETE: "/api/v1/admin/test/feedback",
      GET_AVG: "/api/v1/admin/test/feedback/rating/avg"
    },
    DASHBOARD: {
      GET_DATA: "/api/v1/admin/test/dashboard"
    }
  },
  USER: {
    AUTH: {
      LOGIN: "/api/v1/candidate/auth/login"
    },
    COMPILER: "/api/v1/compiler",
    ADD_BEHAVIOUR_WARNING: "/api/v1/candidate/detail/behaviorWarning",
  }
};
