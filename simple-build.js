#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🚀 Creating simple production build...');

// Create dist directory
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

// Copy index.html to dist
const indexHtml = fs.readFileSync('index.html', 'utf8');
fs.writeFileSync('dist/index.html', indexHtml);

console.log('✅ Simple build complete!');
console.log('📁 Files created in dist/');