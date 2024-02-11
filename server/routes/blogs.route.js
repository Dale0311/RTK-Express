import express from 'express';
import {
  getAllBlogs,
  addNewBlog,
  getBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogs.controllers.js';
const router = express.Router();

router.get('/', getAllBlogs);
router.post('/', addNewBlog);
router.get('/:id', getBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
