import express from 'express'
import * as UserController from '../controllers/userController.js'
import * as AuthController from '../controllers/authController.js'

const { createUser, getUsers, getUserById } = UserController
const {signup, login, protect, logout} = AuthController
 
const router = express.Router()
 
router
	.post('/signup', signup)

router
	.post('/login', login)
	.post('/logout', logout)


router
	.route('/')
	.post(createUser)
	.get(getUsers)

router
	.route('/:id')
	.get(getUserById)

	export default router