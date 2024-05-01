import axios from 'axios'

export const getAllUsers = async () => {
	const response = await axios.get('http://localhost:3001/users')
	return response.data
} 

export const getUserById = async (userId) => {
	try {
		const response = await axios.get(`http://localhost:3001/users/${userId}`)
		// console.log(response.data)
		return response.data
	} catch (error) {
		console.error('Error fetching user')
	}
}