const express = require('express');
const multer = require('multer');

const {register, 
    login, 
    getMe, 
    forgotPassword, 
    resetPassword,
    updateDetails,
    updatepassword,
    logout
} = require('../controllers/auth');
const router = express.Router();

const {protect} = require('../middleware/auth');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
  };
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if(isValid){ error = null }
      cb(error, 'backend/images');
    },
    filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const extension = MIME_TYPE_MAP[file.mimetype];
      cb(null, name+ '-'+ Date.now()+'.'+extension);
    }
  })

router.post('/register',multer({storage:storage}).single("profilePicture"), register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',protect, getMe);
router.post('/updatedetails',protect, updateDetails);
router.post('/forgotpassword', forgotPassword );
router.post('/updatepassword',protect, updatepassword );
router.put('/resetpassword/:resettoken',resetPassword);

module.exports = router;