const PresentationModel = require("./../Schema/PresentationSchema");
const {
  UserDataModel,
  UserSocialDataModel,
} = require("./../Schema/UserDataSchema");
const {
  getPresentationData,
  getPresentationTitle,
  deleteImagesFromPPT
} = require("./../Presentation_Details/ppt_gen");
const PresentationInputValidationSchema = require("../Validation/PresentationValidationSchema");

const getAllPresentations = async (req, res) => {
  try {
    const Presentations = await PresentationModel.find({});
    if (Presentations.length == 0) {
      return res.status(404).json({ message: "No Presentations Found" });
    } else {
      return res.status(200).json({
        message: `${Presentations.length} Presentations found.`,
        Presentations,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to get any Presentations", Error: error });
  }
};

const getPresentationsById = async (req, res) => {
  try {
    const id = req.params.id;
    const presentation = await PresentationModel.findById(id);
    if (!presentation) {
      return res.status(404).json({ message: "No Presentations Found" });
    } else {
      return res.status(200).json({
        message: `Found Presentation with id ${id}`,
        Presentation: presentation,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Unable to get Presentations", error });
  }
};

const getPresentationByUserId = async (req, res) => {
  try {
    const User =
      (await UserDataModel.findById(req.params.id)) ||
      (await UserSocialDataModel.findById(req.params.id));
    if (!User) {
      return res.status(400).json({
        message: `Invalid ID, The ID ${req.params.id} doesn't corresponds to any User`,
      });
    }
    const Presentations = await PresentationModel.find({
      createdBy: req.params.id,
    });
    if (Presentations.length == 0) {
      return res.status(404).json({ message: "No Presentations Found" });
    } else {
      return res.status(200).json({
        message: `${Presentations.length} Presentation${
          Presentations.length > 1 ? "s" : ""
        } found for User with ID ${req.params.id}`,
        Presentations,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Unable to get Presentations", error });
  }
};

const createPresentation = async (req, res) => {
  try {
    const {
      no_of_slides,
      description,
      style,
      color_scheme,
      color_tone,
      username,
    } = req.body;
    const { error, value } = PresentationInputValidationSchema.validate(
      {
        no_of_slides,
        description,
        style,
        color_scheme,
        color_tone,
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
        const { no_of_slides, description, style, color_scheme, color_tone } =
          value;
        const presentation = await getPresentationData(
          no_of_slides,
          description,
          style,
          color_scheme,
          color_tone
        );
        const title = await getPresentationTitle(description);
        const postPPT = await PresentationModel.create({
          title,
          presentation,
          createdBy: user._id,
        });

        const updatedUser =
          (await UserDataModel.findOneAndUpdate(
            { Username: username },
            { Presentations: [...user.Presentations, postPPT._id] },
            { new: true }
          )) ||
          (await UserSocialDataModel.findOneAndUpdate(
            { Username: username },
            { Presentations: [...user.Presentations, postPPT._id] },
            { new: true }
          ));

        return res.status(201).json({
          message: "Presentation Created",
          createdPPT: postPPT,
          user: updatedUser,
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to create PPT" });
  }
};

const updatePresentation = async (req, res) => {
  try {
    const updatedPresentation = await PresentationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPresentation) {
      return res.status(404).json({ message: "Unable to Find the Presentation" });
    } else {
      return res
        .status(200)
        .json({
          message: "Presentation Successfully Updated",
          UpdatedPresentation: updatedPresentation,
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to Update the Presentation", Error: error });
  }
};

const deletePresentation = async (req, res) => {
    try {
        const deletePresentation = await PresentationModel.findByIdAndDelete(req.params.id)

        if(!deletePresentation){
            return res.status(404).json({message: "Unable to find the Presentation"})
        }else{
          const userid = deletePresentation.createdBy
            const user = await UserDataModel.findById(userid)||await UserSocialDataModel.findById(userid)
            const updatedPresentationsArr = user.Presentations.filter(e=> !e.equals(deletePresentation._id))
            const updatedUser = await UserDataModel.findByIdAndUpdate(userid,{Presentations: updatedPresentationsArr},{new: true}) || await UserSocialDataModel.findByIdAndUpdate(userid,{Presentations: updatedPresentationsArr},{new: true})
            const deleteImages = await deleteImagesFromPPT(deletePresentation.presentation)
            return res.status(200).json({message: "User deleted Successfully",DeletedPresentation: deletePresentation,UpdatedUser: updatedUser,deleteImagesStatus: deleteImages})
        }
    } catch (error) {
      return res
      .status(500)
      .json({ message: "Unable to Delete the Presentation", Error: error });
    }
};

module.exports = {
  createPresentation,
  getPresentationsById,
  getAllPresentations,
  getPresentationByUserId,
  updatePresentation,
  deletePresentation
};
