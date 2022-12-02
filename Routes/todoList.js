const express = require('express');
const passport = require('passport')
const listController = require('../Controllers/todoList');

const listRouter = express.Router();

// Get all schedules
listRouter.get('/', listController.getAllSchedule)

// Get schedule by Id
listRouter.get('/:id', listController.getSingleScheduleById)

// Create List
listRouter.post('/', listController.createList)

// Update List
listRouter.put('/:id', passport.authenticate('jwt', {session: false}), listController.updateList)

// Delete List
listRouter.delete('/:id', passport.authenticate('jwt', {session: false}), listController.deleteList)


module.exports = listRouter