import React from 'react';
import BlogList from './BlogList';
import AddNewBlog from './AddNewBlog';

function Blogs() {
  return (
    <div className="space-y-4">
      <div>
        <AddNewBlog />
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-bold">Blog List</h1>
        <BlogList />
      </div>
    </div>
  );
}

export default Blogs;
