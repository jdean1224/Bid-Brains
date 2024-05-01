import { useParams } from 'react-router-dom'; 
import styles from '../styles/AuctionItem.module.css';
import global from '../styles/GlobalStyles.module.css';
import { useGetAuctionById } from '../hooks/useAuction';
import { usePlaceBid } from '../hooks/useBid'
import { useFetchUserById } from '../hooks/useUsers';
import { useForm } from 'react-hook-form'
import BidTable from '../features/auction/BidTable'
import { useUserContext } from '../contexts/UserProvider';
import { useAuctionContext } from '../contexts/AuctionProvider'
  
function AuctionItemPage() {
  const { auctionId } = useParams(); 
  const { register, getValues, reset, handleSubmit } = useForm()
  const { userState } = useUserContext() 
  const { userId } = userState
  
  const { data: auction, isLoading: auctionLoading, error: auctionError } = useGetAuctionById(auctionId);

  const userQuery = useFetchUserById(auction?.userId || null);
  const user = userQuery.data

  const { placeBid, isLoading } = usePlaceBid()

  // const [highestBid, setHighestBid] = useState(auction?.bid)

  const { auctionState, auctionDispatch } = useAuctionContext()
  const { highestBid } = auctionState
  
  const onSubmit = async () => {
    const amount = getValues('amount')

    if (!amount || isNaN(parseFloat(amount))) {
      alert('Please enter a valid bid amount')
      return
    }

    if (parseFloat(amount) <= parseFloat(auction.bid) || parseFloat(amount) <= parseFloat(highestBid)) {
      alert('Bid amount must be at least one dollar more than the current highest bid.')
      return
    }
    try {
      placeBid({ auctionId, userId, amount: parseFloat(amount) })
      auctionDispatch({type: 'HANDLE_HIGHEST_BID', payload: amount})
      reset()
    } catch (error) {
      console.error('Error placing bid:', error.message)
      alert( 'Failed to place bid')
   }
  }
 
  if (auctionLoading || userQuery.isLoading) {
    return <div className={global.page}>Loading...</div>;
  }

  if (auctionError || userQuery.error) {
    return <div className={global.page}>Error: {auctionError || userQuery.error.message}</div>;
  }

  return (
    <div className={global.page}>
      <div className={styles['auction-item-container']}>
        {auction && (
        <>
          <div className={styles['image-gallery']}>
            {auction.AuctionImages && auction.AuctionImages.map((image) => (
            <img className={styles['auction-item-image']} key={image.id} src={`http://localhost:3001/${image.path.replace('public/', '')}`} alt={image.name} />
          ))}  
          </div>   
          
          <div className={styles['auction-item-stats']}>
            <p className={styles['item-description']}>{auction.itemDescription}</p>
              <p className={styles['auction-username']}><span className={styles['italic-text']}>auction by</span> {user ? user.username : 'Unknown User'}</p>    
              <p>Condition: {auction.condition}</p>  
              <p>Quantity: {auction.quantity}</p>
              <p>Dispatch: {auction.dispatch}</p>
              <p>Brand: {auction.brand}</p>
              <p>Color: {auction.color}</p>
              <p>Size: {auction.size}</p>
              <p>Seller's Description: {auction.sellersDescription}</p>
              <p>Returns: { auction.returns}</p>
              <h3>Auction ID: {auctionId}</h3>
              <p className={styles['starting-bid']}>{`Starting Bid: ${auction.bid}`}</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.input} type="text" placeholder='Enter Bid Amount' id='amount' {...register('amount')} />
                <button type='submit' className={styles['place-bid-btn']}>Place Bid</button>
             </form>
          </div>
                   
        </>
        )}  
        <BidTable auctionId={auctionId} userId={ userId} />
      </div>
    </div>
  );
}

export default AuctionItemPage;
