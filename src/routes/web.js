import express from 'express';
import * as homeController from '../controllers/homeController';

const route = express.Router();

const initWebRoutes = (app) => {
  route.get('/', homeController.getHomePage)
  route.get('/detail/user/:userId', homeController.getDetailPage)
  route.post('/create-new-user', homeController.createNewUser)
  route.post('/delete-user', homeController.deleteUser)
  route.get('/edit-user/:id', homeController.editUser)
  route.post('/post-update-user', homeController.postUpdateUser)

  route.get('/about', (req, res) => {
    res.send('<h1>I\'m Hani Kawaiiiii</h1>')
  })

  app.use('/', route)
}

export default initWebRoutes;