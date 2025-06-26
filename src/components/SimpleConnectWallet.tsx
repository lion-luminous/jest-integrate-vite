import React from 'react';
import { Button, Card, Typography, Space, Divider, message } from 'antd';
import { GoogleOutlined, WalletOutlined, FireOutlined, RocketOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface SimpleConnectWalletProps {
  onConnect: () => void;
}

const SimpleConnectWallet: React.FC<SimpleConnectWalletProps> = ({ onConnect }) => {
  const handleGoogleSignIn = () => {
    message.success('Welcome! Connecting to Todo App...');
    setTimeout(() => {
      onConnect();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" 
         style={{ 
           background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
           position: 'relative'
         }}>
      
      {/* Animated ethereal background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-96 h-96 bg-violet-400 rounded-full mix-blend-screen filter blur-xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-80 h-80 bg-cyan-300 rounded-full mix-blend-screen filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-fuchsia-400 rounded-full mix-blend-screen filter blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-emerald-300 rounded-full mix-blend-screen filter blur-xl animate-pulse delay-3000"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-violet-300 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-200 rounded-full animate-bounce delay-1500"></div>
        <div className="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 bg-fuchsia-300 rounded-full animate-bounce delay-2500"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-emerald-200 rounded-full animate-bounce delay-3500"></div>
      </div>
      
      <Card 
        className="w-full max-w-md relative z-10"
        style={{ 
          background: 'rgba(15, 15, 35, 0.85)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '2px solid rgba(139, 92, 246, 0.3)',
          boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="text-center p-8">
          {/* Animated Header */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 animate-bounce"
                 style={{ 
                   background: 'linear-gradient(135deg, #8B5CF6, #06B6D4, #10B981, #F59E0B, #EF4444, #EC4899)',
                   boxShadow: '0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(6, 182, 212, 0.4)'
                 }}>
              <WalletOutlined style={{ fontSize: '36px', color: 'white', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }} />
            </div>
            <Title level={1} className="mb-2"
                   style={{ 
                     background: 'linear-gradient(135deg, #8B5CF6, #06B6D4, #10B981, #F59E0B)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     fontWeight: 'bold',
                     textShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
                     fontSize: '2.5rem'
                   }}>
              Ethereal Degenerate
            </Title>
            <Text className="text-lg" style={{ 
              color: '#06B6D4', 
              textShadow: '0 0 10px rgba(6, 182, 212, 0.7)',
              fontWeight: '600'
            }}>
              Cyber Portal Active
            </Text>
            <br />
            <Text className="text-sm" style={{ 
              color: '#10B981',
              textShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
            }}>
              Reality Bridge Deployed
            </Text>
          </div>

          {/* Ethereal Features Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl border" 
                 style={{ 
                   background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.15))',
                   border: '1px solid rgba(139, 92, 246, 0.3)',
                   boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)'
                 }}>
              <FireOutlined style={{ 
                fontSize: '28px', 
                color: '#8B5CF6', 
                marginBottom: '8px',
                filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.7))'
              }} />
              <Text className="text-xs block" style={{ 
                color: '#06B6D4',
                textShadow: '0 0 5px rgba(6, 182, 212, 0.5)',
                fontWeight: '500'
              }}>Neural Authentication</Text>
            </div>
            <div className="p-4 rounded-xl border"
                 style={{ 
                   background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(245, 158, 11, 0.15))',
                   border: '1px solid rgba(16, 185, 129, 0.3)',
                   boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)'
                 }}>
              <RocketOutlined style={{ 
                fontSize: '28px', 
                color: '#10B981', 
                marginBottom: '8px',
                filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.7))'
              }} />
              <Text className="text-xs block" style={{ 
                color: '#F59E0B',
                textShadow: '0 0 5px rgba(245, 158, 11, 0.5)',
                fontWeight: '500'
              }}>Quantum Database</Text>
            </div>
          </div>

          {/* Ethereal Capabilities */}
          <div className="mb-8 text-left">
            <Title level={4} className="mb-4" style={{ 
              color: '#8B5CF6',
              textShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
              fontWeight: '600'
            }}>Reality Synthesis Protocol</Title>
            <Space direction="vertical" className="w-full">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-3 animate-pulse" style={{ 
                  background: 'radial-gradient(circle, #8B5CF6, #06B6D4)',
                  boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)'
                }}></div>
                <Text style={{ 
                  color: '#06B6D4',
                  textShadow: '0 0 5px rgba(6, 182, 212, 0.4)',
                  fontSize: '13px'
                }}>Neural Bridge Authentication</Text>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-3 animate-pulse delay-500" style={{ 
                  background: 'radial-gradient(circle, #10B981, #F59E0B)',
                  boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)'
                }}></div>
                <Text style={{ 
                  color: '#10B981',
                  textShadow: '0 0 5px rgba(16, 185, 129, 0.4)',
                  fontSize: '13px'
                }}>Quantum Data Synchronization</Text>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-3 animate-pulse delay-1000" style={{ 
                  background: 'radial-gradient(circle, #EC4899, #EF4444)',
                  boxShadow: '0 0 10px rgba(236, 72, 153, 0.8)'
                }}></div>
                <Text style={{ 
                  color: '#EC4899',
                  textShadow: '0 0 5px rgba(236, 72, 153, 0.4)',
                  fontSize: '13px'
                }}>Ethereal Degenerate Architecture</Text>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-3 animate-pulse delay-1500" style={{ 
                  background: 'radial-gradient(circle, #F59E0B, #8B5CF6)',
                  boxShadow: '0 0 10px rgba(245, 158, 11, 0.8)'
                }}></div>
                <Text style={{ 
                  color: '#F59E0B',
                  textShadow: '0 0 5px rgba(245, 158, 11, 0.4)',
                  fontSize: '13px'
                }}>Dimensional Portal Configuration</Text>
              </div>
            </Space>
          </div>

          <Divider style={{ 
            borderColor: 'rgba(139, 92, 246, 0.3)',
            boxShadow: '0 0 10px rgba(139, 92, 246, 0.2)'
          }} />

          {/* Ethereal Portal Button */}
          <Button
            type="primary"
            size="large"
            icon={<GoogleOutlined style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.8))' }} />}
            onClick={handleGoogleSignIn}
            className="w-full text-lg font-bold rounded-xl border-0 transition-all duration-500 hover:scale-105"
            style={{
              height: '64px',
              background: 'linear-gradient(135deg, #8B5CF6, #06B6D4, #10B981, #F59E0B, #EF4444, #EC4899)',
              backgroundSize: '400% 400%',
              animation: 'etherealShift 4s ease infinite',
              boxShadow: '0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(6, 182, 212, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              color: 'white',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(139, 92, 246, 0.6)',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            ◉ ENTER THE VOID ◉
          </Button>

          {/* Ethereal Status */}
          <div className="mt-6 p-4 rounded-xl border" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(139, 92, 246, 0.15))',
                 border: '1px solid rgba(16, 185, 129, 0.4)',
                 boxShadow: '0 0 20px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
               }}>
            <Text className="text-sm block mb-1" style={{ 
              color: '#10B981',
              textShadow: '0 0 8px rgba(16, 185, 129, 0.7)',
              fontWeight: '600'
            }}>◦ Dimensional Gateway Online ◦</Text>
            <Text className="text-xs" style={{ 
              color: '#8B5CF6',
              textShadow: '0 0 6px rgba(139, 92, 246, 0.6)'
            }}>Reality Synthesis Ready</Text>
          </div>

          {/* Ethereal System Links */}
          <div className="mt-4 text-center">
            <Text className="text-xs" style={{ 
              color: '#06B6D4',
              textShadow: '0 0 5px rgba(6, 182, 212, 0.5)'
            }}>
              Neural Scan: <span style={{ 
                color: '#8B5CF6',
                textShadow: '0 0 8px rgba(139, 92, 246, 0.7)'
              }}>/health</span>
            </Text>
            <br />
            <Text className="text-xs" style={{ 
              color: '#EC4899',
              textShadow: '0 0 5px rgba(236, 72, 153, 0.5)'
            }}>
              Void Status: <span style={{ 
                color: '#F59E0B',
                textShadow: '0 0 8px rgba(245, 158, 11, 0.7)'
              }}>/api/status</span>
            </Text>
          </div>
        </div>
      </Card>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default SimpleConnectWallet;