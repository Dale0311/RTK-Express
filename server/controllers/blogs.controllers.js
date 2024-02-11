import Blog from '../models/Blogs.model.js';
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.sendStatus(500);
  }
};
export const addNewBlog = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.sendStatus(401);
  await Blog.create({ title, content });
  res.sendStatus(201);
};
export const getBlog = async (req, res) => {};
export const updateBlog = async (req, res) => {};
export const deleteBlog = async (req, res) => {};
