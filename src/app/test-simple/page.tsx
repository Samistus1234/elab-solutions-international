export default function TestPage() {
  return (
    <div style={{
      padding: '50px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{ color: '#2563eb', marginBottom: '20px' }}>
          ✅ Server is Working!
        </h1>
        <p style={{ fontSize: '18px', color: '#374151' }}>
          This confirms the Next.js server is running properly on localhost:3000
        </p>
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
          <h3>Pipeline Test Data:</h3>
          <div style={{ marginTop: '10px' }}>
            <div style={{ padding: '10px', margin: '10px 0', backgroundColor: '#dbeafe', borderRadius: '5px' }}>
              <strong>👩‍⚕️ Dr. Sarah Ahmed</strong><br/>
              Service: DataFlow Verification<br/>
              Progress: 83% Complete<br/>
              Status: Authority Processing
            </div>
            <div style={{ padding: '10px', margin: '10px 0', backgroundColor: '#dcfce7', borderRadius: '5px' }}>
              <strong>👨‍⚕️ Nurse Maria Santos</strong><br/>
              Service: DHA/HAAD License<br/>
              Progress: 75% Complete<br/>
              Status: Exam Scheduled
            </div>
          </div>
        </div>
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
          <strong>📍 Navigation:</strong><br/>
          • Main site: <a href="/" style={{ color: '#2563eb' }}>localhost:3000/</a><br/>
          • Pipeline page: <a href="/centralops/pipelines" style={{ color: '#2563eb' }}>localhost:3000/centralops/pipelines</a><br/>
          • This test page: <a href="/test-simple" style={{ color: '#2563eb' }}>localhost:3000/test-simple</a>
        </div>
      </div>
    </div>
  );
}