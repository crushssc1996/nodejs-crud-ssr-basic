import express from "express";
import * as homeController from "../controllers/homeController";
import multer from "multer";
import path from "path";

var appRoot = require("app-root-path");

const route = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/images/");
  },
  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoutes = (app) => {
  route.get("/", homeController.getHomePage);
  route.get("/detail/user/:userId", homeController.getDetailPage);
  route.post("/create-new-user", homeController.createNewUser);
  route.post("/delete-user", homeController.deleteUser);
  route.get("/edit-user/:id", homeController.editUser);
  route.post("/post-update-user", homeController.postUpdateUser);

  //Upload files
  route.get("/upload-file", homeController.getUploadFilePage);
  route.post(
    "/upload-profile-pic",
    upload.single("profile_pic"), // middleware
    homeController.handleUploadFile
  );
  route.post(
    "/upload-multiple-images",
    homeController.handleUploadMultipleFiles
  );

  app.use("/", route);
};

export default initWebRoutes;
