import React from 'react';
import { useGetBlogsQuery, selectAllBlogs } from './blogSlice';
import BlogExcerpt from './BlogExcerpt';
import { useSelector } from 'react-redux';
function BlogList() {
  const blogList = useSelector(selectAllBlogs);
  const { isLoading, isSuccess, isError, error } = useGetBlogsQuery();
  let content;

  if (isLoading) {
    content = <h1>Loading...</h1>;
  } else if (isError) {
    content = <h1>Error: {error}</h1>;
  } else if (isSuccess) {
    content = (
      <div className='className="flex flex-col space-y-3"'>
        {blogList?.map((blog) => {
          return <BlogExcerpt key={blog.id} blog={blog} />;
        })}
      </div>
    );
  }
  return <>{content}</>;
}

export default BlogList;
