const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
 
  poster_path:String,
  title: String,
 overview: String,
  status: String,
 id : String,
  release_date: String,
  vote_average: Number,

});

const userSchema = new mongoose.Schema({
  email: String,
  movies: [movieSchema]
});

const Users = mongoose.model('user', userSchema);

module.exports = Users;