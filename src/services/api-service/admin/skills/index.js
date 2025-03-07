
import { onQueryStarted, transFormResponse, transformErrorResponse } from "@/services/api.config";
import { ENDPOINTS } from "@/store/endpoints";
import { rootApi } from "@/services/api";
import store from "@/store";
import { setExperienceLevels, setSkills } from "@/store/features/questions";

/* ------------------------------------------------------------------------------------------------------------------------------ */
/* Auth APIs */
/* ------------------------------------------------------------------------------------------------------------------------------ */

const APIS = rootApi.injectEndpoints({
  endpoints: (build) => ({

    createSkill: build.mutation({
      query: (body) => {
        return {
          url: ENDPOINTS.ADMIN.SKILLS.CREATE_SKILL,
          method: "POST",
          body,
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, true),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, true),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, true),
    }),

    updateSkill: build.mutation({
      query: ({ id, skillName }) => {
        return {
          url: `${ENDPOINTS.ADMIN.SKILLS.UPDATE_SKILL}?id=${id}`,
          method: "PATCH",
          body: { name: skillName },
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, true),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, true),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, true),
    }),

    deleteSkill: build.mutation({
      query: (body) => {
        return {
          url: `${ENDPOINTS.ADMIN.SKILLS.DELETE_SKILL}?id=${body?.id}`,
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

    getAllSkills: build.mutation({
      query: (body) => {
        return {
          url: ENDPOINTS.ADMIN.SKILLS.GET_ALL,
          method: "GET",
          body,
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

    getAllLevels: build.mutation({
      query: (body) => {
        return {
          url: ENDPOINTS.ADMIN.LEVELS.GET_ALL,
          method: "GET",
          body,
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, false),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, false, () => {
          store.dispatch(setExperienceLevels(res?.data?.data))
        }),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, false),
    }),

  }),
});
export const {
  useGetAllSkillsMutation,
  useCreateSkillMutation,
  useDeleteSkillMutation,
  useUpdateSkillMutation,
  useGetAllLevelsMutation
} = APIS;
