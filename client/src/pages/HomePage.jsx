import Auction from '../features/auction/Auction'
import styles from '../styles/GlobalStyles.module.css'


function HomePage() {
	return (
		<section className={styles.page}>
			
			<Auction/>
			
		</section>
	)
}

export default HomePage
