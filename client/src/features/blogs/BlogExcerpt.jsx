import { useNavigate } from 'react-router-dom';
const BlogExcerpt = ({ blog }) => {
  const navigate = useNavigate();
  return (
    <div
      className="p-4 text-lg bg-slate-300 rounded hover:bg-slate-400 hover:cursor-pointer my-2"
      onClick={() => navigate(`${blog.id}`)}
    >
      <h1 className="text-xl font-bold">{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogExcerpt;
