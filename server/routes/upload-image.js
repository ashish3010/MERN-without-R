const express = require('express');
const { uploadImage, upload } = require('../controllers/upload-image');
const router = express.Router()

router.post('/upload', upload.single('product'), uploadImage)

module.exports = router