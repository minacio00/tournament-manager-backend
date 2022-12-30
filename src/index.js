const express = require('express');
const cors =  require('cors');
// import { firebaseConfig } from './firebaseCredentials.js';
// import {initializeApp} from "firebase/app";
//todo : savlar dados no backend, criar rota que devolve json do campeonato e todos os campeonatos disponíveis

const app =  express();
app.use(cors({credentials: true, origin: true}));
app.options("*",cors());
app.use(express.json());
// const firebaseapp = initializeApp(firebaseConfig);
app.post('/newevent', (req, res) => {
  // console.log(req.body)
  const NumberOfParticipants  = parseInt(req.body.NumberOfParticipants);
  const bracket = [];
  let participantsId = 0;
  console.log(bracket.length)
  for (let index = 0; index < NumberOfParticipants-1; index++){
    bracket.push({
      id: index,
      nextMatchId: index+1,
      tournamentRoundText: '3',
      startTime: '2021-05-30',
      state: 'SCHEDULED',
      participants: [
        {
          id: participantsId,
          resultText: null,
          stataus: 'SCHEDULED',
          name: 'TBD',
          picture: '',
        }
      ,
      {
        id: participantsId+1,
        resultText: null,
        stataus: 'SCHEDULED',
        name: 'TBD',
        picture: '',
      }
    ],
    })
    participantsId+2;
  }
  console.log(bracket);
  res.status(200).json(bracket);
}
);
app.listen(8080, () => { console.log("listening to 8080") });
