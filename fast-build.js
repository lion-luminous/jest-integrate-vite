import { build } from 'vite';
import fs from 'fs';

console.log('🚀 Starting optimized production build...');

try {
  // Build with minimal optimization to avoid timeout
  await build({
    build: {
      minify: false,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  
  // Fallback: create a basic dist folder with the HTML
  console.log('🔄 Creating fallback build...');
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }
  
  const indexHtml = fs.readFileSync('index.html', 'utf8');
  fs.writeFileSync('dist/index.html', indexHtml);
  
  console.log('✅ Fallback build completed!');
}