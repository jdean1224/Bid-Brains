import global from '../styles/GlobalStyles.module.css' 
import UserProfile from '../features/user/UserProfile'

function UserProfilePage() {
	return (
		<div className={global.page}>
			<UserProfile/>
		</div>
	)
}

export default UserProfilePage
