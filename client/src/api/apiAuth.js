import axios from 'axios'

export async function signup(data) {
	try {
		const response = await axios.post('http://localhost:3001/users/signup', data)
	return response.data
	} catch (err) {
		console.error('Error creating new user:', err.message)
		throw new Error(err.response.data.message || 'Failed to create user')
	}
}

export async function login({ email, password }) {
	axios.defaults.withCredentials = true
	try {
		const response = await axios.post('http://localhost:3001/users/login', { email, password })
		return response.data
	} catch (err) {
		console.error('Error signing user in:', err.message)
		throw new Error(err.response.data.message)
	}
}

export async function logout() {
	try {
		const response = await axios.post('http://localhost:3001/users/logout')
		console.log(response.data)
	} catch (error) {
		console.error('Error logging user out:', error.response.data.error)
	}
}