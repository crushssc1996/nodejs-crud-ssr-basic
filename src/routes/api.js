import express from 'express';
import * as apiController from '../controllers/apiController';

const route = express.Router();

const initAPIRoutes = (app) => {
  route.post('/create-user', apiController.createUser) // method POST -> Create user
  route.get('/get-users', apiController.getAllUsers) // method GET -> Read user
  route.put('/update-user', apiController.updateUser) // method PUT -> Update user
  route.delete('/delete-user/:id', apiController.deleteUser) // method DELETE -> Delete user

  return app.use('/api/v1', route)
}

export default initAPIRoutes;