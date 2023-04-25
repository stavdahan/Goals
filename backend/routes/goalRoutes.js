const express = require('express')
const router = express.Router()
const {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
    deleteGoals,
} = require('../controllers/goalController')

const { protect } = require('../middleware/authMiddleware')

router
  .route("/")
  .get(protect, getGoals)
  .post(protect, setGoal)
  .delete(protect, deleteGoals);

router
    .route("/:id")
    .put(protect, updateGoal)
    .delete(protect, deleteGoal);

module.exports = router