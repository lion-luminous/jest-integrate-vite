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
                                <div style={{ 
                                        fontSize: 'clamp(1rem, 4vw, 2rem)', 
                                        fontWeight: '900', 
                                        letterSpacing: 'clamp(0.5px, 0.3vw, 2px)', 
                                        textAlign: 'center', 
                                        marginBottom: '8px',
                                        fontFamily: 'Orbitron, monospace',
                                        lineHeight: '1.1',
                                        wordSpacing: '0.05em'
                                }}>
                                        {'ETHEREAL DEGENERATE'.split('').map((letter, index) => {
                                                const degenColors = [
                                                        '#FF1744', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3',
                                                        '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B',
                                                        '#FF9800', '#FF5722', '#795548', '#607D8B', '#F44336', '#E91E63', '#9C27B0'
                                                ];
                                                return (
                                                        <span
                                                                key={index}
                                                                style={{
                                                                        color: degenColors[index % degenColors.length],
                                                                        display: 'inline-block',
                                                                        fontWeight: '900',
                                                                        textTransform: 'uppercase',
                                                                        fontFamily: 'Orbitron, monospace'
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
