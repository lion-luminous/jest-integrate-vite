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
                        title={<span style={{ color: '#FFD700', fontWeight: '700', fontSize: '18px' }}>⚡ UPDATE TASK ⚡</span>}
                        open={isOpen}
                        onCancel={closeModal}
                        onOk={form.submit}
                        okText='Update'
                        style={{
                                background: 'rgba(0, 0, 0, 0.9)'
                        }}
                        styles={{
                                content: {
                                        background: 'rgba(42, 42, 42, 0.95)',
                                        border: '3px solid rgba(255, 215, 0, 0.8)',
                                        borderRadius: '16px'
                                },
                                header: {
                                        background: 'rgba(42, 42, 42, 0.95)',
                                        borderBottom: '2px solid rgba(255, 215, 0, 0.6)'
                                }
                        }}
                        okButtonProps={{
                                style: {
                                        background: '#2a2a2a',
                                        color: '#FFD700',
                                        border: '2px solid rgba(255, 215, 0, 0.8)',
                                        fontWeight: '600'
                                }
                        }}
                        cancelButtonProps={{
                                style: {
                                        background: '#1a1a1a',
                                        color: '#FFA500',
                                        border: '1px solid rgba(255, 165, 0, 0.3)'
                                }
                        }}
                >
                        <Form
                                layout='vertical'
                                form={form}
                                initialValues={data || {}}
                                onFinish={handleUpdate}
                        >
                                <Form.Item
                                        label={<span style={{ color: '#FFD700', fontWeight: '600' }}>Title</span>}
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
                                                style={{
                                                        background: '#1a1a1a',
                                                        border: '1px solid rgba(255, 215, 0, 0.5)',
                                                        color: '#FFD700'
                                                }}
                                        />
                                </Form.Item>
                                <Form.Item
                                        label={<span style={{ color: '#FFD700', fontWeight: '600' }}>Description</span>}
                                        name='desc'
                                        rules={[
                                                {
                                                        required: true,
                                                        message: 'Please input your task'
                                                }
                                        ]}
                                >
                                        <Input 
                                                placeholder='Your task...' 
                                                style={{
                                                        background: '#1a1a1a',
                                                        border: '1px solid rgba(255, 215, 0, 0.5)',
                                                        color: '#FFD700'
                                                }}
                                        />
                                </Form.Item>
                        </Form>
                </Modal>
        )
}

export default UpdateModal
