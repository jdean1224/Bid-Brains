import {useQuery} from '@tanstack/react-query'
import { getAllUsers, getUserById } from '../api/apiUsers'

export const useFetchUsers = () => {
	return useQuery({
		queryKey: ['userData'],
		queryFn: getAllUsers,
	})
}  

export const useFetchUserById = (userId) => {
	return useQuery({
		queryKey: ['userData', userId],
		queryFn: () => getUserById(userId)
	})
}