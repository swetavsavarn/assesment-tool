
import { onQueryStarted, transFormResponse, transformErrorResponse } from "@/services/api.config";
import { ENDPOINTS } from "@/store/endpoints";
import { rootApi } from "@/services/api";
import store from "@/store";
import { setExperienceLevels, setSkills } from "@/store/features/questions";
import { objectToQueryParams } from "@/utils";
import { setAllTemplates } from "@/store/features/templates";

/* ------------------------------------------------------------------------------------------------------------------------------ */
/* Auth APIs */
/* ------------------------------------------------------------------------------------------------------------------------------ */

const APIS = rootApi.injectEndpoints({
  endpoints: (build) => ({


    // Get All Templates
    getAllTemplatesPagination: build.mutation({
      query: (body) => {
        return {
          url: `${ENDPOINTS.ADMIN.TEMPLATE.GET_ALL_PAGINATION}?${objectToQueryParams(body)}`, // New endpoint for GET template
          method: "GET",
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, false),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, false),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, false),
    }),

    // Get All Templates
    getAllTemplates: build.mutation({
      query: (body) => {
        return {
          url: `${ENDPOINTS.ADMIN.TEMPLATE.GET_ALL}`, // New endpoint for GET template
          method: "GET",
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, false),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, false, () => {
          store.dispatch(setAllTemplates(res?.data?.data))
        }),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, false),
    }),



    // Get All Templates
    generateTestFromTemplate: build.mutation({
      query: (body) => {
        return {
          url: `${ENDPOINTS.ADMIN.TEMPLATE.GENERATE_TEST_FROM_TEMPLATE}`, // New endpoint for GET template
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


    // delete templates
    deleteTemplate: build.mutation({
      query: (body) => {
        return {
          url: `${ENDPOINTS.ADMIN.TEMPLATE.DELETE}?id=${body?.id}`,
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

    // Edit Template
    editTemplate: build.mutation({
      query: (body) => {
        return {
          url: `${ENDPOINTS.ADMIN.TEMPLATE.EDIT_TEMPLATE}`, // New endpoint for GET template
          method: "PATCH",
          body
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, true),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, true),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, true),
    }),


  }),
});
export const {
  useGetAllTemplatesPaginationMutation,
  useGetAllTemplatesMutation,
  useGetTemplateMutation,
  useDeleteTemplateMutation,
  useGenerateTestFromTemplateMutation,
  useEditTemplateMutation
} = APIS;
