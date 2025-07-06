// Applications API - Vercel Function
export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Return mock applications data
      const applications = [
        {
          id: 'app-1',
          title: 'Study Abroad Program',
          status: 'UNDER_REVIEW',
          submittedAt: '2025-01-01T00:00:00Z',
          country: 'Canada',
          program: 'Computer Science'
        },
        {
          id: 'app-2',
          title: 'Work Visa Application',
          status: 'APPROVED',
          submittedAt: '2024-12-15T00:00:00Z',
          country: 'Australia',
          program: 'Software Engineering'
        }
      ];

      return res.status(200).json({
        success: true,
        data: applications,
        total: applications.length,
        message: 'Applications retrieved successfully'
      });
    }

    if (req.method === 'POST') {
      const { title, country, program, documents } = req.body;

      // Basic validation
      if (!title || !country || !program) {
        return res.status(400).json({
          error: 'VALIDATION_ERROR',
          message: 'Title, country, and program are required',
          details: {
            title: !title ? 'Title is required' : null,
            country: !country ? 'Country is required' : null,
            program: !program ? 'Program is required' : null
          }
        });
      }

      // Mock creating a new application
      const newApplication = {
        id: 'app-' + Date.now(),
        title,
        country,
        program,
        status: 'DRAFT',
        submittedAt: new Date().toISOString(),
        documents: documents || []
      };

      return res.status(201).json({
        success: true,
        data: newApplication,
        message: 'Application created successfully'
      });
    }

    // Method not allowed
    return res.status(405).json({
      error: 'METHOD_NOT_ALLOWED',
      message: `Method ${req.method} not allowed`
    });

  } catch (error) {
    console.error('Applications API error:', error);
    return res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'An error occurred processing your request',
      details: error.message
    });
  }
}
