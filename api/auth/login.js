// Login API - Vercel Function
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are allowed'
    });
  }

  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Email and password are required',
        details: {
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    // For now, return a mock response since we don't have database setup
    // In a real implementation, you would:
    // 1. Query the database for the user
    // 2. Verify the password hash
    // 3. Generate a JWT token
    // 4. Return the token and user info

    if (email === 'demo@elab.com' && password === 'demo123') {
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          id: 'demo-user-id',
          email: 'demo@elab.com',
          firstName: 'Demo',
          lastName: 'User',
          role: 'APPLICANT'
        },
        token: 'demo-jwt-token-' + Date.now()
      });
    }

    // Invalid credentials
    return res.status(401).json({
      error: 'INVALID_CREDENTIALS',
      message: 'Invalid email or password'
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'An error occurred during login',
      details: error.message
    });
  }
}
