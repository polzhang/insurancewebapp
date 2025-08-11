'use client';

import React, { useState } from 'react';
import { User } from 'lucide-react';

interface ProfileData {
  age: string;
  gender: string;
  annualIncome: string;
  occupation: string;
  relationshipStatus: string;
  dependents: string;
  educationLevel: string;
}

interface ProfileFormProps {
  profile: ProfileData;
  onProfileUpdate: (profile: ProfileData) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onProfileUpdate }) => {
  const defaultProfile: ProfileData = {
    age: '',
    gender: '',
    annualIncome: '',
    occupation: '',
    relationshipStatus: '',
    dependents: '',
    educationLevel: ''
  };

  const [formData, setFormData] = useState<ProfileData>(() => ({
    ...defaultProfile,
    ...profile
  }));

  const handleChange = (field: keyof ProfileData, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onProfileUpdate(updatedData);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-gray-600" />
        </div>
        <h3 className="font-medium text-gray-900">Your Profile</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => handleChange('age', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="25"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income</label>
          <input
            type="text"
            value={formData.annualIncome}
            onChange={(e) => handleChange('annualIncome', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., $75,000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
          <input
            type="text"
            value={formData.occupation}
            onChange={(e) => handleChange('occupation', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Software Engineer"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relationship Status</label>
            <select
              value={formData.relationshipStatus}
              onChange={(e) => handleChange('relationshipStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
              <option value="domestic-partnership">Domestic Partnership</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Dependents</label>
            <input
              type="number"
              value={formData.dependents}
              onChange={(e) => handleChange('dependents', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
          <select
            value={formData.educationLevel}
            onChange={(e) => handleChange('educationLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="high-school">High School</option>
            <option value="some-college">Some College</option>
            <option value="associates">Associate's Degree</option>
            <option value="bachelors">Bachelor's Degree</option>
            <option value="masters">Master's Degree</option>
            <option value="doctorate">Doctorate</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;