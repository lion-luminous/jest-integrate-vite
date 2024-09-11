import { Button, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import { useAppDispatch } from '../../hooks'
import { removeTask } from '../../redux/slices/tasks.slice'

const DeleteTask = ({ task }: { task: ITask }) => {
	const { taskId, desc } = task
	const dispatch = useAppDispatch()

	const handleConfirmDelete = () => {
		dispatch(removeTask(taskId))
	}

	return (
		<Popconfirm
			title={`Delete "${desc}"?`}
			onConfirm={handleConfirmDelete}
		>
			<Button
				danger
				icon={<DeleteOutlined />}
			/>
		</Popconfirm>
	)
}

export default DeleteTask
