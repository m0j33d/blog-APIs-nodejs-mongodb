const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate')
const {
  createBlog,
  getAllBlog,
  getBlogById,
  publishBlogById,
  editBlogById,
  deleteBlogById,
  getAllUserBlog,
} = require("../controllers/blogController")
const { validateBlog, validate } = require("../middleware/blogValidation")


router
  .route('/')
  .post(authenticate.verifyUser, validateBlog(), validate, createBlog)
  .get(getAllBlog)

router 
  .route('/allBlogs')
  .get(authenticate.verifyUser, getAllUserBlog)

router 
  .route('/:id')
  .get(getBlogById)
  .put(authenticate.verifyUser, authenticate.isAuthor, editBlogById)
  .patch(authenticate.verifyUser, authenticate.isAuthor, publishBlogById)
  .delete(authenticate.verifyUser, authenticate.isAuthor, deleteBlogById)
  

module.exports = router;
