// Simple Vercel API function
export default function handler(req, res) {
  res.status(200).json({ 
    message: 'Hello from Vercel API!',
    timestamp: new Date().toISOString()
  });
}
