// ----------------------------------------------------------------
// MOVIES
const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;
  const errors = [];

  if (title == null && title.length > 255) {
    errors.push({ field: "title", message: "This field is required and should contain less than 255 characters"});
  }
  if (director == null && director.length > 255) {
    errors.push({ field: "director", message: "This field is required and should contain less than 255 characters"});
  }
  if (year == null && year.length > 255) {
    errors.push({ field: "year", message: "This field is required and should contain less than 255 characters"});
  }
  if (color == null && color.length > 255) {
    errors.push({ field: "color", message: "This field is required and should contain less than 255 characters"});
  }
  if (duration == null && typeof duration === "int") {
    errors.push({ field: "duration", message: "This field is required" });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};


// ----------------------------------------------------------------
// USERS
const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
  const errors = [];

  if (firstname == null && firstname.length > 255) {
    errors.push({ field: "firstname", message: "This field is required and should contain less than 255 characters"});
  }
  if (lastname == null && lastname.length > 255) {
    errors.push({ field: "lastname", message: "This field is required and should contain less than 255 characters"});
  }
  if (email == null && email.length > 255 && !emailRegex.test(email)) {
    errors.push({ field: "email", message: "This field is required and with format 'exmaple@syrup.com' and should contain less than 255 characters"});
  }
  if (city.length > 255) {
    errors.push({ field: "city", message: "This field should contain less than 255 characters"});
  }
  if (language.length > 255) {
    errors.push({ field: "language", message: "This field should contain less than 255 characters" });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = {
  validateMovie,
  validateUser,
};