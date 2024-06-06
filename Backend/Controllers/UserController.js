const UserValidationSchema = require("./../Validation/UserValidationSchema");
const {
  UserDataModel,
  UserSocialDataModel,
} = require("./../Schema/UserDataSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const axios = require("axios")

const getAccessToken = async () => {
  try {
    const response = await axios.post(
      `https://${process.env.MANAGEMENT_DOMAIN}/oauth/token`,
      {
        client_id: process.env.MANAGEMENT_CLIENT_ID,
        client_secret: process.env.MANAGEMENT_CLIENT_SECRET,
        audience: `https://${process.env.MANAGEMENT_DOMAIN}/api/v2/`,
        grant_type: "client_credentials",
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const AllNonSocialUsers = await UserDataModel.find({});
    const AllSocialUsers = await UserSocialDataModel.find({});
    const AllUsers = [...AllNonSocialUsers, ...AllSocialUsers];
    res.status(200).json(AllUsers);
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
};

const getAllNonSocialUsers = async (req, res) => {
  try {
    const AllUsers = await UserDataModel.find({});
    res.status(200).json(AllUsers);
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
};

const getAllSocialUsers = async (req, res) => {
  try {
    const AllUsers = await UserSocialDataModel.find({});
    res.status(200).json(AllUsers);
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
};

const getOneUser = async (req, res) => {
  try {
    const OneUser =
      (await UserDataModel.findById(req.params.id)) ||
      (await UserSocialDataModel.findById(req.params.id));
    if (!OneUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: `See User for ${req.params.id}`, OneUser });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching single User" });
  }
};

const checkPresenceByEmail = async (req, res) => {
  try {
    const isSocial = req.body.sub.split("|")[0] === "auth0" ? false : true;
    const OneUser = isSocial
      ? await UserSocialDataModel.find({ Email: req.body.email })
      : await UserDataModel.find({ Email: req.body.email }).exec();
    if (OneUser.length == 0) {
      return res
        .status(200)
        .json({ message: "User not found", found: false, isSocial });
    }

    const access_token = jwt.sign(OneUser[0].Username, process.env.SECRET);
    res.status(200).json({
      message: `See User for ${req.body.email}`,
      OneUser: OneUser[0],
      access_token,
      found: true,
      isSocial,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching single User" });
  }
};

const AddNewUserToNonSocial = async (req, res) => {
  try {
    const user = req.body;
    const access_token = await getAccessToken();

    const options = {
      method: "GET",
      url: `https://${process.env.MANAGEMENT_DOMAIN}/api/v2/users`,
      params: { q: `email:${user.email}`, search_engine: "v3" },
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    };

    const result = await axios.request(options);
    const authUser = result.data.filter(
      (e) => e.identities[0].isSocial === false
    )[0];

    const { username } = authUser;
    const { name, email } = user;
    const { error, value } = UserValidationSchema.validate(
      { Name: name, Username: username, Email: email },
      {
        abortEarly: false,
      }
    );

    if (error) {
      const allErrors = error.details.map((e) => e.message);
      res.status(400).json({ error: allErrors[0] });
    } else {
      const { Name, Username, Email } = value;
      const postUser = await UserDataModel.create({
        Name,
        Username,
        Email,
        Presentations: [],
        Images: [],
      });
      const authData = {
        Username: postUser.Username,
      };
      if (postUser) {
        const access_token = jwt.sign(authData.Username, process.env.SECRET);
        // console.log("access_token1: ", access_token);

        res.status(201).json({
          access_token: access_token,
          postUser: postUser,
        });
      }
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send(`Internal Server Error. ${error}`);
  }
};

const AddNewUserToSocial = async (req, res) => {
  try {
    const { name, username, email } = req.body;
    const { error, value } = UserValidationSchema.validate(
      { Name: name, Username: username, Email: email },
      {
        abortEarly: false,
      }
    );

    if (error) {
      const allErrors = error.details.map((e) => e.message);
      res.status(400).json({ error: allErrors[0] });
    } else {
      const { Name, Username, Email } = value;
      const data1 = await UserSocialDataModel.find({ Username });
      const data2 = await UserDataModel.find({ Username });
      if (data1.length > 0 || data2.length > 0) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const postUser = await UserSocialDataModel.create({
        Name,
        Username,
        Email,
        Presentations: [],
        Images: [],
      });
      const authData = {
        Username: postUser.Username,
      };
      if (postUser) {
        const access_token = jwt.sign(
          authData.Username,
          process.env.SECRET
        );
        // console.log("access_token1: ", access_token);

        res.status(201).json({
          access_token: access_token,
          postUser: postUser,
        });
      } else {
        return res.status(500).send("Failed to create new user.");
      }
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send(`Internal Server Error. ${error}`);
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
    const deleteUser =
      (await UserDataModel.findByIdAndDelete(req.params.id)) ||
      (await UserSocialDataModel.findByIdAndDelete(req.params.id));
    if (deleteUser) {
      res
        .status(200)
        .json({ message: `Deleted User for ${req.params.id}`, deleteUser });
    } else {
      res
        .status(404)
        .json({ message: `User not found with ID ${req.params.id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error Deleting User" });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  checkPresenceByEmail,
  AddNewUserToNonSocial,
  AddNewUserToSocial,
  getAllNonSocialUsers,
  getAllSocialUsers,
  updateUser,
  deleteUser,
};
