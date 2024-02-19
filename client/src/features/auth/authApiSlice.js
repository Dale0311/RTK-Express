import { apiSlice } from '../../app/api/apiSlice';
import { logOut, setCredentials } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (creds) => ({
        url: '/auth/signin',
        method: 'post',
        body: creds,
      }),
    }),
    signUp: builder.mutation({
      query: (creds) => {
        return {
          url: '/auth/signup',
          method: 'post',
          body: creds,
        };
      },
      transformErrorResponse: (error) => {
        return error?.data?.message;
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'get',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    logOut: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'get',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useLogOutMutation } =
  authApiSlice;
