import { useGetBidsByAuctionId } from "../../hooks/useBid";
import { useFetchUserById } from "../../hooks/useUsers";
import styles from '../../styles/BidTable.module.css'
 
function BidTable({ auctionId }) {
  const { data: bids, isLoading, error } = useGetBidsByAuctionId(auctionId);

  if (isLoading) {
    return <div>Loading bids...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles['bid-table']}>
      {bids.map((bid, i) => (
        <div className={styles['bid-data-item']} key={i}>
					<p className={styles['bid-text']}>User ID: {bid.userId}</p>
          {/* Fetch user data based on bid.userId */}
					<UserData userId={bid.userId} />
          <p className={styles['bid-text']}>Amount: {bid.amount}</p>
          <p>{ bid.timestamp}</p>
        </div>
      ))}
    </div>
  );
}

function UserData({ userId }) {
  const { data: user, isLoading, error } = useFetchUserById(userId);

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p>Error loading user data: {error.message}</p>;
  }

  return <p className={styles['bid-text']}>User name: {user.username}</p>;
}

export default BidTable;
