import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'

import { useAppDispatch } from '../../hooks'
import { setOpen } from '../../redux/slices/modal.slice'

const EditTask = ({ task }: { task: ITask }) => {
	const dispatch = useAppDispatch()

	return (
		<Button
			disabled={task.status === 'COMPLETED'}
			icon={<EditOutlined />}
			onClick={() => dispatch(setOpen(task))}
		/>
	)
}

export default EditTask
