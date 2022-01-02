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

module.exports = {
  getHomePage,
  getDetailPage
}