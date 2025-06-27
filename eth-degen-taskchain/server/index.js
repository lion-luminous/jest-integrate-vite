import Fastify from 'fastify';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = Fastify({
  logger: true
});

// Register static file serving for the web build
app.register(import('@fastify/static'), { 
  root: path.join(__dirname, '.'),
  prefix: '/'
});

// Health check endpoint
app.get('/health', (_, reply) => {
  reply.code(200).send({ status: 'OK', service: 'ETHEREAL DEGENERATE TASKCHAIN' });
});

// API routes
app.get('/api/status', (_, reply) => {
  reply.code(200).send({ 
    message: 'ETHEREAL DEGENERATE TASKCHAIN API Online',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;

app.listen({ port: PORT, host: '0.0.0.0' }).then(() => {
  console.log(`🚀 ETHEREAL DEGENERATE TASKCHAIN Server running on port ${PORT}`);
  console.log(`📊 Health endpoint: http://0.0.0.0:${PORT}/health`);
  console.log(`🌐 App URL: http://0.0.0.0:${PORT}`);
}).catch(err => {
  app.log.error(err);
  process.exit(1);
});