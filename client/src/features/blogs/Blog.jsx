import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useGetBlogQuery } from './blogSlice';
import { formatTimestamp } from '../../utils/formatTimestamps';
function Blog() {
  const { id } = useParams();
  const { data: blog, isLoading, isError, isSuccess } = useGetBlogQuery(id);
  if (!id) return <Navigate to={'/blogs'} />;

  // content
  let content;
  if (isLoading) content = <h1>Loading...</h1>;
  else if (isError) content = <h1>Something went wrong...</h1>;
  else if (isSuccess) {
    const formattedDate = formatTimestamp(blog.createdAt);
    content = (
      <div className="p-4 text-lg bg-slate-200 rounded space-y-2">
        <h1 className="text-xl font-bold">{blog.title}</h1>
        <p className="text-md">{blog.content}</p>
        <div className="text-sm">
          <Link to={`../edit/${id}`}>Edit blog</Link>
          <p>{`Date: ${formattedDate}`}</p>
        </div>
      </div>
    );
  }

  return <>{content}</>;
}

export default Blog;
