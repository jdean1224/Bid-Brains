import { Outlet } from 'react-router-dom'
import styles from '../styles/GlobalStyles.module.css'
import Header from './Header'

function AppLayout() {
	return (
		<div className={styles['app-layout']}>
			<Header/>
			<main>
				<Outlet />
			</main>
		</div>
	)
}

export default AppLayout
