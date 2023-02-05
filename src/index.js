const express = require('express');
const cors =  require('cors');

const {firebaseApp} = require('./firebaseCredentials');
const tournamentController = require('./Controllers/tournamentController');

// import { firebaseConfig } from './firebaseCredentials.js';
// import {initializeApp} from "firebase/app";
//todo : savlar dados no backend, criar rota que devolve json do campeonato e todos os campeonatos disponíveis

const app =  express();
app.use(cors({credentials: true, origin: true}));
app.options("*",cors());
app.use(express.json());

app.post('/register/:username', tournamentController.userSubscription);

app.post('/newevent', tournamentController.newBracket);
app.listen(8080, () => { console.log("listening to 8080") });
