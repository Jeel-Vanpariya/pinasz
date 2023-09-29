const multer = require("multer");
const fs = require("fs");
const path = require("path");

module.exports = {
  multerWriteFile(req, res, DIR, fileTypes, fileName = "") {
    return new Promise((resolve) => {
      let file_name = "";
      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, DIR);
        },
        filename: (req, file, cb) => {
          file_name = `${Date.now()}-${fileName}-${path.parse(file.originalname).name}${path.parse(file.originalname).ext}`;
          cb(null, file_name);
        },
      });
      const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
          if (fileTypes.includes(file.mimetype)) {
            cb(null, true);
          } else {
            cb(null, false);
            return cb(new Error(`Only ${fileTypes.join(" ")}  format allowed!`));
          }
        },
      });
      upload.single("file")(req, res, (err) => {
        if (err) {
          resolve({ error: err.message });
        }
        resolve({
          status: "success",
          name: file_name,
          path: `${DIR}/${file_name}`,
          url: `${req.protocol}://${req.get("host")}/${DIR}/${file_name}`,
        });
      });
    });
  },
  deleteFile(path) {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      return { status: "success", message: "File deleted successfully" };
    } else {
      return { status: "success", message: "File not found" };
    }
  },
};
