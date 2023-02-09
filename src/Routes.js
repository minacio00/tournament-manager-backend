const { Router } = require('express');
const tournamentController = require('./Controllers/tournamentController');
const serverRouter = Router();

serverRouter.get('/tournaments/view',tournamentController.tournaments);
serverRouter.post('/register/:username', tournamentController.userSubscription);
serverRouter.post('/newevent', tournamentController.newBracket);

module.exports = serverRouter;