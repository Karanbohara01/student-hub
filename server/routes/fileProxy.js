const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();

// Wasabi S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.WASABI_ACCESS_KEY,
  secretAccessKey: process.env.WASABI_SECRET_KEY,
  region: process.env.WASABI_REGION,
  endpoint: process.env.ServiceURL,
  s3ForcePathStyle: true,
});

// @route GET /api/files/:filename
router.get('/:filename', async (req, res) => {
  const fileName = req.params.filename;

  const params = {
    Bucket: process.env.WASABI_BUCKET,
    Key: fileName,
  };

  try {
    const fileStream = s3.getObject(params).createReadStream();

    // Optional: Set headers if known (e.g., content-type)
    fileStream.on('error', (err) => {
      return res.status(404).json({ message: 'File not found', error: err.message });
    });

    fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: 'Wasabi stream error', error: error.message });
  }
});

module.exports = router;
