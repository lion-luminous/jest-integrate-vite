import React from 'react';
import { Button, Card, Typography, Space, Divider, message } from 'antd';
import { GoogleOutlined, WalletOutlined, FireOutlined, RocketOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface SimpleConnectWalletProps {
  onConnect: () => void;
}

const SimpleConnectWallet: React.FC<SimpleConnectWalletProps> = ({ onConnect }) => {
  const handleGoogleSignIn = async () => {
    try {
      const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
      const { auth } = await import('../firebase/config');
      
      const provider = new GoogleAuthProvider();
      // Force account selection popup even if user is already signed in
      provider.setCustomParameters({
        prompt: 'select_account',
        hd: undefined // Allow any domain
      });
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      message.success(`Welcome ${user.displayName || user.email}! Connecting to Todo App...`);
      setTimeout(() => {
        onConnect();
      }, 1000);
    } catch (error: any) {
      console.error('Authentication error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        message.info('Sign-in cancelled');
      } else if (error.code === 'auth/configuration-not-found' || error.code === 'auth/invalid-api-key') {
        message.error('Firebase configuration needed. Please set up your Firebase credentials.');
      } else {
        message.error('Authentication failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" 
         style={{ 
           background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #1a1a1a 50%, #000814 75%, #001d3d 100%)',
           position: 'relative'
         }}>
      
      {/* Cyberpunk ethereal background elements */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen filter blur-xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-80 h-80 bg-purple-400 rounded-full mix-blend-screen filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-screen filter blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-yellow-300 rounded-full mix-blend-screen filter blur-xl animate-pulse delay-3000"></div>
      </div>
      
      {/* Floating cyberpunk particles */}
      <div className="absolute inset-0 opacity-70">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-500 shadow-lg"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-1500 shadow-lg"></div>
        <div className="absolute bottom-1/4 left-2/3 w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce delay-2500 shadow-lg"></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-bounce delay-3500 shadow-lg"></div>
      </div>
      
      <Card 
        className="w-full max-w-md relative z-10"
        style={{ 
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '3px solid rgba(255, 215, 0, 0.8)',
          boxShadow: '0 25px 50px -12px rgba(255, 215, 0, 0.6), inset 0 1px 0 rgba(255, 215, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.4)'
        }}
      >
        <div className="text-center p-8">
          {/* Animated Header */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full mb-6 animate-bounce"
                 style={{ 
                   background: 'linear-gradient(135deg, #FFD700, #FFA500, #FF8C00, #DAA520)',
                   boxShadow: '0 0 40px rgba(255, 215, 0, 0.8), 0 0 80px rgba(255, 165, 0, 0.6)',
                   border: '2px solid rgba(255, 215, 0, 0.9)'
                 }}>
              <WalletOutlined style={{ 
                fontSize: '40px', 
                color: '#000000', 
                filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.8))',
                fontWeight: 'bold'
              }} />
            </div>
            <Title level={1} className="mb-2"
                   style={{ 
                     color: '#FFD700',
                     fontWeight: 'bold',
                     fontSize: '3rem',
                     letterSpacing: '2px'
                   }}>
              ETHEREAL DEGENERATE
            </Title>
            <Text className="text-xl" style={{ 
              color: '#FFD700', 
              fontWeight: '700',
              letterSpacing: '1px'
            }}>
              ⚡ CYBER PORTAL ACTIVE ⚡
            </Text>
            <br />
            <Text className="text-lg" style={{ 
              color: '#FFD700',
              fontWeight: '600',
              marginTop: '8px'
            }}>
              🔥 REALITY BRIDGE DEPLOYED 🔥
            </Text>
          </div>

          {/* Cyberpunk Features Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl border" 
                 style={{ 
                   background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(139, 92, 246, 0.15))',
                   border: '2px solid rgba(6, 182, 212, 0.7)',
                   boxShadow: '0 0 25px rgba(6, 182, 212, 0.5)'
                 }}>
              <FireOutlined style={{ 
                fontSize: '32px', 
                color: '#06B6D4', 
                marginBottom: '12px',
                filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))'
              }} />
              <Text className="text-sm block" style={{ 
                color: '#06B6D4',
                textShadow: '0 0 8px rgba(6, 182, 212, 0.6)',
                fontWeight: '700',
                letterSpacing: '0.5px'
              }}>NEURAL AUTHENTICATION</Text>
            </div>
            <div className="p-5 rounded-xl border"
                 style={{ 
                   background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.15))',
                   border: '2px solid rgba(139, 92, 246, 0.7)',
                   boxShadow: '0 0 25px rgba(139, 92, 246, 0.5)'
                 }}>
              <RocketOutlined style={{ 
                fontSize: '32px', 
                color: '#8B5CF6', 
                marginBottom: '12px',
                filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.8))'
              }} />
              <Text className="text-sm block" style={{ 
                color: '#EC4899',
                textShadow: '0 0 8px rgba(236, 72, 153, 0.6)',
                fontWeight: '700',
                letterSpacing: '0.5px'
              }}>QUANTUM DATABASE</Text>
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

          {/* Cyberpunk Google Login Button */}
          <Button
            type="primary"
            size="large"
            icon={<GoogleOutlined />}
            onClick={handleGoogleSignIn}
            className="w-full text-lg font-bold rounded-xl border-0 transition-all duration-300 hover:opacity-90 hover:scale-105"
            style={{
              height: '64px',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
              color: '#FFD700',
              border: '2px solid rgba(255, 215, 0, 0.8)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              transform: 'perspective(1px) translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            🚀 SIGN IN WITH GOOGLE 🚀
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


    </div>
  );
};

export default SimpleConnectWallet;