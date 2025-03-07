import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./api.config";

/* This code is creating an instance of the `createApi` function from the
`@reduxjs/toolkit/query/react` library. The `createApi` function is used to define a set of
endpoints for making API requests and generating corresponding Redux actions and reducers. */
export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
