const {firebaseApp, db} = require('../firebaseCredentials');
const {v4: uuidv4} = require('uuid');
const env = process.env.NODE_ENV

if (env === "test") {
    console.log(env, "env");
    module.exports = {
        async userSubscription(req, res) {
            // deve receber o campeonato, e o nome do usuário se cadastrando
            // console.log(req.body, "register");
            let tournament = req.body;
            const posIndex = tournament.currentEvent.matches.findIndex((value) => {
                if ((value.participants.length < 2) && (value.tournamentRoundText == '1')) {
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
                });
                tournament.currentEvent.confirmed++;
                const ref = db.collection('tournaments');
                const query = ref.where('eventName','==',tournament.currentEvent.eventName);
    
                let eventDocId;
                query.get().then((snapshot) => {
                    if(snapshot.empty){
                        console.log("no document");
                    }
                    else {
                        //  todo: não deixar criar dois eventos com mesmo nome
                        console.log(snapshot.docs[0].id,"doc id");
                        eventDocId = snapshot.docs[0].id;
                    }
                })
                .then(() => {
                    res.status(200).json(tournament.currentEvent);
                    ref.doc(eventDocId).set(tournament.currentEvent);
                });
                
                
            }
            else {
                res.status(500);
            }
        },
    
        async newBracket(req, res) {
            // console.log(req.body)
            const NumberOfParticipants = parseInt(req.body.NumberOfParticipants);
            const numOfRounds = Math.log2(NumberOfParticipants);
            const matches = [];
            let j = 1; // duas partidas sempre vão apontar para uma próxima, então a cada duas decrementar o nextMatchId
            let i = 1;
            let nextMatchId = NumberOfParticipants;
            let matchId = NumberOfParticipants - 1;
            let currentRound = numOfRounds;
            let gamesPerRound = 1;
    
            for (let index = 0; index < NumberOfParticipants - 1; index++) {
                matches.push({
                    id: matchId,
                    nextMatchId: index === 0 ? null : nextMatchId,
                    tournamentRoundText: currentRound.toString(),
                    startTime: req.body.EventDate,
                    state: 'SCHEDULED',
                    participants: [],
                });
                matchId--
                if (j % 2 === 1) { nextMatchId-- }
                if (i === gamesPerRound) {
                    currentRound = currentRound - 1;
                    i=1
                    j++
                    gamesPerRound = gamesPerRound * 2;
                    continue
                    //talvez o i na soma esteja causando bug;
                    // gamesPerRound = i +  gamesPerRound * 2; // comenaçando pela final, a cada round o número de jogos na chave dobra: 1 jogo na final, 2 na semi....
                }
                i++ // contador de partidas geradas
                j++ // contador para controlar o decremento do id da próxima partida
            }
            const colRef = db.collection('tournaments-test').doc();
            colRef.set({
                eventName: req.body.EventName,
                createdBy: req.body.createdBy,
                EventDate: req.body.EventDate,
                Sport: req.body.Sport,
                confirmed: req.body.confirmed,
                NumberOfParticipants: req.body.NumberOfParticipants,
                matches
            })
            .catch((e) =>{
                 console.log(e);
                 res.status(500);
            })
            res.status(200).json(matches);
        },
    
        async tournaments(req, res) {
           const snapshot = await db.collection('tournaments').get({source: "cache"});
           const mappedDocs = snapshot.docs.map(doc => doc.data());
           console.log(mappedDocs);
           res.status(200).json(mappedDocs);
            
        }
    }
} else {
    console.log(env);
    module.exports = {
        async userSubscription(req, res) {
            // deve receber o campeonato, e o nome do usuário se cadastrando
            // console.log(req.body, "register");
            let tournament = req.body;
            const posIndex = tournament.currentEvent.matches.findIndex((value) => {
                if ((value.participants.length < 2) && (value.tournamentRoundText == '1')) {
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
                });
                tournament.currentEvent.confirmed++;
                const ref = db.collection('tournaments');
                const query = ref.where('eventName','==',tournament.currentEvent.eventName);
    
                let eventDocId;
                query.get().then((snapshot) => {
                    if(snapshot.empty){
                        console.log("no document");
                    }
                    else {
                        //  todo: não deixar criar dois eventos com mesmo nome
                        console.log(snapshot.docs[0].id,"doc id");
                        eventDocId = snapshot.docs[0].id;
                    }
                })
                .then(() => {
                    res.status(200).json(tournament.currentEvent);
                    ref.doc(eventDocId).set(tournament.currentEvent);
                });
                
                
            }
            else {
                res.status(500);
            }
        },
    
        async newBracket(req, res) {
            // console.log(req.body)
            const NumberOfParticipants = parseInt(req.body.NumberOfParticipants);
            const numOfRounds = Math.log2(NumberOfParticipants);
            const matches = [];
            let j = 1; // duas partidas sempre vão apontar para uma próxima, então a cada duas decrementar o nextMatchId
            let i = 1;
            let nextMatchId = NumberOfParticipants;
            let matchId = NumberOfParticipants - 1;
            let currentRound = numOfRounds;
            let gamesPerRound = 1;
    
            for (let index = 0; index < NumberOfParticipants - 1; index++) {
                matches.push({
                    id: matchId,
                    nextMatchId: index === 0 ? null : nextMatchId,
                    tournamentRoundText: currentRound.toString(),
                    startTime: req.body.EventDate,
                    state: 'SCHEDULED',
                    participants: [],
                });
                matchId--
                if (j % 2 === 1) { nextMatchId-- }
                if (i === gamesPerRound) {
                    currentRound = currentRound - 1;
                    i=1
                    j++
                    gamesPerRound = gamesPerRound * 2;
                    continue
                    //talvez o i na soma esteja causando bug;
                    // gamesPerRound = i +  gamesPerRound * 2; // comenaçando pela final, a cada round o número de jogos na chave dobra: 1 jogo na final, 2 na semi....
                }
                i++ // contador de partidas geradas
                j++ // contador para controlar o decremento do id da próxima partida
            }
            const colRef = db.collection('tournaments').doc();
            colRef.set({
                eventName: req.body.EventName,
                createdBy: req.body.createdBy,
                EventDate: req.body.EventDate,
                Sport: req.body.Sport,
                confirmed: req.body.confirmed,
                NumberOfParticipants: req.body.NumberOfParticipants,
                matches
            })
            .catch((e) =>{
                 console.log(e);
                 res.status(500);
            })
            res.status(200).json(matches);
        },
    
        async tournaments(req, res) {
           const snapshot = await db.collection('tournaments').get({source: "cache"});
           const mappedDocs = snapshot.docs.map(doc => doc.data());
           console.log(mappedDocs);
           res.status(200).json(mappedDocs);
            
        }
    }
}

