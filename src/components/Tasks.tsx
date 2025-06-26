import { Key } from 'react'
import { Empty, Space, Table, TableProps, Tag } from 'antd'

import { useTasks } from '../hooks'
import DeleteTask from './Actions/DeleteTask'
import ChangeStatus from './Actions/ChangeStatus'
import EditTask from './Actions/EditTask'

const columns: TableProps<ITask>['columns'] = [
        {
                title: <span style={{ color: '#FFD700', fontWeight: '700' }}>ID</span>,
                dataIndex: 'taskId',
                key: 'taskId',
                render: (id: string) => <span style={{ color: '#FFD700' }}>{id.slice(-5)}</span>
        },
        {
                title: <span style={{ color: '#FFD700', fontWeight: '700' }}>TASK</span>,
                dataIndex: 'desc',
                key: 'desc',
                width: 300,
                render: (desc: string, record: ITask) => (
                        <Space direction='vertical'>
                                <h4 className='font-bold text-lg' style={{ color: '#FFD700', margin: 0 }}>{record.title}</h4>
                                <p style={{ color: '#FFA500', margin: 0 }}>{desc}</p>
                        </Space>
                )
        },
        {
                title: <span style={{ color: '#FFD700', fontWeight: '700' }}>STATUS</span>,
                key: 'status',
                dataIndex: 'status',
                render: (status: TaskStatus) => (
                        <Tag
                                style={{
                                        background: status === 'COMPLETED' ? '#2a2a2a' : status === 'NOT_COMPLETED' ? '#4a1a1a' : '#3a3a1a',
                                        color: status === 'COMPLETED' ? '#00FF00' : status === 'NOT_COMPLETED' ? '#FF6B6B' : '#FFD700',
                                        border: `1px solid ${status === 'COMPLETED' ? '#00FF00' : status === 'NOT_COMPLETED' ? '#FF6B6B' : '#FFD700'}`,
                                        fontWeight: '600'
                                }}
                        >
                                {status === 'COMPLETED'
                                        ? '✓ DONE'
                                        : status === 'NOT_COMPLETED'
                                                ? '✗ NOT COMPLETED'
                                                : '⚡ PENDING'}
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
                title: <span style={{ color: '#FFD700', fontWeight: '700' }}>ACTIONS</span>,
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

        if (!reduxTasks.length) return (
                <Empty 
                        description={<span style={{ color: '#FFD700', fontWeight: '600' }}>No tasks added yet!</span>}
                        style={{ 
                                background: 'rgba(42, 42, 42, 0.7)',
                                padding: '40px',
                                borderRadius: '12px',
                                border: '2px solid rgba(255, 215, 0, 0.3)'
                        }}
                />
        )

        return (
                <Table
                        columns={columns}
                        dataSource={reduxTasks}
                        scroll={{ x: 900 }}
                        style={{
                                background: 'rgba(42, 42, 42, 0.9)',
                                borderRadius: '12px',
                                border: '2px solid rgba(255, 215, 0, 0.6)'
                        }}
                        className="custom-table"
                />
        )
}

export default Tasks
