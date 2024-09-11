import { Dropdown, MenuProps } from 'antd'

import { useAppDispatch } from '../../hooks'
import { changeStatus } from '../../redux/slices/tasks.slice'

type ItemProps = {
	key: TaskStatus
	label: TaskStatus
}

const items: ItemProps[] = [
	{
		key: 'COMPLETED',
		label: 'COMPLETED'
	},
	{
		key: 'NOT_COMPLETED',
		label: 'NOT_COMPLETED'
	},
	{
		key: 'PENDING',
		label: 'PENDING'
	}
]

const ChangeStatus = ({ task }: { task: ITask }) => {
	const { taskId } = task
	const dispatch = useAppDispatch()

	const onMenuClick: MenuProps['onClick'] = ({ key }) => {
		dispatch(changeStatus({ taskId, status: key as TaskStatus }))
	}

	return (
		<div>
			<Dropdown.Button
				onClick={() => dispatch(changeStatus({ taskId, status: 'COMPLETED' }))}
				type='dashed'
				menu={{ items, onClick: onMenuClick }}
			>
				Done
			</Dropdown.Button>
		</div>
	)
}

export default ChangeStatus
