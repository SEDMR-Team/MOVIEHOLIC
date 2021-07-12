'use strict';
const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { default: axios } = require('axios');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5001;
mongoose.connect('mongodb://localhost:27017/movie', {useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors());


    
    app.get('/movie', (req, res) => {
      // const with_genres = req.query.with_genres;
      // const vote_average= req.query.vote_average.gte
      // // const with_runtime =  req.query.with_runtime.gte
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=b7e66d37aebc415226444c14cfe515e4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=28&primary_release_year=2018`,
       
      }).then(response => res.json(response.data.results))
        .catch(error => console.log(error))
    })


// handle search by genere and year (released-data)
app.get('/search', (req, res) => {
  const with_genres = req.query.with_genres;
  const primary_release_year= req.query.primary_release_year;
  axios({
    method: 'get',
    url: `https://api.themoviedb.org/3/discover/movie?api_key=b7e66d37aebc415226444c14cfe515e4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${with_genres}&primary_release_year=${primary_release_year}`,
   
  }).then(response => res.json(response.data.results))
    .catch(error => console.log(error))
})



app.get('/movie/:id', (req, res) => {
   const id= req.params.id;
  axios({
    method: 'get',
    url: `https://api.themoviedb.org/3/movie/${id}?api_key=b7e66d37aebc415226444c14cfe515e4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,
   
  }).then(response => {
    res.json(response.data)
  })
    .catch(error => console.log(error))
});




app.post('/movie/save', (req, res) => {
  const user = req.body;
  Users.find({ email: user.email }, (err, userData) => {
    if (err) {
      res.send(err);
    } else if (userData.length < 1) {
      // if the user not found, then save the whole data
      console.log(userData)
      const newUser = new Users({
        email: user.email,
       movies: [user.movie]
      });
      newUser.save()
        .then(newUserData => {
          res.json(newUserData);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    } else {
      // if the user found, then only push in the businesses property
      const userInfo = userData[0];
      userInfo.movies.push(user.movie);
      userInfo.save()
        .then(userInfo => {
          res.json(userInfo);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    }
  })
})



















app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));

