const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Upload = require('../models/Uploads');


// @desc Upload files for logged in user
// @route POST /api/v1/upload/file
// @acess Private
exports.upload = asyncHandler(async (req, res, next) => {
  const fileName = req.file.originalname;
  const url = req.protocol + '://' + req.get("host");
  filePath = url + "/uploads/" + req.file.filename;
  const { userId } = req.body;

  //save path of image
  const upload = await Upload.create({
    userId,
    filePath,
    fileName
  });

  res.status(200).json({
    sucess: true,
    data: upload
  });
});

// @desc get all Uploaded files for logged in user
// @route GET /api/v1/upload/file
// @acess Private
exports.getAllUpload = asyncHandler(async (req, res, next) => {
  const userId = req.query.userId;

  const uploadData = await Upload.find({ userId: userId });

  res.status(200).json({ sucess: true, data: uploadData });

});