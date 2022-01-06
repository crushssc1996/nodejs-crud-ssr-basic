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

// const upload = multer().single("profile_pic");

let handleUploadFile = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send("Please select an image to upload");
  }
  // Display uploaded image for user validation
  res.send(
    `You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/upload-file">Upload another image</a>`
  );
};

let handleUploadMultipleFiles = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.files) {
    return res.send("Please select an image to upload");
  }

  let result = "You have uploaded these images: <hr />";
  const files = req.files;
  let index, len;

  for (index = 0, len = files.length; index < len; ++index) {
    result += `<img src="/images/${files[index].filename}" width="300" style="margin-right: 20px;">`;
  }

  result += '<hr/><a href="/upload-file">Upload more images</a>';
  res.send(result);
};

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
