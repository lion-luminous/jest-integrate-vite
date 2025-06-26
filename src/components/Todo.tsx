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
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', letterSpacing: '2px', textAlign: 'center', marginBottom: '8px' }}>
                                        {'ETHEREAL DEGENERATE'.split('').map((letter, index) => {
                                                const colors = [
                                                        '#FF0080', '#FF4080', '#FF8040', '#FFB020', '#FFE000', '#C0FF00', 
                                                        '#80FF40', '#40FF80', '#00FFB0', '#00E0FF', '#0080FF', '#4040FF', 
                                                        '#8000FF', '#C000FF', '#FF00C0', '#FF0060', '#FF4060', '#FF8060'
                                                ];
                                                return (
                                                        <span
                                                                key={index}
                                                                style={{
                                                                        color: colors[index % colors.length],
                                                                        filter: `hue-rotate(${index * 20}deg) saturate(1.5) contrast(1.2)`,
                                                                        background: `linear-gradient(45deg, ${colors[index % colors.length]}22, transparent)`,
                                                                        WebkitBackgroundClip: 'text',
                                                                        backgroundClip: 'text',
                                                                        animation: `rainbow-cascade 8s ease-in-out infinite`,
                                                                        animationDelay: `${index * 0.3}s`,
                                                                        display: 'inline-block',
                                                                        textShadow: `2px 2px 4px ${colors[index % colors.length]}44`,
                                                                }}
                                                        >
                                                                {letter === ' ' ? '\u00A0' : letter}
                                                        </span>
                                                );
                                        })}
                                </div>
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
