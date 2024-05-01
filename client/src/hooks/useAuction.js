import { useMutation, useQuery } from '@tanstack/react-query'
import { createAuction as createAuctionApi, getAllAuctions as getAllAuctionsApi, getAuctionById as getAuctionByIdApi } from '../api/apiAuction'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../contexts/UserProvider'

export function useCreateAuction() {
	const navigate = useNavigate()
	const { mutate: createAuction, isLoading } = useMutation({
		mutationFn: createAuctionApi,
		onError: (error) => {
      toast.error(error.message)
    },
		onSuccess: () => {
			navigate('/home', { replace: true })
			toast.success('Successfully created auction!')
		}
	})
 
	return {createAuction, isLoading}
}

export function useGetAllAuctions() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['auctions'], 
    queryFn: getAllAuctionsApi,
    onError: (error) => {
			toast.error(error.message);
			console.log(`data: ${data}`)
    },
    onSuccess: () => {
			console.log('Successfully fetched all auctions');
			console.log(`data: ${data}`)
    },
  });

  return { data, isLoading, error };
}

// export function useGetAuctionById() {
// 	console.log('Running!!!!!!! Yeah!!')
// 	const { data, isLoading, error } = useQuery({
// 		queryKey: ['auction'],
// 		queryFn: getAuctionByIdApi,
// 		onError: (error) => {
// 			toast.error(error.message)
// 			console.log('auctionById:', data)
// 		},
// 		onSuccess: () => {
// 			console.log(`Successfully fetched auction by ID`)
// 			console.log(`data: ${data}`)
// 		}
// 	})

// 	return { data, isLoading, error }
// }

 
export const useGetAuctionById = (auctionId) => {
	const { userDispatch } = useUserContext()
	const { data, isLoading, error } = useQuery({
    queryKey: ['auction', auctionId],
		queryFn: () => getAuctionByIdApi(auctionId),
		onSuccess: () => {
		userDispatch({type: 'HANDLE_PASS_USER_ID', payload: data.userId})
		}
	});
	
	return { data, isLoading, error }
}
	
   
 