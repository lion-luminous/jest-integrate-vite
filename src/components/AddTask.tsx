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
                        className='my-3 mx-auto px-3 py-5 w-full md:w-[500px] rounded-md shadow-md'
                        form={form}
                        style={{
                                background: 'rgba(42, 42, 42, 0.9)',
                                border: '2px solid rgba(255, 215, 0, 0.6)',
                                boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
                        }}
                >
                        <Form.Item
                                label={<span style={{ color: '#06B6D4', fontWeight: '600' }}>Title</span>}
                                name='title'
                                rules={[
                                        {
                                                required: true,
                                                message: 'Please input task title'
                                        }
                                ]}
                        >
                                <Input
                                        placeholder='Task title.....'
                                        autoFocus
                                        ref={inputRef}
                                        style={{
                                                background: '#1a1a1a',
                                                border: '1px solid rgba(6, 182, 212, 0.5)',
                                                color: '#06B6D4'
                                        }}
                                />
                        </Form.Item>
                        <Form.Item
                                label={<span style={{ color: '#8B5CF6', fontWeight: '600' }}>Description</span>}
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
                                                border: '1px solid rgba(139, 92, 246, 0.5)',
                                                color: '#8B5CF6'
                                        }}
                                />
                        </Form.Item>
                        <Form.Item className='text-right mb-0'>
                                <Button
                                        htmlType='submit'
                                        type='primary'
                                        icon={<PlusCircleOutlined />}
                                        style={{
                                                background: '#2a2a2a',
                                                color: '#EC4899',
                                                border: '2px solid rgba(236, 72, 153, 0.8)',
                                                fontWeight: '600'
                                        }}
                                >
                                        Add Task
                                </Button>
                        </Form.Item>
                </Form>
        )
}

export default AddTask
