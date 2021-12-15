const express = require("express"); // Included express module for using the express middleware to expose our own api endpoints
const app = express();
const router = express.Router();
const request = require("request");
const fetch = require("node-fetch");

const dotenv = require("dotenv"); // included dotenv for access to environment variables
dotenv.config(); // accessing the env file

// const cors = require("cors");

const PORT = process.env.PORT || 3000; // retreving port from env
const API_KEY = process.env.API_KEY;
const TOKEN = process.env.TOKEN;


//Get all boards:
app.get('/getBoards/', (req, res) => {
    
    let api_key = req.body.api_key;
    let token = req.body.token;

    fetch(`https://api.trello.com/1/members/me/boards?key=${api_key}&token=${token}`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
    })
    .then(response => {
        console.log(
        `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));
});

//Get boards by id:
app.get('/getBoards/:id', (req, res) => {
    
    const id = req.params.id;

    fetch(`https://api.trello.com/1/boards/{id}/memberships`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
    })
    .then(response => {
        console.log(
        `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));
});

app.put('/updateBoard/:id', (req, res) => {

fetch('https://api.trello.com/1/boards/{id}', {
  method: 'PUT'
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => console.log(text))
  .catch(err => console.error(err));
})

// Boards API endpoints:
// async function getTrelloBoards(req, res){
//     try {
        
//     } catch (exception) {
//         console.error(exception);
//     }
// }

/*Below is calling express, this turn our program into a server that is actively listening for requests*/
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
