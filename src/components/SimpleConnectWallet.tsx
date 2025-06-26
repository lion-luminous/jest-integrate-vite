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
        prompt: 'select_account'
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
      
      {/* Dancing floating orbs */}
      <div className="absolute inset-0 opacity-80">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-400 rounded-full animate-bounce delay-500 shadow-lg floating-orb-1"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-1500 shadow-lg floating-orb-2"></div>
        <div className="absolute bottom-1/4 left-2/3 w-3.5 h-3.5 bg-pink-400 rounded-full animate-bounce delay-2500 shadow-lg floating-orb-3"></div>
        <div className="absolute top-1/5 left-3/4 w-2.5 h-2.5 bg-green-400 rounded-full animate-bounce delay-700 shadow-lg floating-orb-4"></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-1200 shadow-lg floating-orb-5"></div>
        <div className="absolute top-2/3 left-1/5 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-1800 shadow-lg floating-orb-6"></div>
        <div className="absolute bottom-1/5 right-2/3 w-3.5 h-3.5 bg-red-400 rounded-full animate-bounce delay-300 shadow-lg floating-orb-7"></div>
        <div className="absolute top-1/6 right-1/5 w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce delay-2000 shadow-lg floating-orb-8"></div>
        <div className="absolute bottom-2/3 left-1/3 w-3 h-3 bg-orange-400 rounded-full animate-bounce delay-900 shadow-lg floating-orb-9"></div>
        <div className="absolute top-3/4 right-1/2 w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-1600 shadow-lg floating-orb-10"></div>
        <div className="absolute bottom-1/6 left-1/2 w-4 h-4 bg-lime-400 rounded-full animate-bounce delay-2200 shadow-lg floating-orb-11"></div>
        <div className="absolute top-1/2 left-1/6 w-2.5 h-2.5 bg-violet-400 rounded-full animate-bounce delay-1100 shadow-lg floating-orb-12"></div>
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
                   background: 'linear-gradient(135deg, #4285F4, #34A853, #FBBC05, #EA4335)',
                   boxShadow: '0 0 40px rgba(66, 133, 244, 0.8), 0 0 80px rgba(52, 168, 83, 0.6)',
                   border: '2px solid rgba(66, 133, 244, 0.9)'
                 }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white"/>
              </svg>
            </div>
            <div className="mb-2" style={{ 
              fontSize: 'clamp(1.2rem, 4.5vw, 2.2rem)', 
              fontWeight: '900', 
              letterSpacing: 'clamp(0.5px, 0.3vw, 2px)', 
              textAlign: 'center',
              fontFamily: 'Orbitron, monospace',
              lineHeight: '1.1',
              wordSpacing: '0.05em'
            }}>
              {'ETHEREAL DEGENERATE'.split('').map((letter, index) => {
                const spectrumColors = [
                  '#FF6B6B', '#FF8E53', '#FF6B9D', '#C44569', '#F8B500', '#F0932B',
                  '#EB4D4B', '#6C5CE7', '#A29BFE', '#74B9FF', '#0984E3', '#00B894',
                  '#00CEC9', '#6C5CE7', '#A29BFE', '#FD79A8', '#E84393', '#00B894', '#FF7675'
                ];
                return (
                  <span
                    key={index}
                    style={{
                      color: spectrumColors[index % spectrumColors.length],
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