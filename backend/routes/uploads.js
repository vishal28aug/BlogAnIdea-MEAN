const express = require('express');
const multer = require('multer');

const { upload, getAllUpload } = require('../controllers/uploads');
const router = express.Router();

const { protect } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/uploads');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, Date.now() + '-' + name);
  }
});

router.route('/')
  .get(getAllUpload);

router.route('/')
  .post(multer({ storage: storage }).single("fileData"), upload);



// router.post('/file',multer({storage:storage}).single("fileData"), upload);
// router.get('/file', getAllUpload);

module.exports = router;