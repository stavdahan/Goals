const asyncHandler = require('express-async-handler');
const Goal = require('../model/goalModel');
const User = require("../model/userModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id })
  res.status(200).json(goals)
})

const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) { 
        res.status(400)
        throw new Error('Please add a text field')
    }
  
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id
  })

  res.status(200).json(goal);
})

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  
  if (!goal) { 
    res.status(400)
    throw new Error('Goal not found')
  }

  const user = await User.findById(req.user.id);

  if (!user) { 
    res.status(401);
    throw new Error('User not found');
  }

  if (goal.user.toString() !== user.id) { 
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })

  res.status(200).json(updatedGoal)
})

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    if (goal.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
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