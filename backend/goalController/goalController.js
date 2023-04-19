const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find()
  res.status(200).json(goals)
})

const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) { 
        res.status(400)
        throw new Error('Please add a text field')
    }
  
  const goal = await Goal.create({
    text: req.body.text
  })

  res.status(200).json(goal);
})

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  
  if (!goal) { 
    res.status(400)
    throw new Error('Goal not found')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })

  res.status(200).json(updatedGoal)
})

const deleteGoal = asyncHandler(async (req, res) => {
  console.log("req.params.id:", req.params.id);
  const goal = await Goal.findById(req.params.id);
  console.log("goal:", goal);

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  await Goal.deleteOne(goal);
  res.status(200).json({ message: `Deleted Goal ${req.params.id}` });
});

const deleteGoals = asyncHandler(async (req, res) => { 
  const goals = await Goal.deleteMany({})
  res.status(200).json(goals)
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
    deleteGoals
}