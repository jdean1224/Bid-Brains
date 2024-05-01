import Bid from '../models/bid.js'

export const placeBid = async (req, res) => {
	try {
		const { auctionId, userId, amount } = req.body
			if (!amount || isNaN(parseFloat(amount))) {
			return res.status(400).json({message: 'Please enter a valid bid amount'})
		}

		const bid = await Bid.create({ auctionId, userId, amount })
		return res.status(201).json({message: 'Bid placed successfully', bid})
	} catch (error) {
		console.error('Error placing bid:', error)
		return res.status(500).json({ message: 'Internal server error'})
	}
}

export const getBidsByAuctionId = async (req, res) => {
	try {
		const { auctionId } = req.params
		const bids = await Bid.findAll({
			where: { auctionId },
			order: [['timestamp', 'DESC']]
		})
		console.log('getBidsByAuctionId:', req.params)
		res.json(bids)
	} catch (error) {
		console.log('getBidsByAuctionId:', req.params)
		console.error('Error fetching bids by auction ID:', error)
		res.status(500).json({message: 'Internal server error'})
	}
}