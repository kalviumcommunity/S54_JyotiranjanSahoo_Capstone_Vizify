const express = require("express");
const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteOneUser,
  getAllNonSocialUsers,
  getAllSocialUsers,
  checkUser,
  AddNewUserToNonSocial,
  AddNewUserToSocial,
} = require("../Controllers/UserController");
const UserRoutes = express.Router();

UserRoutes.get('/',getAllUsers)

UserRoutes.get('/social',getAllSocialUsers)

UserRoutes.get('/nonsocial',getAllNonSocialUsers)

UserRoutes.get('/:id',getOneUser)

UserRoutes.post('/checkbyemail',checkUser)

UserRoutes.post('/',AddNewUserToNonSocial)

UserRoutes.post('/tosocial',AddNewUserToSocial)

UserRoutes.patch('/:id',updateUser)

UserRoutes.delete('/:id',deleteOneUser)
module.exports = UserRoutes;
