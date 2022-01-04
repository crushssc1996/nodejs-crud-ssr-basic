
import pool from '../configs/connectDB';

let getAllUsers = async (req, res) => {
  const [rows, fields] = await pool.execute(`SELECT * from users`);

  return res.status(200).json({
    message: 'ok',
    data: rows
  })
}

let createUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  if (!firstName || !lastName || !email || !address) {
    return res.status(400).json({
      message: 'missing required data'
    })
  }

  await pool.execute(`Insert into users(firstName, lastName, email, address) values (? , ? , ? ,? )`,
   [firstName, lastName, email, address]);

  return res.status(200).json({
    message: 'ok'
  })
}

let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  if (!firstName || !lastName || !email || !address || !id) {
    return res.status(400).json({
      message: 'missing required data'
    })
  }

  await pool.execute(`Update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?`, 
    [firstName, lastName, email, address, id])

  return res.status(200).json({
    message: 'ok'
  })
}

let deleteUser = async (req, res) => {
  const id = req.params.id;
  await pool.execute('Delete from users where id = ?', [id])

  return res.status(200).json({
    message: 'ok'
  })
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
}