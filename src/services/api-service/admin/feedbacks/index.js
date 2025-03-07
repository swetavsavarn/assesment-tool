import { onQueryStarted, transFormResponse, transformErrorResponse } from "@/services/api.config";
import { ENDPOINTS } from "@/store/endpoints";
import { rootApi } from "@/services/api";
import store from "@/store";
import { objectToQueryParams } from "@/utils";
import { setAvgRatings, setTest } from "@/store/features/questions";

/* ------------------------------------------------------------------------------------------------------------------------------ */
/* Question APIs */
/* ------------------------------------------------------------------------------------------------------------------------------ */

const APIS = rootApi.injectEndpoints({
  endpoints: (build) => ({

    // Get Question Template
    getAllFeedbacks: build.mutation({
      query: (body) => {
        return {
          url: `${ENDPOINTS.ADMIN.FEEDBACKS.GET_ALL}?${objectToQueryParams(body)}`, // New endpoint for GET template
          method: "GET",
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, false),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, false),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, false),
    }),

    // Get average rating
    getAvgRating: build.mutation({
      query: () => {
        return {
          url: `${ENDPOINTS.ADMIN.FEEDBACKS.GET_AVG}`, // New endpoint for GET template
          method: "GET",
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, false),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, false, () => {
          store.dispatch(setAvgRatings(res?.data?.data))
        }),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, false),
    }),


    // Delete Question
    deleteFeedback: build.mutation({
      query: (body) => {
        return {
          url: `${ENDPOINTS.ADMIN.FEEDBACKS.DELETE}?id=${body?.id}`, // New endpoint for deleting a question, passing the ID
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


  }),
});

export const {
  useGetAllFeedbacksMutation,
  useDeleteFeedbackMutation,
  useGetAvgRatingMutation

} = APIS;
