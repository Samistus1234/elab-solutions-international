// Simple Pages Router API
export default function handler(req, res) {
  res.status(200).json({ 
    message: 'Hello from Pages API!',
    method: req.method,
    timestamp: new Date().toISOString()
  });
}
