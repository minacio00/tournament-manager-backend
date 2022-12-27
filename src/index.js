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
  console.log(req.body)
  res.status(200).json({"user": "amado"});
}
);
app.listen(8080, () => { console.log("listening to 8080") });
