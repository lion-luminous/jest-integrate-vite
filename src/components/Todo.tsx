import React, { useState, useEffect } from 'react'
import { Divider, Flex, Typography } from 'antd'

import AddTask from './AddTask'
import Tasks from './Tasks'
import UpdateModal from './UpdateModal'

const CascadingText: React.FC = () => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 0.1) % 6);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const renderLetter = (letter: string, index: number, wordOffset: number = 0) => {
    const phase = (animationPhase + (index + wordOffset) * 0.3) % 6;
    let color;
    
    if (phase < 1) color = `hsl(${320 + phase * 40}, 100%, 50%)`;
    else if (phase < 2) color = `hsl(${360 + (phase - 1) * 60}, 100%, 50%)`;
    else if (phase < 3) color = `hsl(${60 + (phase - 2) * 60}, 100%, 50%)`;
    else if (phase < 4) color = `hsl(${120 + (phase - 3) * 60}, 100%, 50%)`;
    else if (phase < 5) color = `hsl(${180 + (phase - 4) * 60}, 100%, 50%)`;
    else color = `hsl(${240 + (phase - 5) * 80}, 100%, 50%)`;

    return (
      <span
        key={index}
        style={{
          color: color,
          display: 'inline-block',
          fontWeight: '900',
          textTransform: 'uppercase',
          fontFamily: 'Orbitron, monospace',
          transition: 'color 0.5s ease-in-out'
        }}
      >
        {letter}
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <div>
        {'ETHEREAL'.split('').map((letter, index) => renderLetter(letter, index, 0))}
      </div>
      <div>
        {'DEGENERATE'.split('').map((letter, index) => renderLetter(letter, index, 8))}
      </div>
    </div>
  );
};

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
                                        <CascadingText />
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
