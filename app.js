const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5003;



const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

// ----------------------------------------------------------------
// MOVIES
const movieHandlers = require("./movieHandlers");

const { validateMovie } = require("./validators.js");

// read
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
// create
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.post("/api/movies", movieHandlers.postMovie);
// update
app.put("/api/movies/:id", validateMovie, movieHandlers.putMovie);
app.put("/api/movies/:id", movieHandlers.putMovie);


// ----------------------------------------------------------------
// USERS
const userHandlers = require("./userHandlers");
const { validateUser } = require("./validators.js");


// read
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
// create
app.post("/api/users", validateUser, userHandlers.postUser);
app.post("/api/users", userHandlers.postUser);
//update
app.put("/api/users/:id", validateUser, userHandlers.putUser);
app.put("/api/users/:id", userHandlers.putUser);



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
