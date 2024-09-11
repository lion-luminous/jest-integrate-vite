import { useRef } from 'react'
import { Button, Form, Input, InputRef, message } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'

import { useTasks } from '../hooks'

const AddTask = () => {
	const { setNewTask } = useTasks()
	const [form] = Form.useForm()
	const inputRef = useRef<InputRef | null>(null)

	const handleAddTask = (values: Record<'title' | 'desc', string>) => {
		const { desc, title } = values

		if (!title.trim() || !desc.trim()) {
			message.warning('Please input your title and task')
			return
		}

		setNewTask({
			key: uuidv4(),
			taskId: uuidv4(),
			title,
			desc,
			status: 'NOT_COMPLETED'
		})
		form.resetFields()
		inputRef?.current?.focus()
	}

	return (
		<Form
			onFinish={handleAddTask}
			layout='vertical'
			className='my-3 mx-auto px-3 py-5 w-full md:w-[500px] bg-slate-100 rounded-md shadow-md'
			form={form}
		>
			<Form.Item
				label='Title'
				name='title'
				rules={[
					{
						required: true,
						message: 'Please input task title'
					}
				]}
			>
				<Input
					placeholder='Task title...'
					autoFocus
					ref={inputRef}
				/>
			</Form.Item>
			<Form.Item
				label='Description'
				name='desc'
				rules={[
					{
						required: true,
						message: 'Please input your task'
					}
				]}
			>
				<Input placeholder='Your task...' />
			</Form.Item>
			<Form.Item className='text-right mb-0'>
				<Button
					htmlType='submit'
					type='primary'
					icon={<PlusCircleOutlined />}
				>
					Add Task
				</Button>
			</Form.Item>
		</Form>
	)
}

export default AddTask
