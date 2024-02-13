import { apiSlice } from '../../app/api/apiSlice';

export const blogSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => '/blogs',
    }),
    getBlog: builder.query({
      query: (id) => `/blogs/${id}`,
    }),
    addBlog: builder.mutation({
      query: (blog) => {
        url: '/blogs';
        method: 'POST';
        body: blog;
      },
      invalidatesTags: ['Blogs'],
    }),
    updateBlog: builder.mutation({
      query: (blog) => {
        url: `/blogs/${blog._id}`;
        method: 'PUT';
        body: blog;
      },
      invalidatesTags: ['Blogs'],
    }),
    deleteBlog: builder.mutation({
      query: (id) => {
        url: `/blogs/${id}`;
        method: 'DELETE';
      },
      invalidatesTags: ['Blogs'],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useAddBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogSlice;
