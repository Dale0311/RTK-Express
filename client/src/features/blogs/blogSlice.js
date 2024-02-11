import apiSlice from '../../app/api/apiSlice';

const blogSlice = apiSlice.injectEndpoints({
  // here na me
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: '/blogs',
    }),
  }),
});
export default blogSlice;
