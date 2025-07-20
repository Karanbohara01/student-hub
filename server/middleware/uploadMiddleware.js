

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

function fileFilter(req, file, cb) {
    // Allow images, PDFs, and Word documents
    const allowedTypes = /jpeg|webp|jpg|png|pdf|doc|docx/;

    const isMatch = allowedTypes.test(path.extname(file.originalname).toLowerCase()) || allowedTypes.test(file.mimetype);

    if (isMatch) {
        cb(null, true);
    } else {
        cb(new Error('File type not supported!'), false);
    }
}

const upload = multer({
    storage,
    fileFilter,
});

module.exports = upload;