import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ITask[] = [
        {
                key: 'demo-1',
                taskId: 'demo-task-1',
                title: 'Neural Bridge Configuration',
                desc: 'Initialize quantum entanglement protocols for cyberpunk data synchronization',
                status: 'PENDING'
        },
        {
                key: 'demo-2', 
                taskId: 'demo-task-2',
                title: 'Ethereal Portal Calibration',
                desc: 'Fine-tune dimensional gateway parameters for optimal degenerate performance',
                status: 'COMPLETED'
        },
        {
                key: 'demo-3',
                taskId: 'demo-task-3', 
                title: 'Cyber Reality Synthesis',
                desc: 'Deploy advanced AI algorithms for reality manipulation and consciousness transfer',
                status: 'NOT_COMPLETED'
        }
]

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
