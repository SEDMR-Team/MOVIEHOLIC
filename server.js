'use strict';
const express = require('express')
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
//requiremongoose
// const mongoose=require("mongoose");



    
    app.get('/movie', (req, res) => {
      // const with_genres = req.query.with_genres;
      // const vote_average= req.query.vote_average.gte
      // // const with_runtime =  req.query.with_runtime.gte
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=b7e66d37aebc415226444c14cfe515e4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=28&vote_average.gte=9.9`,
       
      }).then(response => res.json(response.body.results))
        .catch(error => console.log(error))
    })


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));

