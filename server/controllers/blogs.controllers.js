import Blog from '../models/Blogs.model.js';
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getBlog = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.sendStatus(400);
  const blogExist = await Blog.findOne({ _id: id });
  if (!blogExist) return res.sendStatus(404);
  res.status(200).json(blogExist);
};

export const addNewBlog = async (req, res) => {
  const { title, content } = req.body;
  console.log(req.userEmail);
  if (!title || !content) return res.sendStatus(401);
  await Blog.create({ title, content });
  res.sendStatus(201);
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!id) return res.sendStatus(400);
  if (!title || !content) return res.sendStatus(400);
  try {
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: id },
      { title, content },
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.sendStatus(404);
  }
};
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.sendStatus(400);
  try {
    await Blog.findOneAndDelete({ _id: id });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(304);
  }
};
