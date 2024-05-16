import axios from 'axios'

export async function createAuction(formData) {
	try {
		const { data } = await axios.post('http://localhost:3001/auctions/create', formData)
	return data
	} catch (err) {
		console.error('Error creating auction:', err.message)
		throw new Error(err.response.data.message || 'Failed to create auction')
	}
}

export async function getAllAuctions() {
	try {
		const response = await axios.get('http://localhost:3001/auctions')
		// console.log(data)
		// console.log('data:', JSON.stringify(data.auctions));
		
		// console.log('1) getAllAuctions Function: ',response.data.auctions)
		return response.data.auctions
	} catch (err) {
		console.error('Error fetching all auctions:', err.message)
		throw new Error(err.response.data.message || 'Failed to fetch  all auction data')
	}
}

export async function getAuctionById(auctionId) {
	try {
		const response = await axios.get(`http://localhost:3001/auctions/${auctionId}`)
		// console.log('GetAuction By Id:', response.data.auction)
		return response.data.auction
	} catch (err) {
		console.error('Error fetching auction by ID:', err.message)
		throw new Error(err.response.data.message || 'Failed to fetch auction data by ID')
	}
}





