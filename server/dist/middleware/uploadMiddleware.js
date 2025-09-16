"use strict";

var path = require('path');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(file.fieldname, "-").concat(Date.now()).concat(path.extname(file.originalname)));
  }
});
function fileFilter(req, file, cb) {
  // Allow images, PDFs, and Word documents
  var allowedTypes = /jpeg|webp|jpg|png|pdf|doc|docx/;
  var isMatch = allowedTypes.test(path.extname(file.originalname).toLowerCase()) || allowedTypes.test(file.mimetype);
  if (isMatch) {
    cb(null, true);
  } else {
    cb(new Error('File type not supported!'), false);
  }
}
var upload = multer({
  storage: storage,
  fileFilter: fileFilter
});
module.exports = upload;