import pool from '../configs/connectDB';

let getHomePage = async (req, res) => {
  const [rows, fields] = await pool.execute(`SELECT * from users`);

  return res.render('index.ejs', {dataUser: rows, test: 'abc'});
}

let getDetailPage = async (req, res) => {
  const userId = req.params.userId;
  const [user, fields] = await pool.execute(`SELECT * from users where id = ? `, [userId]);

  return res.send(JSON.stringify(user));
}

let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(`Insert into users(firstName, lastName, email, address) values (? , ? , ? ,? )`,
   [firstName, lastName, email, address]);

  return res.redirect('/');
}

let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute('Delete from users where id = ?', [userId])

  return res.redirect('/');
}

let editUser = async (req, res) => {
  const userId = req.params.id;
  const [user, fields] = await pool.execute(`SELECT * from users where id = ? `, [userId]);

  return res.render('update.ejs', {dataUser: user[0]})
}

let postUpdateUser = async (req, res) => {
  let { id, firstName, lastName, email, address } = req.body;
  await pool.execute(`Update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?`, 
    [firstName, lastName, email, address, id])

  return res.redirect('/')
}

module.exports = {
  getHomePage,
  getDetailPage,
  createNewUser,
  deleteUser,
  editUser,
  postUpdateUser
}