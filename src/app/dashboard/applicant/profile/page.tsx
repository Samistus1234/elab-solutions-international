'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
  });

  useEffect(() => {
    if (isLoaded && user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
        phone: user.primaryPhoneNumber?.phoneNumber || '',
        role: (user.publicMetadata?.role as string) || 'Applicant',
      });
    }
  }, [isLoaded, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real application, you would send formData to your backend
    // to update the user's profile.
    console.log('Saving profile data:', formData);
    setIsEditing(false);
    // You might want to show a success message here
  };

  if (!isLoaded) {
    return (
      <DashboardLayout>
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
          <p>Loading profile data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`mt-1 block w-full p-2 border ${isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500`}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`mt-1 block w-full p-2 border ${isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500`}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                readOnly // Email is usually not editable directly here
                className="mt-1 block w-full p-2 border border-transparent bg-gray-50 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`mt-1 block w-full p-2 border ${isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500`}
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                readOnly // Role is usually not editable by user
                className="mt-1 block w-full p-2 border border-transparent bg-gray-50 rounded-md shadow-sm"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Edit Profile
              </button>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
