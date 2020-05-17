const express = require('express');
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/user');
const User = require('../models/User');
const advancedResults = require('../middleware/advancedResult')

const router = express.Router({mergeParams:true});

const {protect, authorize} = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));


router.route('/')
.get(advancedResults(User),getUsers)
.post(createUser);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;