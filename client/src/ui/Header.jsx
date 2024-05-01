import { Link } from 'react-router-dom'
import styles from '../styles/Header.module.css'
import { useLogout } from '../hooks/useAuth.js'
import { useFetchUserById } from '../hooks/useUsers.js'
import { useUserContext } from '../contexts/UserProvider.jsx'
import { useNavigate } from 'react-router-dom'

function Header() {
	const { userState } = useUserContext()
	const { userId } = userState
	// console.log('USER ID: ', userId)
	const { logout, isLoading } = useLogout()
	const userName = useFetchUserById(userId).data
	const navigate = useNavigate()

	return (
		<header className={styles.header}>

			<Link className={styles.logo} to='/home'>Bid Brains</Link>

			<Link className={styles.link} to='/login'>Log In</Link>

			<Link className={styles.link} to='/signup'>Signup</Link>

			<Link className={styles.link} to='/auction/create'>Create Auction</Link>

			<button className={styles.button} disabled={isLoading} onClick={logout}>Logout</button>
			
			{/* <p className={styles.username}>{data}</p> */}
			
			<>
				{userName  &&
					<>
						<p className={styles.username}>{userName.username}</p>
					<button onClick={() =>  navigate('/user')}>Profile</button>
					</>}
			</>
		</header>
	)
}

export default Header
