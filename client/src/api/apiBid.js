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

export async function updateHighestBid({auctionId, highestBid}) {
	try {
		console.log('Running!!!!!!!!!!')
		console.log('New highest bid:', {highestBid});
		const response = await axios.put(`http://localhost:3001/auctions/update/${auctionId}`, { highestBid })
		console.log('Auction updated:', response.data);
		return response.data.auction
	} catch (error) {
		console.error('Failed to update the highestBid')
		throw new Error('Failed to update the highest bid')
	}
}