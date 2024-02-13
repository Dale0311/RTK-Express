import { apiSlice } from '../../app/api/apiSlice';

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


