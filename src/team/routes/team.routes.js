const express = require('express');

const { httpGetAllTeams, httpGetTeamById, httpGetAllUsersInTeam } = require('../controller/team.controller')

const teamRouter = express.Router();

const resource = '/teams';

teamRouter.get(`${resource}`, httpGetAllTeams);

teamRouter.get(`${resource}/:id`, httpGetTeamById);

teamRouter.get(`${resource}/users/:id`, httpGetAllUsersInTeam);

module.exports = teamRouter;