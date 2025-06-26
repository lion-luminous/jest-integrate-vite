import { spawn } from 'child_process';

console.log('🚀 Starting fast deployment server...');

// Start Vite in preview mode with production settings
const server = spawn('npx', ['vite', 'preview', '--host', '0.0.0.0', '--port', '5000'], {
    stdio: 'inherit',
    shell: true
});

server.on('error', (error) => {
    console.error('Server failed to start:', error.message);
    // Fallback to development server
    console.log('🔄 Falling back to development server...');
    const devServer = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5000'], {
        stdio: 'inherit',
        shell: true
    });
    
    devServer.on('error', (err) => {
        console.error('Development server failed:', err.message);
        process.exit(1);
    });
});

process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    server.kill();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down server...');
    server.kill();
    process.exit(0);
});