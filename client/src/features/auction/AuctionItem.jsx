import { useNavigate } from 'react-router-dom'
import styles from '../../styles/Auction.module.css';

function AuctionItem({ auction }) {
  const navigate = useNavigate()
  const { id, itemDescription, bid, AuctionImages } = auction;

  return (
    <div className={styles['auction-item-container']}>
      <p className={styles['item-text']}>{itemDescription}</p>
      <div className={styles['image-container']}>
        {AuctionImages.map((image) => (
          <img className={styles['auction-image']} key={image.id} src={`http://localhost:3001/${image.path.replace('public/', '')}`} alt={image.name} />
        ))}
      </div>
      <p className={styles['item-text']}>{`Starting Bid: ${bid}`}</p>
      <button onClick={() => navigate(`/auction/${id}`)} className={styles['place-bid-btn']}>View Details</button>
    </div>
  );
}

export default AuctionItem;
