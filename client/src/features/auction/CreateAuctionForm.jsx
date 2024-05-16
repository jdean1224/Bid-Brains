// CreateAuctionForm.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FileUpload from './FileUpload';
import { useCreateAuction } from '../../hooks/useAuction';
import styles from '../../styles/Auction.module.css';
import { useUserContext } from '../../contexts/UserProvider';

function CreateAuctionForm() {
  const { userState } = useUserContext()
  const { userId } = userState
  const { register, handleSubmit, reset } = useForm();
  const { createAuction } = useCreateAuction();
  const [selectedFiles, setSelectedFiles] = useState([])
    
  const onSubmit = async (formData) => {
  const { itemDescription, bid, highestBid, condition, quantity, dispatch, brand, color, size, bidStart, bidLength, sellersDescription, returns } = formData;
  if (!itemDescription) {
    alert('Please enter item description.');
    return;
  }
  if (!bid) {
    alert('Please enter a starting bid.');
    return;
  }
   if (!selectedFiles || selectedFiles.length === 0) {
      alert('Please upload at least one image of the item.');
      return;
  }
    try {
      const bidStart = new Date().getTime()
    
    // Create FormData instance
    const formDataToSend = new FormData();
    formDataToSend.append('itemDescription', itemDescription);
    formDataToSend.append('bid', bid);
    formDataToSend.append('highestBid', bid)
    formDataToSend.append('userId', userId)
    formDataToSend.append('condition', condition)
    formDataToSend.append('quantity', quantity)
    formDataToSend.append('dispatch', dispatch)
    formDataToSend.append('brand', brand)
    formDataToSend.append('color', color)
    formDataToSend.append('size', size),
    formDataToSend.append('bidStart', bidStart)
    formDataToSend.append('bidLength', bidLength),
    formDataToSend.append('sellersDescription', sellersDescription)
    formDataToSend.append('returns', returns)
    
    // Append each image to FormData
    selectedFiles.forEach((file) => {
      formDataToSend.append('images', file);
    });

    // Send formData to the server
    await createAuction(formDataToSend);
    
    // Reset the form
    reset();
  } catch (error) {
    console.error('Error creating auction:', error.message);
    alert('Failed to create auction.');
  }
};

 const handleFileDrop = (acceptedFiles) => {
    setSelectedFiles(acceptedFiles);
  };

  return (
    <div className={styles['create-auction-form-container']}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['create-auction-form']}>

        <div className={styles['form-item']}>
          <label className={styles.label}>Item Description</label>
          <input className={styles.input} id='itemDescription' type='text' {...register('itemDescription')} />
        </div>

        <div className={styles['form-item']}>
          <label className={styles.label}>Bid</label>
          <input className={styles.input} id='bid' type='text' {...register('bid')} />
        </div>

        <div className={styles['form-item']}>
          <label className={styles.label}>Condition</label>
          <input className={styles.input} id='condition' type='text' {...register('condition')} />
        </div>

         <div className={styles['form-item']}>
          <label className={styles.label}>Quantity</label>
          <input className={styles.input} id='quantity' type='text' {...register('quantity')} />
        </div>

        <div className={styles['form-item']}>
          <label className={styles.label}>Dispatch</label>
          <input className={styles.input} id='dispatch' type='text' {...register('dispatch')} />
        </div>

        <div className={styles['form-item']}>
          <label className={styles.label}>Brand</label>
          <input className={styles.input} id='brand' type='text' {...register('brand')} />
        </div>

         <div className={styles['form-item']}>
          <label className={styles.label}>Color</label>
          <input className={styles.input} id='color' type='text' {...register('color')} />
        </div>

         <div className={styles['form-item']}>
          <label className={styles.label}>Size</label>
          <input className={styles.input} id='size' type='text' {...register('size')} />
        </div>

        <div className={styles['form-item']}>
          <label className={styles.label} htmlFor='bidLength'>Bid Length:</label>
          <select className={styles.select} id='bidLength' {...register('bidLength')}>
            <option value='24'>1 day</option>
            <option value='48'>2 days</option>
          </select>
        </div>

        <div className={styles['form-item']}>
          <label className={styles.label}>Seller's Description</label>
          <input className={styles.input} id='sellersDescription' type='text' {...register('sellersDescription')} />
        </div>

         <div className={styles['form-item']}>
          <label className={styles.label}>Returns</label>
          <input className={styles.input} id='returns' type='text' {...register('returns')} />
        </div>

        <FileUpload onDrop={handleFileDrop} />

        <button type='submit' className={styles.button}>Submit</button>
      </form>
    </div>
  );
}

export default CreateAuctionForm;
