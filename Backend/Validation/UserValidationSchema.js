const Joi = require("joi")

const UserValidationSchema = Joi.object({
    Name: Joi.string().required().min(4),
    Email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','in','community'] } }),
    Password: Joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}\\[\\]:;<>,.?\\/]).{8,}$')).message('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one symbol'),
    Presentations: Joi.array().items(Joi.string()),
    Images: Joi.array().items(Joi.string()),
    Username: Joi.string().required()
})


module.exports = UserValidationSchema