import { apiSlice } from '../../app/api/apiSlice';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

const blogsAdapter = createEntityAdapter({
  selectId: (blog) => blog._id,
  sortComparer: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
});
const initialState = blogsAdapter.getInitialState();

export const blogSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => '/blogs',
      transformResponse: (res) => {
        return blogsAdapter.setAll(initialState, res);
      },
      providesTags: (res, err, args) => {
        return res
          ? [
              { type: 'Blogs', id: 'LIST' },
              ...res.ids.map(({ _id }) => ({ type: 'Blogs', _id })),
            ]
          : ['Blogs'];
      },
    }),
    getBlog: builder.query({
      query: (id) => `/blogs/${id}`,
      providesTags: (res, err, args) => [{ type: 'Blogs', id: args.id }],
    }),
    addBlog: builder.mutation({
      query: (blog) => ({
        url: `/blogs`,
        method: 'post',
        body: blog,
      }),
      invalidatesTags: ['Blogs'],
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/blogs/${id}`,
        method: 'put',
        body: rest,
      }),
      invalidatesTags: (res, err, args) => [
        'Blogs',
        { type: 'Blogs', id: args.id },
      ],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Blogs'],
    }),
  }),
});

export const selectBlogsResult = blogSlice.endpoints.getBlogs.select();

export const selectBlogsData = createSelector(
  selectBlogsResult,
  (blogResult) => blogResult?.data
);

// export const selectBlogById = createSelector(
//   selectAllBlogs,
//   (state, blogId) => blogId,
//   (blogs, blogId) => blogs.find((blog) => blog._id === blogId)
// );

export const {
  selectAll: selectAllBlogs,
  selectById: selectBlogById,
  selectIds: selectBlogsIds,
  selectEntities,
} = blogsAdapter.getSelectors(
  (state) => selectBlogsData(state) ?? initialState
);

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useAddBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogSlice;
