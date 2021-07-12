const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  id: Number,
  poster_path:String,
  title: String,
 overview: String,
  status: String,
  vote_average: Number,
});

const userSchema = new mongoose.Schema({
  email: String,
  movies: [movieSchema]
});

const Users = mongoose.model('users', userSchema);

module.exports = Users;