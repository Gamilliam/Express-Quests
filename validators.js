const Joi = require('joi');

// ----------------------------------------------------------------
// MOVIES
// title varchar(255) NOT NULL,
// director varchar(255) NOT NULL,
// year varchar(255) NOT NULL,
// color varchar(255) NOT NULL,
// duration int NOT NULL
const movieSchema = Joi.object({
  title : Joi.string().max(255).required(),
  director : Joi.string().max(255).required(),
  year : Joi.string().max(255).required(),
  color : Joi.boolean().required(),
  duration : Joi.number().integer().required(),
});

const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;
  const {error} = movieSchema.validate(
    {title, director, year, color, duration},
    {abortEarly: false}
    );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};


// ----------------------------------------------------------------
// USERS
// firstname varchar(255) NOT NULL,
// lastname varchar(255) NOT NULL,
// email varchar(255) UNIQUE NOT NULL,
// city varchar(255) DEFAULT NULL,
// language varchar(255) DEFAULT NULL

const userSchema = Joi.object({
  firstname : Joi.string().max(255).required(),
  lastname : Joi.string().max(255).required(),
  email : Joi.string().max(255).required(),
  city : Joi.string().max(255),
  language : Joi.string().max(255),
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;
  const { error } = userSchema.validate(
    {firstname, lastname, email, city, language},
    {abortEarly: false}
    )

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }};

module.exports = {
  validateMovie,
  validateUser,
};