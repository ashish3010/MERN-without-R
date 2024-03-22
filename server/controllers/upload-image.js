const multer = require('multer');
const path = require('path');
const port = 4000;

storage = multer.diskStorage({
  destination: './assets/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

exports.upload = multer({ storage })

exports.uploadImage = (req, res) => {
  res.json({
    success: 1,
    imageUrl: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
  })
}