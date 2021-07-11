'use strict';
const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { default: axios } = require('axios');
const app = express();
const PORT = process.env.PORT || 5001;
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







app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));

