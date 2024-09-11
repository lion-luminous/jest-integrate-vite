import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: IModal = {
	isOpen: false,
	data: null
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setOpen: (state, action: PayloadAction<ITask>) => {
			state.isOpen = !state.isOpen
			state.data = action.payload
		},
		setClose: (state) => {
			state.isOpen = false
		}
	}
})
export const { setOpen, setClose } = modalSlice.actions
export default modalSlice.reducer
