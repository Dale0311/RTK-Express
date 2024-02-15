import React from 'react';
import {
  useGetBlogsQuery,
  selectBlogsIds,
  selectAllBlogs,
  selectEntities,
} from './blogSlice';
import BlogExcerpt from './BlogExcerpt';
import { useSelector } from 'react-redux';
function BlogList() {
  const { isLoading, isSuccess, isError, error } = useGetBlogsQuery();
  const blogIds = useSelector(selectBlogsIds);
  const blogs = useSelector(selectAllBlogs);
  const blogsEntities = useSelector(selectEntities);
  let content;

  if (isLoading) {
    content = <h1>Loading...</h1>;
  } else if (isError) {
    content = <h1>Error: {error}</h1>;
  } else if (isSuccess) {
    content = (
      <div className='className="flex flex-col space-y-3"'>
        {blogIds?.map((id) => {
          return <BlogExcerpt key={id} id={id} />;
        })}
      </div>
      // <div className='className="flex flex-col space-y-3"'>
      //   {blogList?.map((blog) => {
      //     return <BlogExcerpt key={blog._id} blog={blog} />;
      //   })}
      // </div>
    );
  }
  return <>{content}</>;
}

export default BlogList;
