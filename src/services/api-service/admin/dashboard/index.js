import { onQueryStarted, transFormResponse, transformErrorResponse } from "@/services/api.config";
import { ENDPOINTS } from "@/store/endpoints";
import { rootApi } from "@/services/api";
import store from "@/store";
import { objectToQueryParams } from "@/utils";
import { setDashboardData } from "@/store/features/questions";


/* ------------------------------------------------------------------------------------------------------------------------------ */
/* Question APIs */
/* ------------------------------------------------------------------------------------------------------------------------------ */

const APIS = rootApi.injectEndpoints({
  endpoints: (build) => ({

    // Get Question Template
    getDashboardData: build.mutation({
      query: (body) => {
        return {
          url: `${ENDPOINTS.ADMIN.DASHBOARD.GET_DATA}`, // New endpoint for GET template
          method: "GET",
        };
      },
      onQueryStarted: () => onQueryStarted(store.dispatch, false),
      transformResponse: (res) =>
        transFormResponse(res, store.dispatch, false, () => {
          store.dispatch(setDashboardData(res?.data?.data))
        }),
      transformErrorResponse: (res) =>
        transformErrorResponse(res, store.dispatch, false),
    }),
  }),
});

export const {
  useGetDashboardDataMutation
} = APIS;
