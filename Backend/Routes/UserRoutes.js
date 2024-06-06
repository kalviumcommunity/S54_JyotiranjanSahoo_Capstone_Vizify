const express = require("express");
const {
  getAllUsers,
  getOneUser,
  checkPresenceByEmail,
  AddNewUserToNonSocial,
  AddNewUserToSocial,
  getAllNonSocialUsers,
  getAllSocialUsers,
  updateUser,
  deleteUser,
} = require("../Controllers/UserController");
const UserRoutes = express.Router();

UserRoutes.get('/',getAllUsers)

UserRoutes.get('/social',getAllSocialUsers)

UserRoutes.get('/nonsocial',getAllNonSocialUsers)

UserRoutes.get('/:id',getOneUser)

UserRoutes.post('/checkbyemail',checkPresenceByEmail)

UserRoutes.post('/',AddNewUserToNonSocial)

UserRoutes.post('/tosocial',AddNewUserToSocial)

UserRoutes.patch('/:id',updateUser)

UserRoutes.delete('/:id',deleteUser)

module.exports = UserRoutes;
