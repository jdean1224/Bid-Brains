import express from 'express'
import {handleImageUpload, getAllAuctions, getAuctionById, createAuction } from '../controllers/auctionController.js'
import * as AuthController from '../controllers/authController.js'
import { placeBid, getBidsByAuctionId } from '../controllers/bidController.js'

const { protect } = AuthController
 
const router = express.Router()

router
	.get('/', getAllAuctions)

router
	.get('/:id', getAuctionById)
 
router
	.post('/create', handleImageUpload, createAuction)
	
router
	.post('/bid', placeBid)

router
	.get('/bid/:auctionId', getBidsByAuctionId)

export default router