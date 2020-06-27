const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Blogs = require('../models/Blogs');
const { v4: uuidv4 } = require('uuid');



// @desc Get all Blogs
// @route GET /api/v1/blog
// @acess Public
exports.getBlogs = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});


// @desc Get Single blog
// @route GET /api/v1/blog/:id
// @acess Public
exports.getBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blogs.findById(req.params.id);

  res.status(200).json({ sucess: true, data: blog });
});


// @desc Create Blog
// @route POST /api/v1/blog
// @acess Priavte
exports.createBlog = asyncHandler(async (req, res, next) => {

  const id = uuidv4();
  const user = req.user.id;
  const { coverImagePath, blogTitle, blogContent } = req.body;
  
  const blog = await Blogs.create({
    id,
    user,
    coverImagePath,
    blogTitle,
    blogContent
  });

  res.status(201).json({ sucess: true, data: blog });
});


// @desc Update Blog
// @route PUT /api/v1/blog/:id
// @acess Priavte
exports.updateBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blogs.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(201).json({ sucess: true, data: blog });
});


// @desc Delete Blog
// @route DELETE /api/v1/blog/:id
// @acess Priavte
exports.deleteBlog = asyncHandler(async (req, res, next) => {
  await Blogs.findByIdAndDelete(req.params.id)

  res.status(201).json({ sucess: true, data: {} });
});