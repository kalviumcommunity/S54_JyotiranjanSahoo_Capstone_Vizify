const Joi = require("joi")

const UserValidationSchema = Joi.object({
    Name: Joi.string().required().min(4),
    Email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','in','community'] } }),
    Presentations: Joi.array().items(Joi.string()),
    Images: Joi.array().items(Joi.string()),
    Username: Joi.string().required()
})


module.exports = UserValidationSchema