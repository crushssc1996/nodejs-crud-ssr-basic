import pool from "../configs/connectDB";
import multer from "multer";

let getHomePage = async (req, res) => {
  const [rows, fields] = await pool.execute(`SELECT * from users`);

  return res.render("index.ejs", { dataUser: rows, test: "abc" });
};

let getDetailPage = async (req, res) => {
  const userId = req.params.userId;
  const [user, fields] = await pool.execute(
    `SELECT * from users where id = ? `,
    [userId]
  );

  return res.send(JSON.stringify(user));
};

let createNewUser = async (req, res) => {
  console.log(">> body: ", req.body);
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    `Insert into users(firstName, lastName, email, address) values (? , ? , ? ,? )`,
    [firstName, lastName, email, address]
  );

  return res.redirect("/");
};

let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute("Delete from users where id = ?", [userId]);

  return res.redirect("/");
};

let editUser = async (req, res) => {
  const userId = req.params.id;
  const [user, fields] = await pool.execute(
    `SELECT * from users where id = ? `,
    [userId]
  );

  return res.render("update.ejs", { dataUser: user[0] });
};

let postUpdateUser = async (req, res) => {
  let { id, firstName, lastName, email, address } = req.body;
  await pool.execute(
    `Update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?`,
    [firstName, lastName, email, address, id]
  );

  return res.redirect("/");
};

let getUploadFilePage = (req, res) => {
  return res.render("upload.ejs");
};

const upload = multer().single("profile_pic");

let handleUploadFile = async (req, res) => {
  // 'profile_pic' is the name of our file input field in the HTML form
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/upload-file">Upload another image</a>`
    );
  });
};

let handleUploadMultipleFiles = (req, res) => {};

module.exports = {
  getHomePage,
  getDetailPage,
  createNewUser,
  deleteUser,
  editUser,
  postUpdateUser,
  getUploadFilePage,
  handleUploadFile,
  handleUploadMultipleFiles,
};
