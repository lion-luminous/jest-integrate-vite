import { Key } from 'react'
import { Empty, Space, Table, TableProps, Tag } from 'antd'

import { useTasks } from '../hooks'
import DeleteTask from './Actions/DeleteTask'
import ChangeStatus from './Actions/ChangeStatus'
import EditTask from './Actions/EditTask'

const columns: TableProps<ITask>['columns'] = [
        {
                title: <span style={{ color: '#8B5CF6', fontWeight: '700' }}>ID</span>,
                dataIndex: 'taskId',
                key: 'taskId',
                render: (id: string) => <span style={{ color: '#06B6D4' }}>{id.slice(-5)}</span>
        },
        {
                title: <span style={{ color: '#06B6D4', fontWeight: '700' }}>TASK</span>,
                dataIndex: 'desc',
                key: 'desc',
                width: 300,
                render: (desc: string, record: ITask) => (
                        <Space direction='vertical'>
                                <h4 className='font-bold text-lg' style={{ color: '#8B5CF6', margin: 0 }}>{record.title}</h4>
                                <p style={{ color: '#06B6D4', margin: 0 }}>{desc}</p>
                        </Space>
                )
        },
        {
                title: <span style={{ color: '#EC4899', fontWeight: '700' }}>STATUS</span>,
                key: 'status',
                dataIndex: 'status',
                render: (status: TaskStatus) => (
                        <Tag
                                style={{
                                        background: status === 'COMPLETED' ? '#1a2a3a' : status === 'NOT_COMPLETED' ? '#3a1a2a' : '#2a1a3a',
                                        color: status === 'COMPLETED' ? '#10B981' : status === 'NOT_COMPLETED' ? '#EF4444' : '#EC4899',
                                        border: `1px solid ${status === 'COMPLETED' ? '#10B981' : status === 'NOT_COMPLETED' ? '#EF4444' : '#EC4899'}`,
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
                title: <span style={{ color: '#10B981', fontWeight: '700' }}>ACTIONS</span>,
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
