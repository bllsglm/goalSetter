import asyncHandler from "../middleware/asyncHandler.js"

// @desc Get goals
// @route  GET /api/goals
// @access Private
const getGoals = asyncHandler(async(req,res) => {
  res.status(200).json({message : 'get goals'})
})

// @desc Create a goal
// @route  POST /api/goals
// @access Private
const setGoal = asyncHandler(async(req,res) => {
  
  if(!req.body.text){
    res.status(400)
    throw new Error('Please add a text field')
  }else{
    res.status(201).json({text : req.body.text})
  }
})

// @desc Update goals
// @route  PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async(req,res) => {
  res.status(200).json({message : `update the goal ${req.params.id}`})
})

// @desc Delete goals
// @route  DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async(req,res) => {
  res.status(200).json({message : `delete the goal ${req.params.id}`})
}
)


export {getGoals, setGoal, updateGoal, deleteGoal}