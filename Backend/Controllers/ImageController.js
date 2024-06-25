const ImageModel = require("./../Schema/ImageSchema");
const {
  UserDataModel,
  UserSocialDataModel,
} = require("./../Schema/UserDataSchema");

const { image_gen, delete_image } = require("./../Image_Details/Image_gen");
const ImageInputValidationSchema = require("./../Validation/ImageValidationSchema");
const { findByIdAndUpdate } = require("../Schema/PresentationSchema");

const getAllImages = async (req, res) => {
  try {
    const Images = await ImageModel.find({});
    if (Images.length == 0) {
      return res.status(404).json({ message: "No Images Found" });
    } else {
      return res.status(200).json({
        message: `${Images.length} Image Collections found.`,
        Images,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to get any Images", Error: error });
  }
};

const getImageById = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await ImageModel.findById(id);
    if (!image) {
      return res.status(404).json({ message: "No Images Found" });
    } else {
      return res.status(200).json({
        message: `Found Image with id ${id}`,
        Image: image,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to get Images", error });
  }
};

const getImagesByUserId = async (req, res) => {
  try {
    const User =
      (await UserDataModel.findById(req.params.id)) ||
      (await UserSocialDataModel.findById(req.params.id));
    if (!User) {
      return res.status(400).json({
        message: `Invalid ID, The ID ${req.params.id} doesn't corresponds to any User`,
      });
    }
    const Images = await ImageModel.find({
      createdBy: req.params.id,
    });
    if (Images.length == 0) {
      return res.status(404).json({ message: "No Images Found" });
    } else {
      return res.status(200).json({
        message: `${Images.length} Image${
          Images.length > 1 ? "s" : ""
        } found for User with ID ${req.params.id}`,
        Images,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to get Images", error });
  }
};

const createImage = async (req, res) => {
  const { prompt, style, no_of_images, dimensions, username } = req.body;
  const { error, value } = ImageInputValidationSchema.validate(
    {
      prompt,
      style,
      no_of_images,
      dimensions,
      username,
    },
    { abortEarly: false }
  );
  if (error) {
    const allErrors = error.details.map((e) => e.message);
    return res.status(400).json({ error: allErrors[0] });
  } else {
    let user;
    const userResponse = await UserDataModel.find({ Username: username });
    if (userResponse.length == 0) {
      const userResponse = await UserSocialDataModel.find({
        Username: username,
      });
      user = userResponse[0];
    } else {
      user = userResponse[0];
    }
    if (!user) {
      return res.status(400).json({ message: "Invalid Username" });
    } else {
      const { prompt, style, no_of_images, dimensions, username } = value;
      const imageArray = await image_gen(
        prompt,
        style,
        no_of_images,
        dimensions
      );
      const postImage = await ImageModel.create({
        prompt,
        images: imageArray,
        createdBy: user._id,
      });
      const updatedUser =
        (await UserDataModel.findOneAndUpdate(
          { Username: username },
          { Images: [postImage._id,...user.Images] },
          { new: true }
        )) ||
        (await UserSocialDataModel.findOneAndUpdate(
          { Username: username },
          { Images: [postImage._id,...user.Images] },
          { new: true }
        ));

      return res.status(201).json({
        message: "Images Created",
        postImage,
        user: updatedUser,
      });
    }
  }
};

const updateImage = async (req, res) => {
  try {
    const updatedImage = await ImageModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedImage) {
      return res.status(404).json({ message: "Unable to Find the Image" });
    } else {
      return res.status(200).json({
        message: "Image Successfully Updated",
        UpdatedImage: updatedImage,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to Update the Image", Error: error });
  }
};

const deleteImage = async (req, res) => {
    try {
        const deleteImage = await ImageModel.findByIdAndDelete(req.params.id)
        if(!deleteImage){
            return res.status(404).json({message: "Unable to find the Image"})
        }else{
            const userid = deleteImage.createdBy
            const user = await UserDataModel.findById(userid)||await UserSocialDataModel.findById(userid)
            const updatedImageArr = user.Images.filter(e=> !e.equals(deleteImage._id))
            const updatedUser = await UserDataModel.findByIdAndUpdate(userid,{Images: updatedImageArr},{new: true}) || await UserSocialDataModel.findByIdAndUpdate(userid,{Images: updatedImageArr},{new: true})
            const DeleteImageStatus = await delete_image(deleteImage.images)
            return res.status(200).json({message: "User deleted Successfully",DeletedImage: deleteImage,UpdatedUser: updatedUser,DeleteImageStatus})
        }
    } catch (error) {
        return res
      .status(500)
      .json({ message: "Unable to Delete the Image", Error: error });
    }
};


module.exports = {
    getAllImages,
    getImageById,
    getImagesByUserId,
    createImage,
    updateImage,
    deleteImage
}