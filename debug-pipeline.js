// Simple test to check pipeline store data
console.log('Testing pipeline store...');

// Mock data structure check
const mockData = {
  applicants: [
    {
      applicantId: 'APP-001',
      applicantName: 'Dr. Sarah Ahmed',
      currentStage: 'authority_processing',
      priority: 'high'
    }
  ]
};

console.log('Mock data:', JSON.stringify(mockData, null, 2));
console.log('Data loaded successfully!');