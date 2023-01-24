const express = require('express');
const cors =  require('cors');
const {v4: uuidv4} = require('uuid');

// import { firebaseConfig } from './firebaseCredentials.js';
// import {initializeApp} from "firebase/app";
//todo : savlar dados no backend, criar rota que devolve json do campeonato e todos os campeonatos disponíveis

const app =  express();
app.use(cors({credentials: true, origin: true}));
app.options("*",cors());
app.use(express.json());
// const firebaseapp = initializeApp(firebaseConfig);

app.post('/register/:username', (req,res) => {
  // deve receber o campeonato, e o nome do usuário se cadastrando
  // posicionar o participante na chave
  console.log(req.body, "register");
  let tournament = req.body;
  const posIndex = tournament.currentEvent.matches.findIndex((value) => {
    if((value.participants.length < 2) && (value.tournamentRoundText == '1')){
      return true
    }
  }); // jogos que tiverem menos de dois confirmados
  if (posIndex != -1) {
    tournament.currentEvent.matches[posIndex].participants.push({
      "id": uuidv4(), // adicionar id unico,
      "resultText": null,
      "isWinner": false,
      "status": null,
      "name": req.params.username
    })
    res.status(200).json(tournament);
  }
  else {
    res.status(500);
  }
});

app.post('/newevent', (req, res) => {
  // console.log(req.body)
  const NumberOfParticipants  = parseInt(req.body.NumberOfParticipants);
  const numOfRounds = Math.log2(NumberOfParticipants);
  const bracket = [];
  let j = 1; // duas partidas sempre vão apontar para uma próxima, então a cada duas decrementar o nextMatchId
  let i = 1;
  let nextMatchId = NumberOfParticipants;
  let matchId =  NumberOfParticipants-1;
  let currentRound = numOfRounds;
  let gamesPerRound = 1;
  
  for (let index = 0; index < NumberOfParticipants-1; index++){
    bracket.push({
      id: matchId,
      nextMatchId: index === 0 ? null : nextMatchId,
      tournamentRoundText: currentRound.toString(),
      startTime: req.body.EventDate,
      state: 'SCHEDULED',
      participants: [],
    });
    matchId--
    if(j % 2 === 1){ nextMatchId--}
    if(i === gamesPerRound){
      currentRound = currentRound - 1;
      gamesPerRound = i+gamesPerRound * 2; // comenaçando pela final, a cada round o número de jogos na chave dobra: 1 jogo na final, 2 na semi....
    }
    i++ // contador de partidas geradas
    j++ // contador para controlar o decremento do id da próxima partida
  }
  console.log(bracket);
  res.status(200).json(bracket);
}
);
app.listen(8080, () => { console.log("listening to 8080") });
