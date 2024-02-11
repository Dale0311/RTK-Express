import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const blogsSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogsSchema);

export default Blog;
