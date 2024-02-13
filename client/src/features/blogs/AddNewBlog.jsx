import React from 'react';
import axios from 'axios';
function AddNewBlog() {
  const handleClick = async () => {
    const res = await axios.get('http://localhost:5500/blogs');
    console.log(res);
  };
  return (
    <div className="space-y-4 border p-4 rounded">
      <h1 className="text-xl font-bold">Add new blog: </h1>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          className="p-2 rounded flex-1 border border-slate-400"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          name="content"
          id="content"
          placeholder="Content"
          className="p-2 rounded flex-1 border border-slate-400"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded">
          Clear
        </button>
        <button
          className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
          onClick={handleClick}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AddNewBlog;
