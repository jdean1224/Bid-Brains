import { createContext, useContext, useReducer } from "react"

const initialState = {
	userId: '',
	currentUserId: '',
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'HANDLE_PASS_USER_ID':
			return { ...state, userId: action.payload }
		case 'HANDLE_CURRENT_USER_ID':
			return { ...state, currentUserId: action.payload }
		default:
			return state
	}
}

const UserContext = createContext()
export const useUserContext = () => useContext(UserContext)

function UserProvider({ children }) {
		const [userState, userDispatch] = useReducer(reducer, initialState)

	return (
		<UserContext.Provider value={{userState, userDispatch}}>
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider
