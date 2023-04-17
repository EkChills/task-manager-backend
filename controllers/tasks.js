const Tasks = require('../model/tasks')
const {createCustomError} = require('../errors/customError')
const asyncWrapper = require('../middleware/async')

const getAllTasks = asyncWrapper( async(req,res, next) => {
  const tasks = await Tasks.find({})
  res.status(200).json({tasks:tasks})
})

const createTask = async(req,res,next) => {
  try {
    const task = await Tasks.create(req.body)
    if(req.body === '') {
      return next(createCustomError('bad request', 400))
    }
    res.status(201).json(task)
  } catch (error) {
    next(error);
  }
}

const getTask = async(req, res, next) => {
  try {
    const {id:taskID} = req.params
    const task = await Tasks.findOne({_id:taskID})
    if(!task) {
      return next(createCustomError(`no task with id ${taskID}`, 404))
    }
    res.status(200).json({task})
    
  } catch (error) {
    next(error)
  }
}

const deleteTask = asyncWrapper(
  async(req,res,next) => {
    const {id:taskID} = req.params
    const deletedTask = await Tasks.findOneAndDelete({_id:taskID})
    if(!deleteTask) {
      return next(createCustomError(`no task with id ${taskID}`, 404))
    }
    res.status(200).json({task:deletedTask})
  }
)

const updateTask = asyncWrapper(
  async(req,res,next) => {
    const {id:taskID} = req.params
    const updatedTask = await Tasks.findOneAndUpdate({_id:taskID}, req.body, {
      new:true,
      runValidators:true,
    })  
    if(!updatedTask) {
      return next(createCustomError(`no task with id ${taskID}`, 404))
    }
    res.status(200).json({task:updatedTask})
  }
)


module.exports = {getAllTasks, createTask, getTask, deleteTask, updateTask}