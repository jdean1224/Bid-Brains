import { useEffect } from 'react';
import AuctionItem from './AuctionItem';
import { useGetAllAuctions } from '../../hooks/useAuction';
import styles from '../../styles/Auction.module.css';

function Auction() {
  const { data: auctions, isLoading, error } = useGetAllAuctions();
  // console.log(`3) Auctions: ${auctions}`);
	
	useEffect(() => {
		if (error) {
			console.error('Error fetching all auctions:', error.message);
		}
	}, [auctions, error]);
	
  return (
		
		<main className={styles['auction-container']}>
			
			{isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching auctions. Please try again later.</p>
      ) : (
        auctions.map((auction) => (
          <AuctionItem key={auction.id} auction={ auction} />
        ))
      )}
    </main>
  );
}

export default Auction;
