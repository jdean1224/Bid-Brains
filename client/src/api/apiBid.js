import axios from 'axios'

export async function placeBid({ auctionId, userId, amount }) {
	try {
		const response = await axios.post('http://localhost:3001/auctions/bid', {
			auctionId,
			userId,
			amount: parseFloat(amount)
		})
		// console.log(response.data)
	} catch (error) {
		console.error('Error placing bid:', error)
		alert('Error placing bid. Please try again later.')
	}
}

export async function getBidsByAuctionId(auctionId) {
	try {
		const response = await axios.get(`http://localhost:3001/auctions/bid/${auctionId}`)
		// console.log(response.data)
		return response.data
	} catch (error) {
		console.error('Error fetching bid by auctionId', error)
	}
}