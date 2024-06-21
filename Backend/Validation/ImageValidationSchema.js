const Joi = require("joi")

const ImageInputValidationSchema = Joi.object({
    prompt: Joi.string().min(10).required(),
    style: Joi.string().valid(
        "3d-model",
        "analog-film",
        "anime",
        "cinematic",
        "comic-book",
        "digital-art",
        "enhance",
        "fantasy-art",
        "isometric",
        "line-art",
        "low-poly",
        "modeling-compound",
        "neon-punk",
        "origami",
        "photographic",
        "pixel-art",
        "tile-texture"
      ).required(),
    no_of_images: Joi.number().min(1).max(4).required(),
    dimensions: Joi.string().valid(
        "1024x1024",
        "1152x896",
        "896x1152",
        "1216x832",
        "1344x768",
        "768x1344",
        "1536x640",
        "640x1536"
      ).required(),
    username: Joi.string().required()
})

module.exports = ImageInputValidationSchema