import { apiSlice } from '../../app/api/apiSlice';

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credetials) => ({
        url: 'foo',
        method: 'post',
        body: 'bar',
      }),
    }),
  }),
});
