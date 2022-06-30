const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:4000/api/1.0' : 'https://your_deployment.server.com';