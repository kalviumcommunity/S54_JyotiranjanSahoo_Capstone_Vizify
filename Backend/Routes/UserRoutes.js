const express = require("express")
const { getAllUsers, getOneUser, createUser, updateUser, deleteUser } = require("../Controllers/UserController")
const UserRoutes = express.Router()

UserRoutes.get("/",getAllUsers)
UserRoutes.get("/:id",getOneUser)
UserRoutes.post("/",createUser)
UserRoutes.patch("/:id",updateUser)
UserRoutes.delete("/:id",deleteUser)


module.exports = UserRoutes

