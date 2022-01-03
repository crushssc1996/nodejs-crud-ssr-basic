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

module.exports = {
  getHomePage,
  getDetailPage,
  createNewUser
}