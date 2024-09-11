import { Divider, Flex, Typography } from 'antd'

import AddTask from './AddTask'
import Tasks from './Tasks'
import UpdateModal from './UpdateModal'

const Todo = () => {
	return (
		<Flex
			vertical
			className='container px-3 sm:px-0 mx-auto my-5'
		>
			<Typography.Title level={2}>My Tasks</Typography.Title>
			<Divider />
			<AddTask />
			<Tasks />
			<UpdateModal />
		</Flex>
	)
}

export default Todo
