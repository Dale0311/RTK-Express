import { apiSlice } from '../../app/api/apiSlice';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

// const blogsAdapter = createEntityAdapter({
//   sortComparer: (a, b) => a.title.localeCompare(b.title),
// });
// const initialState = blogsAdapter.getInitialState();
export const blogSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => '/blogs',
      providesTags: (result, error, arg) => [
        { type: 'Blogs', id: 'LIST' },
        ...result.map((id) => {
          return { type: 'Blogs', id };
        }),
      ],
    }),
  }),
});

export const { useGetBlogsQuery } = blogSlice;

// export const selectBlogsResult = blogSlice.endpoints.getBlogs.select();

// // Creates memoized selector
// const selectBlogsData = createSelector(
//   selectBlogsResult,
//   (blogsResult) => blogsResult.data // normalized state object with ids & entities
// );

// export const {
//   selectAll: selectAllBlogs,
//   selectById: selectBlogById,
//   selectIds: selectBlogIds,
//   // Pass in a selector that returns the posts slice of state
// } = blogsAdapter.getSelectors(
//   (state) => selectBlogsData(state) ?? initialState
// );
