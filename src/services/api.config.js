import { setLoading } from "@/store/features/alerts";
import {
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";




/* This code is creating a base query function using `fetchBaseQuery` from the
`@reduxjs/toolkit/query/react` package. The `baseUrl` option is set to the value of the
`REACT_APP_API_URL` environment variable. The `prepareHeaders` option is a function that takes the
headers and the current state as arguments and returns the headers with an `authorization` header
added if there is a `user.authToken` value in the state. This base query function can be used to
make API requests with the `createApi` function from the same package. */

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.authToken;
    // const token = location.href.includes("admin") ? adminToken : userToken;

    headers.set(
      "X-CSRF-TOKEN",
      document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content") ?? "",
    );
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      // headers.set("Accept", `application/json`);
    }
    return headers;
  },
});

/**
 * This is a TypeScript function that intercepts base queries and logs out the user if the query
 * returns a 401 error.
 * @param args - The `args` parameter is the input to the `baseQueryWithInterceptor` function. It can
 * be either a string representing the URL to fetch or an object containing the URL and other options
 * for the fetch request.
 * @param api - The `api` parameter in this code refers to the `Api` object provided by the `createApi`
 * function in the `@reduxjs/toolkit/query` package. This object contains various methods and
 * properties that can be used to interact with the API, such as `dispatch`, `query`,
 * @param extraOptions - `extraOptions` is an optional object parameter that can be passed to the
 * `baseQueryWithInterceptor` function. It can contain additional options to configure the behavior of
 * the function, such as headers to be included in the request, timeout values, and more. These options
 * are specific to the implementation of
 * @returns The `baseQueryWithInterceptor` function is being returned. It is a modified version of the
 * `baseQuery` function that intercepts the response and checks if the error status is 401
 * (Unauthorized). If it is, it dispatches a `logout` action. The function then returns the result of
 * the `baseQuery` function.
 */
export const baseQueryWithInterceptor = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
  }
  return result;
};

/**
 * This function transforms a response by dispatching a loading action, executing a callback function,
 * and returning the response data.
 * @param {IResponse} res - The response object received from an API call.
 * @param {any} dispatch - `dispatch` is a function used in Redux to dispatch actions to the store. It
 * is typically provided by the `react-redux` library's `useDispatch` hook or passed down as a prop
 * from a parent component.
 * @param {boolean} dispatchLoaderAction - `dispatchLoaderAction` is a boolean parameter that
 * determines whether or not to dispatch a loading action before executing the API call. If
 * `dispatchLoaderAction` is `true`, then the `setLoading` action will be dispatched with a value of
 * `false` to indicate that the loading process has finished
 * @param [callback] - The `callback` parameter is an optional function that can be passed as an
 * argument to `transFormResponse` function. If provided, it will be executed after the
 * `setLoading(false)` function is called and before the function returns the `res.data`. It can be
 * used to perform additional actions after
 * @returns the `data` property of the `res` object passed as the first argument.
 */
export const transFormResponse = (
  res,
  dispatch,
  dispatchLoaderAction,
  callback,
) => {
  if (dispatchLoaderAction) {
    dispatch(setLoading(false));
  }
  callback && callback();
  return res;
};

/**
 * This function transforms an error response by dispatching actions and executing a callback function.
 * @param {any} res - The response object received from an API call or any other asynchronous
 * operation.
 * @param {any} dispatch - `dispatch` is a function used in Redux to dispatch actions to the store. It
 * is typically provided by the `react-redux` library's `connect` function.
 * @param {boolean} dispatchLoaderAction - A boolean flag that determines whether or not to dispatch a
 * loading action before and after the API call. If set to true, it will dispatch a loading action
 * before the API call and dispatch a loading action again after the API call is finished.
 * @param [callback] - The `callback` parameter is an optional function that can be passed as an
 * argument to the `transformErrorResponse` function. If provided, it will be executed after the error
 * response has been processed.
 * @returns The `res.error` is being returned.
 */
export const transformErrorResponse = (
  res,
  dispatch,
  dispatchLoaderAction,
  callback,
) => {
  if (dispatchLoaderAction) {
    dispatch(setLoading(false));
  }
  if (dispatchLoaderAction) dispatch(setLoading(false));
  callback && callback();
  return res?.data;
};

/**
 * This function logs a message and sets loading to true if dispatchLoaderAction is true.
 * @param {any} dispatch - The dispatch function is a method provided by the Redux store that is used
 * to dispatch actions to update the state of the application. It is typically used to trigger a state
 * change in response to user interactions or other events.
 * @param {boolean} dispatchLoaderAction - The dispatchLoaderAction parameter is a boolean value that
 * determines whether or not to dispatch a loading action before the query execution starts. If it is
 * true, the setLoading action will be dispatched to set the loading state to true. If it is false, the
 * loading state will not be changed.
 */
export const onQueryStarted = (
  dispatch,
  dispatchLoaderAction,
) => {
  if (dispatchLoaderAction) {
    dispatch(setLoading(true));
  }
};
