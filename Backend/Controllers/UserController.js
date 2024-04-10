const UserValidationSchema = require("./../Validation/UserValidationSchema");
const UserDataModel = require("./../Schema/UserDataSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const getAllUsers = async (req, res) => {
  try {
    const Users = await UserDataModel.find({});
    if (Users.length === 0) {
      res.status(404).json({ message: "Database is Empty" });
    } else {
      res.status(200).json(Users);
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to Fetch Data" });
  }
};

const getOneUser = async (req, res) => {
  try {
    const User = await UserDataModel.findById(req.params.id);
    if (User.length === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({
        User: {
          ...User._doc,
          Username: jwt.sign(User._doc.Username, process.env.SECRET),
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch Data" });
  }
};

const createUser = async (req, res) => {
  try {
    const { error, value } = UserValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      res.status(400).json({ error: error.details.map((e) => e.message) });
    } else {
      const { Name, Email, Username } = value;
      const User = await UserDataModel.create({
        Name,
        Email,
        Presentations: [],
        Images: [],
        Username,
      });
      const resData = {
        Name,
        Email,
        Presentations: [],
        Images: [],
        Username: jwt.sign(Username,process.env.SECRET)
      };
      res.status(201).json({
        message: "User Created",
        User: resData,
      });
    }
  } catch (error) {
    if (error.keyPattern && error.keyValue) {
      errorName = Object.keys(error.keyPattern);
      errorValue = error.keyValue[errorName];
      res.status(400).json({
        message: "Unable to Create User",
        errorMessage: `"${errorValue}" ${errorName[0]} is already taken`,
      });
    } else {
      res.status(500).json({ message: "Unable to create User" });
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const User = await UserDataModel.findOneAndUpdate(
      { Username: req.params.id },
      { $set: req.body },
      { new: false }
    );
    if (!User) {
      res.status(404).json({ message: "User not Found" });
    } else {
      const NewUser = await UserDataModel.find({ Username: req.params.id });
      res.status(200).json({
        message: `User with Username ${req.params.id} is Updated`,
        OldUser: User,
        NewUser,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to update User" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const User = await UserDataModel.findOneAndDelete({
      Username: req.params.id,
    });

    if (!User) {
      res.status(400).json({ message: "User not Found" });
    } else {
      res.status(200).json({
        message: `User with Username ${req.params.id} is deleted`,
        User,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to delete User" });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
