import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { useGetBlogQuery, useUpdateBlogMutation } from './blogSlice';
import React, { useState, useEffect } from 'react';
function EditBlog() {
  const { id } = useParams();
  const { data: blog, isLoading, isError, isSuccess } = useGetBlogQuery(id);
  const [updateBlog] = useUpdateBlogMutation();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');

  useEffect(() => {
    setTitle(blog?.title || '');
    setBlogContent(blog?.content || '');
  }, [blog]);

  const onUpdateClick = async () => {
    try {
      await updateBlog({ id, title, content: blogContent });
      setTitle('');
      setBlogContent('');
      navigate(`/blogs/${id}`);
    } catch (error) {
      console.log(error, 'something went wrong');
    }
  };

  if (!id) return <Navigate to={'/blogs'} />;
  if (isLoading) return <h1>Loading...</h1>;
  else if (isError) return <h1>Something went wrong...</h1>;

  return (
    <div className="p-4 text-lg bg-slate-200 rounded space-y-2 flex flex-col">
      <input
        className="text-xl font-bold"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="text-md"
        value={blogContent}
        onChange={(e) => setBlogContent(e.target.value)}
      />
      <div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onUpdateClick}
        >
          Save
        </button>
      </div>
    </div>
  );
}
export default EditBlog;
