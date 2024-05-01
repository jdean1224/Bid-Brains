import { useFetchUserById } from "../../hooks/useUsers"
import { useUserContext } from "../../contexts/UserProvider"

function UserProfile() {
	const { userState } = useUserContext()
	const { userId } = userState
	const { data: user, isLoading, error } = useFetchUserById(userId)

	return (
		<div>
			<p>{user.username}</p>
			<p>{user.email}</p>
			<p>{user.fullName}</p>
			<p>{user.streetAddress}</p>
			<p>{user.city}</p>
			<p>{user.state}</p>
			<p>{user.zipCode}</p>
			<p>{ user.phoneNumber}</p>
		</div>
	)
}

export default UserProfile
