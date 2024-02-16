import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useGetBlogQuery, selectBlogById } from './blogSlice';
import { formatTimestamp } from '../../utils/formatTimestamps';
import { FaEdit } from 'react-icons/fa';
import DeleteBlog from '../../components/DeleteBlog.modal';
import UpdateBlog from '../../components/UpdateBlog.modal';

import { useSelector } from 'react-redux';

function Blog() {
  const { id } = useParams();
  if (!id) return <Navigate to={'/blogs'} />;
  const blog = useSelector((state) => selectBlogById(state, id));
  const { isLoading, isError, isSuccess } = useGetBlogQuery(id);

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

        {/* Blog Modals */}
        <div className="text-lg flex space-x-2">
          <UpdateBlog id={id} blog={blog} />
          <DeleteBlog id={id} />
        </div>
        <p className="text-sm">{`Date: ${formattedDate}`}</p>
      </div>
    );
  }

  return <>{content}</>;
}

export default Blog;
