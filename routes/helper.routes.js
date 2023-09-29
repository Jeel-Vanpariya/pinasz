const webp = require("webp-converter");
const { multerWriteFile, deleteFile } = require("../helpers/multer");

module.exports = async (app) => {
  webp.grant_permission();
  /**
   * Upload File
   *
   * @param {File} file object.
   * @param {dir} where to upload the file.
   * @param {supportedType} add supported type in array["text/csv","image/png","image/jpg","image/jpeg"].
   * @return {res} return file status.
   * @dev Jeel Vanpariya
   * @date 28/09/2023
   */

  app.post("/api/upload-file", async function (req, res) {
    try {
      let response;
      if (req.headers.filename != undefined) response = await multerWriteFile(req, res, req.headers.dir, req.headers.supportedtype, req.headers.filename);
      else response = await multerWriteFile(req, res, req.headers.dir, req.headers.supportedtype);
      if (response.err) res.status(500).send({ err: response.err });
      else res.send(response);
    } catch (error) {
      res.send(error);
    }
  });

  /**
   * Remove the file using URL
   *
   * @param {path} path of the file (uploads/shipments/attachments/1670998381994download.png).it will not work with URL path.
   * @return {res} return file status.
   * @dev Jeel Vanpariya
   * @date 28/09/2023
   */
  app.post("/api/remove-file", function (req, res) {
    res.send(deleteFile(req.body.path));
  });
};
