import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { placeBid as placeBidApi, getBidsByAuctionId as getBidsByAuctionIdApi} from '../api/apiBid'
import toast from 'react-hot-toast'

export function usePlaceBid(auctionId) {
	const queryClient = useQueryClient()
	const { mutate: placeBid, isLoading } = useMutation({
		mutationFn: placeBidApi,
		onError: (error) => {
			toast.error(error.message)
    },
		onSuccess: () => {
			toast.success('Bid was placed successfully!')
			queryClient.invalidateQueries(['bids', auctionId])
		}
	})
	return { placeBid, isLoading }
}

export function useGetBidsByAuctionId(auctionId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['bids', auctionId],
    queryFn: async () => getBidsByAuctionIdApi(auctionId)
  });
  return { data, isLoading, error };
}

// export function useGetBidsByAuctionId(auctionId) {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ['bids', auctionId],
//     queryFn: async () => {
//       try {
//         console.log('Fetching bids for auction ID:', auctionId);
//         const bids = await getBidsByAuctionIdApi(auctionId);
//         console.log('Bids:', bids);
//         return bids;
//       } catch (error) {
//         console.error('Error fetching bids:', error);
//         throw error;
//       }
//     }
//   });
//   return { data, isLoading, error };
// }
