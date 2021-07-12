
const express = require('express')
const cors = require('cors');
const { default: axios } = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();
const Users = require('./models/Users.js');
const app = express();
const PORT = process.env.PORT || 5001;
mongoose.connect('MONGODB_URI=mongodb://localhost:27017/movie', {useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors());





app.get('/', (req, res) => {
  res.send('Welcome to MovieHolic back end!');
});
//movie profile GET
app.get('/movie/profile', (req, res) => {
  Users.find({ email: req.query.email }, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      if (data.length === 0) {
        res.send(data);
      } else {
        res.send(data[0].movies);
      }
    }
  });
});

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

// post route to add movie to specific user
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
      // if the user found, then only push the movie in the movies property
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
});

// delete the movie from a specific user
app.delete('/movies/:id', (req, res) => {
  // const id= req.params.id;
  const id = req.params.index
  Users.find({ email: req.query.email }, (err, data) => {
    console.log(req.params.id);
    // error handling
    if (err) {
      res.send(err);
    } else {
      if (data.length === 0) {
        // user not found
        res.status(400).send(data)
      } else {
        // user found
        const user = data[0];
        // delete the requested business with the id
        user.movies = user.movies.filter(movie => movie.id !== req.params.id);
        // save the user
        user.save()
          .then(data => {
             console.log('data after delete', data);
            res.json(user.movies);
          })
          .catch(err => res.status(500).send(err));
      }
    }
  })
});



// app.delete('/movie/:id', (req, res) => {
//   const id =req.params.id;
//   const email =req.query.email;
//   Users.findOne({email:email},(error,user)=>{
//       if(error){
//           res.send(error)
//       }
//       user.movies.splice(id,1);
//       user.save();
//       res.send(user)
//   })
// })












app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));

