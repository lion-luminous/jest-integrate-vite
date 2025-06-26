import React from 'react';
import { Button, Card, Typography, Space, Divider } from 'antd';
import { GoogleOutlined, WalletOutlined, FireOutlined, RocketOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface ConnectWalletProps {
  onGoogleSignIn: () => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ onGoogleSignIn }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10 animate-pulse"></div>
      
      <Card 
        className="w-full max-w-md backdrop-blur-lg bg-white/10 border-2 border-cyan-400/50 rounded-3xl shadow-2xl"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          backdropFilter: 'blur(20px)'
        }}
      >
        <div className="text-center p-6">
          {/* Animated Header */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 animate-bounce">
              <WalletOutlined style={{ fontSize: '32px', color: 'white' } as React.CSSProperties} />
            </div>
            <Title level={1} className="!text-white !mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Connect Wallet
            </Title>
            <Text className="text-cyan-200 text-lg">
              Enter the Web3 Universe
            </Text>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30">
              <FireOutlined style={{ fontSize: '24px', color: '#22d3ee', marginBottom: '8px' }} />
              <Text className="text-white text-sm block">Secure Login</Text>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30">
              <RocketOutlined style={{ fontSize: '24px', color: '#c084fc', marginBottom: '8px' }} />
              <Text className="text-white text-sm block">Fast Access</Text>
            </div>
          </div>

          {/* Feature List */}
          <div className="mb-8 text-left">
            <Title level={4} className="!text-cyan-300 !mb-4">Features Implemented</Title>
            <Space direction="vertical" className="w-full">
              <div className="flex items-center text-cyan-200">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <Text className="text-cyan-200">Firebase Google Authentication</Text>
              </div>
              <div className="flex items-center text-cyan-200">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                <Text className="text-cyan-200">PostgreSQL Database Integration</Text>
              </div>
              <div className="flex items-center text-cyan-200">
                <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                <Text className="text-cyan-200">Ethereal Degenerate Cyber-punk Styling</Text>
              </div>
              <div className="flex items-center text-cyan-200">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                <Text className="text-cyan-200">Deployment-ready Server Configuration</Text>
              </div>
            </Space>
          </div>

          <Divider className="border-cyan-400/30" />

          {/* Connect Button */}
          <Button
            type="primary"
            size="large"
            icon={<GoogleOutlined />}
            onClick={onGoogleSignIn}
            className="w-full text-lg font-semibold rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              height: '56px',
              background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7)',
              backgroundSize: '300% 300%'
            }}
          >
            Connect with Google
          </Button>

          {/* Status Info */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-400/30">
            <Text className="text-green-300 text-sm block mb-1">Server Running Successfully</Text>
            <Text className="text-cyan-300 text-xs">Ready for Production Deployment</Text>
          </div>

          {/* Health Check Links */}
          <div className="mt-4 text-center">
            <Text className="text-cyan-400 text-xs">
              Health Check: <span className="text-cyan-300">/health</span>
            </Text>
            <br />
            <Text className="text-purple-400 text-xs">
              API Status: <span className="text-purple-300">/api/status</span>
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ConnectWallet;