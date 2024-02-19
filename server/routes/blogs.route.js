import express from 'express';
import {
  getAllBlogs,
  addNewBlog,
  getBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogs.controllers.js';
import { verifyJWT } from '../middlewares/verifyJWT.js';
const router = express.Router();

router.get('/', getAllBlogs);

router.use(verifyJWT);
router.post('/', addNewBlog);
router.get('/:id', getBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
