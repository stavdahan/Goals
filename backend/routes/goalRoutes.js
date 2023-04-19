const express = require('express')
const router = express.Router()
const {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
    deleteGoals,
} = require('../goalController/goalController')

router.route('/').get(getGoals).post(setGoal).delete(deleteGoals)

router.route('/:id').put(updateGoal).delete(deleteGoal);

module.exports = router