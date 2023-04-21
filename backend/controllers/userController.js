const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const loginUser = asyncHandler (async (req, res) => { 
    res.json({ message: 'Login User' }); 
})

const registerUser = asyncHandler (async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) { 
        res.status(400)
        throw new Error('Please add all field')
    }

    const userExists = await User.findOne({ email })
    
    if (userExists) { 
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
  
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    res.json({ message: 'Register User' });
});

const getMe = asyncHandler (async (req, res) => {
  res.json({ message: 'User data display' });
});

module.exports = {
    loginUser,
    registerUser,
    getMe
}