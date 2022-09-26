// const http = require('http'); // Common JS

/* import express from 'express';

const app = express();

const hostname = '127.0.0.1';
const port = process.env.port || 9090; */
/**
 * Demander 1' adresse (URL) de base '/'
 * a l'aide de la méthode GET de HTTP
 */

/* app.get('/', (req, res) => { arrow function
    res.send('Hello World!');
}); */

/** 
 * lorsqu une demande arrive a '/game/whatever' 
 * a l'aide de la méthode GET de HTTP
 */
/* app.get('/game/:name', (req, res) => {
    res.send(`the name of this game is ${req.params.name}`);
}) */

/**
 * Server run
 */
/* app.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}/`);
}); */


// const http = require('http'); // Common JS

import express from 'express'; //ekma js

const app = express();

const hostname = '127.0.0.1';
const port = process.env.port || 9090;
/**
 * Demander 1' adresse (URL) de base '/'
 * a l'aide de la méthode GET de HTTP
 */

class Game {
    constructor(name, year) {
        this.name = name
        this.year = year
    }
}

app.get('/entity', (req, res) => {
    const game = new Game("LoL", 2013)
    res.status(200).json(game)
});

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});

/** 
 * lorsqu une demande arrive a '/game/whatever' 
 * a l'aide de la méthode GET de HTTP
 */
app.get('/game/:name', (req, res) => {
    res.status(200).json({ message: `the name of this game is ${req.params.name}` });
})


/**
 * 
 */
app.get('/secret', (req, res) => {
    res.status(401).json({ message: "Unothirized" });
})

/**
 * Server run
 */
app.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}/`);
});



//Exercise

import fs from 'fs';


app.get('/game2', (req, res) => {


    fs.readFile('./SteamGames.json', (err, data) => {
        if (err) throw err;
        let games = JSON.parse(data);
        res.status(200).json(games);
    });

    console.log('This is after the read call');
})



app.get('/game/select/:year', (req, res) => {
    fs.readFile('./SteamGames.json', (err, data) => {
        if (err) throw err;
        var games = JSON.parse(data);
        var filteredgames = JSON.parse(data).filter(function (entry) {
            return entry.Year >= req.params.year;
        });
        res.status(200).json(filteredgames)
    });
})



app.get('/game2/:name', (req, res) => {
    fs.readFile('./SteamGames.json', (err, data) => {
        if (err) throw err;
        var games = JSON.parse(data);
        var filteredgames = JSON.parse(data).filter(function (entry) {
            if (entry.Game === req.params.name) {
                return entry.GameLink
            }
        });
        res.status(200).json(filteredgames[0]['GameLink'])
    });
})