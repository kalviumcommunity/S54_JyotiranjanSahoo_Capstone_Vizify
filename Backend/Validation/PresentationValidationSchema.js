const Joi = require("joi")

const PresentationInputValidationSchema = Joi.object({
    no_of_slides: Joi.number().min(3).max(10).required(),
    description: Joi.string().min(10).required(),
    style: Joi.string().required(),
    color_scheme: Joi.string().required(),
    color_tone: Joi.string().required(),
    username: Joi.string().required()
})

module.exports = PresentationInputValidationSchema