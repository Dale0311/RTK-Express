import React from 'react';

function BlogList() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="p-4 text-lg bg-slate-300 rounded hover:bg-slate-400 hover:cursor-pointer">
        <h1>Lorem, ipsum dolor.</h1>
      </div>
      <div className="p-4 text-lg bg-slate-300 rounded hover:bg-slate-400 hover:cursor-pointer">
        <h1>Lorem, dolor Lorem.</h1>
      </div>
      <div className="p-4 text-lg bg-slate-300 rounded hover:bg-slate-400 hover:cursor-pointer">
        <h1>Lorem, Lorem Lorem.</h1>
      </div>
    </div>
  );
}

export default BlogList;
