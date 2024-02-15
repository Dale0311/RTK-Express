import { apiSlice } from '../../app/api/apiSlice';
import { createSelector } from '@reduxjs/toolkit';

export const blogSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => '/blogs',
      transformResponse: (res) => {
        const orderedRes = res
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((blog) => {
            const { _id, ...res } = blog;
            return { ...res, id: _id };
          });
        return orderedRes;
      },
      providesTags: (res, err, args) => {
        return res
          ? [
              { type: 'Blogs', id: 'LIST' },
              ...res.map(({ id }) => ({ type: 'Blogs', id })),
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

export const selectAllBlogs = createSelector(
  selectBlogsResult,
  (blogResult) => blogResult?.data ?? []
);

export const selectBlogById = createSelector(
  selectAllBlogs,
  (state, blogId) => blogId,
  (blogs, blogId) => blogs.find((blog) => blog.id === blogId)
);
export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useAddBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogSlice;
