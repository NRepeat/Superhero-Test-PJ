const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
  console.log("🚀 ~ file: imageUpload.js:9 ~ file:", file)

    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const imageUpload = multer({ storage: storage });

module.exports = imageUpload;
