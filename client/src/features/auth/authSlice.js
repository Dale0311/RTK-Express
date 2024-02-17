import { apiSlice } from '../../app/api/apiSlice';

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (creds) => ({
        url: 'foo',
        method: 'post',
        body: 'bar',
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
      transformErrorResponse: (err) => {
        return err.data;
      },
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authSlice;
