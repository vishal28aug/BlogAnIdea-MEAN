const express = require('express');
const {
getBlog,
getBlogs,
createBlog,
updateBlog,
deleteBlog
} = require('../controllers/blogs');
const Blogs = require('../models/Blogs');
const advancedResults = require('../middleware/advancedResult');

const router = express.Router({mergeParams:true});

const {protect, authorize} = require('../middleware/auth');

router.use(protect);
router.use(authorize('user'));


router.route('/')
.get(advancedResults(Blogs),getBlogs)
.post(createBlog);

router.route('/:id')
  .get(getBlog)
  .put(updateBlog)
  .delete(deleteBlog);

module.exports = router;