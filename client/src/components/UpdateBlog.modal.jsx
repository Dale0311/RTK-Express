import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useUpdateBlogMutation } from '../features/blogs/blogSlice';
function UpdateBlog({ id, blog }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(blog?.title);
  const [blogContent, setBlogContent] = useState(blog?.content);
  const [updateBlog] = useUpdateBlogMutation();

  const onUpdateClick = async () => {
    try {
      await updateBlog({ id, title, content: blogContent });
      setShowModal(false);
    } catch (error) {
      console.log(error, 'something went wrong');
    }
  };

  const onCancelClick = () => {
    setShowModal(false);
    setTitle(blog?.title);
    setBlogContent(blog?.content);
  };
  return (
    <>
      <FaEdit
        className="text-blue-500 hover:text-blue-600"
        title="edit blog"
        onClick={() => setShowModal(true)}
      />
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Blog:</h3>
                </div>

                {/*body*/}
                <div className="p-4 text-lg bg-slate-200 rounded space-y-2 flex flex-col">
                  <input
                    className="text-xl font-bold p-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                    type=""
                    className="text-sm p-2 h-12 flex items-start"
                    value={blogContent}
                    placeholder="Content..."
                    onChange={(e) => setBlogContent(e.target.value)}
                  />
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onCancelClick}
                  >
                    Close
                  </button>
                  <button
                    className="bg-slate-600 text-white active:bg-slate-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onUpdateClick}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default UpdateBlog;
