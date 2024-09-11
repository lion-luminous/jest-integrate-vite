import { Form, Input, Modal } from 'antd'
import { useAppDispatch, useAppSelector } from '../hooks'
import { RootState } from '../redux/store'
import { setClose } from '../redux/slices/modal.slice'
import { editTask } from '../redux/slices/tasks.slice'

const UpdateModal = () => {
	const { isOpen, data } = useAppSelector((state: RootState) => state.modal)
	const dispatch = useAppDispatch()
	const [form] = Form.useForm()

	const closeModal = () => {
		dispatch(setClose())
	}

	const handleUpdate = (values: Record<'title' | 'desc', string>) => {
		const { title, desc } = values
		dispatch(
			editTask({
				...data!,
				title: title,
				desc: desc
			})
		)
		closeModal()
	}

	return (
		<Modal
			title='Update task'
			open={isOpen}
			onCancel={closeModal}
			onOk={form.submit}
			okText='Update'
		>
			<Form
				layout='vertical'
				form={form}
				initialValues={data || {}}
				onFinish={handleUpdate}
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
			</Form>
		</Modal>
	)
}

export default UpdateModal
