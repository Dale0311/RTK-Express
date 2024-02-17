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
        console.log('it is from the slice');
        console.log(creds);
        return {
          url: '/signup',
          method: 'post',
          body: creds,
        };
      },
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authSlice;
export const user = (state) => state.user;
