import express from 'express'
import { Authenticated } from '../Middlewares/auth.js';
import { login, profile, register, users } from '../Controllers/User.js';
const router=express.Router();

// register user
// router.post("/register",register)
router.post("/register", register)

// login
router.post('/login',login)

// get all users 
router.get('/all',users)

// get user profile
router.get('/profile',Authenticated,profile)

export default router