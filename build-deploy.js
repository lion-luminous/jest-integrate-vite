import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

function runCommand(command, args, cwd = process.cwd()) {
    return new Promise((resolve, reject) => {
        console.log(`Running: ${command} ${args.join(' ')}`);
        const process = spawn(command, args, {
            cwd,
            stdio: 'inherit',
            shell: true
        });

        process.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command failed with exit code ${code}`));
            }
        });
    });
}

async function buildAndDeploy() {
    try {
        console.log('🏗️  Building React application...');
        await runCommand('npm', ['run', 'build']);
        
        console.log('✅ Build completed successfully!');
        
        // Check if dist folder exists
        if (fs.existsSync('./dist')) {
            console.log('📦 Build output ready in ./dist');
            console.log('🚀 Starting production server...');
            await runCommand('node', ['server.js']);
        } else {
            console.error('❌ Build failed - dist folder not found');
            process.exit(1);
        }
    } catch (error) {
        console.error('❌ Build or deployment failed:', error.message);
        process.exit(1);
    }
}

buildAndDeploy();