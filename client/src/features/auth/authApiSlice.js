import { apiSlice } from '../../app/api/apiSlice';

export const authSlice = apiSlice.injectEndpoints({
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
  }),
});

export const { useSignInMutation, useSignUpMutation } = authSlice;
