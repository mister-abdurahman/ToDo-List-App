const express = require('express')
const list = require('../Models/list')
require('../Middleware/passport') // we need this line for our 

const app = express()


// CRUD controller functions

// Get All schedules
async function getAllSchedule(req, res, next){
 try {
    const schedules = await list.find()
    res.json({status: "success", schedules})
 } catch (error) {
    next(error)
 }
}

// Get single schedule by ID ✔
async function getSingleScheduleById(req, res, next){
    try {
       const id = req.params.id
       const schedule = await list.findById(id)
       res.json({status: "success", schedule})
    } catch (error) {
       next(error)
    }
   }

//Create a List
async function createList(req, res, next) {
    const listContent = req.body;
    try {
        const newList = await list.create(listContent);
        res.status(201).json({status: "success", newList});
    } catch (error) {
        next(error);
    }
}

// Update a List
async function updateList(req, res, next){
    try {
        const id = req.params.id
        const newUpdate = req.body
        const updatedList = await list.findOneAndUpdate({_id: id}, newUpdate, {new: true})
        res.json({status: "success" , updatedList})
    } catch (error) {
        next(error)
    }
}    

// Delete a Blog
async function deleteList(req, res, next) {
    const id = req.params.id
     try {
        const listToBeDeleted = await list.findOneAndDelete({_id: id})
        res.json({status: "success", message: "successfully deleted this list", listToBeDeleted});
    } catch (error) {
        next(error);
    }
}



module.exports = {
    getAllSchedule,
    getSingleScheduleById,
    createList,
    updateList,
    deleteList
}