const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const db = require('./keys').mongoURI;
const mongoose = require("mongoose");

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log('Connection to Mongo DB established'))
    .catch(err => console.log(err));

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cors());


app.use('/cities', require('./routes/cities'))
app.use('/itineraries', require('./routes/itinerary'))
app.use('/users', require('./routes/user'))

const passport = require('./passport');

app.use(passport.initialize());

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});