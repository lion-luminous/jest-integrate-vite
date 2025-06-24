import { Key } from 'react'
import { Empty, Space, Table, TableProps, Tag } from 'antd'

import { useTasks } from '../hooks'
import DeleteTask from './Actions/DeleteTask'
import ChangeStatus from './Actions/ChangeStatus'
import EditTask from './Actions/EditTask'

const columns: TableProps<ITask>['columns'] = [
	{
		title: 'ID',
		dataIndex: 'taskId',
		key: 'taskId',
		render: (id: string) => id.slice(-5)
	},
	{
		title: 'Task',
		dataIndex: 'desc',
		key: 'desc',
		width: 300,
		render: (desc: string, record: ITask) => (
			<Space direction='vertical'>
				<h4 className='font-bold text-lg'>{record.title}</h4>
				<p>{desc}</p>
			</Space>
		)
	},
	{
		title: 'Status',
		key: 'status',
		dataIndex: 'status',
		render: (status: TaskStatus) => (
			<Tag
				color={
					status === 'COMPLETED'
						? 'green'
						: status === 'NOT_COMPLETED'
							? 'red'
							: 'yellow'
				}
			>
				{status === 'COMPLETED'
					? 'Done'
					: status === 'NOT_COMPLETED'
						? 'Not completed'
						: 'Pending'}
			</Tag>
		),
		filters: [
			{
				text: 'COMPLETED',
				value: 'COMPLETED'
			},
			{
				text: 'NOT_COMPLETED',
				value: 'NOT_COMPLETED'
			},
			{
				text: 'PENDING',
				value: 'PENDING'
			}
		],
		onFilter: (value: string | boolean | Key | null, record: ITask) => {
			if (typeof value === 'string') {
				return record.status === value
			}
			return false
		}
	},
	{
		title: 'Mark',
		key: 'mark',
		render: (_, record) => (
			<Space size='middle'>
				<ChangeStatus task={record} />
				<DeleteTask task={record} />
				<EditTask task={record} />
			</Space>
		)
	}
]

const Tasks = () => {
	const { reduxTasks } = useTasks()

	if (!reduxTasks.length) return <Empty description='No any tasks added!' />

	return (
		<Table
			columns={columns}
			dataSource={reduxTasks}
			scroll={{ x: 900 }}
		/>
	)
}

export default Tasks
