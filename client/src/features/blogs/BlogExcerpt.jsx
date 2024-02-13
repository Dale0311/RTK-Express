const BlogExcerpt = ({ blog }) => {
  return (
    <div className="p-4 text-lg bg-slate-300 rounded hover:bg-slate-400 hover:cursor-pointer my-2">
      <h1 className="text-xl font-bold">{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogExcerpt;
