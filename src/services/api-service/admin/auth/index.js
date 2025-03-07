
import { onQueryStarted, transFormResponse, transformErrorResponse } from "@/services/api.config";
import { ENDPOINTS } from "@/store/endpoints";
import { rootApi } from "@/services/api";
import store from "@/store";

/* ------------------------------------------------------------------------------------------------------------------------------ */
/* Auth APIs */
/* ------------------------------------------------------------------------------------------------------------------------------ */

const APIS = rootApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => {
        return {
          url: `${ENDPOINTS.ADMIN.AUTH.LOGIN}`, // New endpoint for deleting a question, passing the ID
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
  useLoginMutation,
} = APIS;
