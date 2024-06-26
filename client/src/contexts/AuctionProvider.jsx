import { createContext, useContext, useReducer } from "react"

const initialState = {
	auctionId: '',
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'HANDLE_CURRENT_AUCTION_ID':
			return { ...state, auctionId: action.payload }
		default:
			return state
	}
}

const AuctionContext = createContext()
export const useAuctionContext = () => useContext(AuctionContext)

function AuctionProvider({ children }) {
		const [auctionState, auctionDispatch] = useReducer(reducer, initialState)

	return (
		<AuctionContext.Provider value={{auctionState, auctionDispatch}}>
			{children}
		</AuctionContext.Provider>
	)
}

export default AuctionProvider
