import asyncHandler from "../middleware/asyncHandler.js";
import Goal from "../models/goalModel.js";
import User from "../models/userModel.js";

// @desc Get goals
// @route  GET /api/goals
// @access Private
const getGoals = asyncHandler(async(req,res) => {
  const goals = await Goal.find({user : req.user._id})
  res.status(200).json(goals)
})

// @desc Create a goal
// @route  POST /api/goals
// @access Private
const setGoal = asyncHandler(async(req,res) => {
  if(!req.body.text){
    res.status(400)
    throw new Error('Please add a text field')
  }else{
    const goal = await Goal.create({user: req.user._id,text : req.body.text})
    res.status(200).json(goal)
  }
})

// @desc Update goals
// @route  PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async(req,res) => {
  const goal = await Goal.findById(req.params.id)
  const user = await User.findById(req.user._id)

  if(!user){
    res.status(404);
    throw new Error('Not Authorized user to update')
  }

  if(user._id.toString() === goal.user.toString()){
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})

    res.status(200).json(updatedGoal)
  }else{
    res.status(400);
    throw new Error('Goal not found!')
  }
})

// @desc Delete goals
// @route  DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async(req,res) => {
  const goal = await Goal.findById(req.params.id)

  const user = await User.findById(req.user._id)

  if(!user){
    res.status(404);
    throw new Error('An Authorized user could not have been found to delete it')
  }

  if(user._id.toString() === goal.user.toString()){

  await Goal.findByIdAndRemove(req.params.id )
  res.status(200).json({id: req.params.id})

  }else{
    res.status(400)
    throw new Error('Not found, not deleted!')
  }
} 
)


export {getGoals, setGoal, updateGoal, deleteGoal}