import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ITask[] = []

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<ITask>) => {
			state.push(action.payload)
		},
		removeTask: (state, action: PayloadAction<string>) => {
			return state.filter((task) => task.taskId !== action.payload)
		},
		editTask: (state, action: PayloadAction<ITask>) => {
			const index = state.findIndex(
				(task) => task.taskId === action.payload.taskId
			)
			if (index !== -1) {
				state[index] = action.payload
			}
		},
		changeStatus: (
			state,
			action: PayloadAction<{ taskId: string; status: TaskStatus }>
		) => {
			const task = state.find((task) => task.taskId === action.payload.taskId)
			if (task) {
				task.status = action.payload.status
			}
		}
	}
})
export const { addTask, removeTask, editTask, changeStatus } =
	tasksSlice.actions
export default tasksSlice.reducer
