import { Divider, Flex, Typography } from 'antd'

import AddTask from './AddTask'
import Tasks from './Tasks'
import UpdateModal from './UpdateModal'

const Todo = () => {
        return (
                <div style={{
                        minHeight: '100vh',
                        background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #1a1a1a 50%, #000814 75%, #001d3d 100%)',
                        padding: '20px'
                }}>
                        <Flex
                                vertical
                                className='container px-3 sm:px-0 mx-auto my-5'
                                style={{
                                        background: 'rgba(0, 0, 0, 0.9)',
                                        borderRadius: '24px',
                                        border: '3px solid rgba(255, 215, 0, 0.8)',
                                        boxShadow: '0 25px 50px -12px rgba(255, 215, 0, 0.3)',
                                        padding: '40px'
                                }}
                        >
                                <Typography.Title 
                                        level={1}
                                        style={{
                                                color: '#EC4899',
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                                textShadow: '0 0 20px rgba(236, 72, 153, 0.9), 0 0 40px rgba(236, 72, 153, 0.6)',
                                                fontSize: '2.5rem',
                                                letterSpacing: '2px',
                                                marginBottom: '8px'
                                        }}
                                >
                                        ETHEREAL DEGENERATE
                                </Typography.Title>
                                <Typography.Text 
                                        style={{
                                                color: '#FFA500',
                                                textAlign: 'center',
                                                display: 'block',
                                                fontSize: '18px',
                                                fontWeight: '600',
                                                textShadow: '0 0 10px rgba(255, 165, 0, 0.6)',
                                                marginBottom: '20px'
                                        }}
                                >
                                        ⚡ MY TASKS PORTAL ⚡
                                </Typography.Text>
                                <Divider style={{ 
                                        borderColor: 'rgba(255, 215, 0, 0.6)',
                                        margin: '20px 0'
                                }} />
                                <AddTask />
                                <Tasks />
                                <UpdateModal />
                        </Flex>
                </div>
        )
}

export default Todo
