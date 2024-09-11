import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from './useRedux'
import { addTask } from '../redux/slices/tasks.slice'
import { RootState } from '../redux/store'

export const useTasks = () => {
	const dispatch = useAppDispatch()
	const reduxTasks = useAppSelector((state: RootState) => state.tasks)

	const setNewTask = useCallback(
		(data: ITask) => {
			dispatch(addTask(data))
		},
		[dispatch]
	)

	return {
		reduxTasks,
		setNewTask
	}
}
