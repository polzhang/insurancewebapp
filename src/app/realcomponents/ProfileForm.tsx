'use client';

import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface ProfileData {
  // Personal
  age: string;
  gender: string;
  maritalStatus: string;
  dependents: string;
  
  // Employment & Income
  occupation: string;
  employmentStatus: string;
  annualIncome: string;
  employerName: string;
  
  // Health & Lifestyle
  height: string;
  weight: string;
  smokingStatus: string;
  alcoholConsumption: string;
  exerciseFrequency: string;
  
  // Medical
  chronicConditions: string;
  currentMedications: string;
  familyMedicalHistory: string;
  
  // Risk Factors
  drivingRecord: string;
  dangerousHobbies: string;
  travelFrequency: string;
  
  // Financial
  existingInsurance: string;
  monthlyExpenses: string;
  creditScore: string;
}

interface ProfileFormProps {
  profile: ProfileData;
  onProfileUpdate: (profile: ProfileData) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onProfileUpdate }) => {
  const [mounted, setMounted] = useState(false);
  
  const defaultProfile: ProfileData = {
    // Personal
    age: '',
    gender: '',
    maritalStatus: '',
    dependents: '',
    
    // Employment & Income
    occupation: '',
    employmentStatus: '',
    annualIncome: '',
    employerName: '',
    
    // Health & Lifestyle
    height: '',
    weight: '',
    smokingStatus: '',
    alcoholConsumption: '',
    exerciseFrequency: '',
    
    // Medical
    chronicConditions: '',
    currentMedications: '',
    familyMedicalHistory: '',
    
    // Risk Factors
    drivingRecord: '',
    dangerousHobbies: '',
    travelFrequency: '',
    
    // Financial
    existingInsurance: '',
    monthlyExpenses: '',
    creditScore: ''
  };

  const [formData, setFormData] = useState<ProfileData>(() => ({
    ...defaultProfile,
    ...profile
  }));

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (field: keyof ProfileData, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onProfileUpdate(updatedData);
  };

  const SectionHeader = ({ title, isFirst = false }: { title: string; isFirst?: boolean }) => (
    <div style={{ 
      paddingTop: isFirst ? '0' : '24px', 
      marginTop: isFirst ? '0' : '24px', 
      borderTop: isFirst ? 'none' : '1px solid #e5e7eb',
      marginBottom: '16px'
    }}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '0' }}>{title}</h3>
    </div>
  );

  const FormField = ({ 
    label, 
    children, 
    className = "" 
  }: { 
    label: string; 
    children: React.ReactNode;
    className?: string;
  }) => (
    <div style={{ marginBottom: '16px' }} className={className}>
      <Label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '8px' }}>{label}</Label>
      {children}
    </div>
  );

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Card className="w-full" style={{ height: '550px', display: 'flex', flexDirection: 'column' }}>
        <CardHeader style={{ paddingBottom: '16px', flexShrink: 0 }}>
          <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>
            <User style={{ width: '20px', height: '20px' }} />
            Personal Profile
          </CardTitle>
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
            Complete your profile information for personalized recommendations
          </p>
          <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '16px' }}></div>
        </CardHeader>
        <CardContent style={{ flex: 1, minHeight: 0, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: '#6b7280' }}>Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full" style={{ height: '550px', display: 'flex', flexDirection: 'column' }}>
      <CardHeader style={{ paddingBottom: '16px', flexShrink: 0 }}>
        <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>
          <User style={{ width: '20px', height: '20px' }} />
          Personal Profile
        </CardTitle>
        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
          Complete your profile information for personalized recommendations
        </p>
        <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '16px' }}></div>
      </CardHeader>
      
      <CardContent style={{ overflowY: 'auto', padding: '0 24px', flex: 1, minHeight: 0 }}>
        {/* Personal Information */}
        <SectionHeader title="Personal Information" isFirst={true} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
          <div>
            <FormField label="Age">
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                placeholder="e.g., 25"
                style={{ height: '40px', width: '100%' }}
              />
            </FormField>
          </div>
          
          <div>
            <FormField label="Gender">
              <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)}>
                <SelectTrigger style={{ height: '40px', width: '100%' }}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
          <div>
            <FormField label="Marital Status">
              <Select value={formData.maritalStatus} onValueChange={(value) => handleChange('maritalStatus', value)}>
                <SelectTrigger style={{ height: '40px', width: '100%' }}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
          
          <div>
            <FormField label="Number of Dependents">
              <Input
                type="number"
                value={formData.dependents}
                onChange={(e) => handleChange('dependents', e.target.value)}
                placeholder="0"
                min="0"
                style={{ height: '40px', width: '100%' }}
              />
            </FormField>
          </div>
        </div>

        {/* Employment & Income */}
        <SectionHeader title="Employment & Income" />
        <FormField label="Occupation">
          <Input
            value={formData.occupation}
            onChange={(e) => handleChange('occupation', e.target.value)}
            placeholder="e.g., Software Engineer"
            style={{ height: '40px' }}
          />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
          <div>
            <FormField label="Employment Status">
              <Select value={formData.employmentStatus} onValueChange={(value) => handleChange('employmentStatus', value)}>
                <SelectTrigger style={{ height: '40px', width: '100%' }}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="self-employed">Self-employed</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
          
          <div>
            <FormField label="Annual Income (SGD)">
              <Input
                value={formData.annualIncome}
                onChange={(e) => handleChange('annualIncome', e.target.value)}
                placeholder="e.g., 75,000"
                style={{ height: '40px', width: '100%' }}
              />
            </FormField>
          </div>
        </div>

        <FormField label="Employer Name">
          <Input
            value={formData.employerName}
            onChange={(e) => handleChange('employerName', e.target.value)}
            placeholder="e.g., ABC Company Pte Ltd"
            style={{ height: '40px' }}
          />
        </FormField>

        {/* Health & Lifestyle */}
        <SectionHeader title="Health & Lifestyle" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
          <div>
            <FormField label="Height (cm)">
              <Input
                type="number"
                value={formData.height}
                onChange={(e) => handleChange('height', e.target.value)}
                placeholder="e.g., 170"
                style={{ height: '40px', width: '100%' }}
              />
            </FormField>
          </div>
          
          <div>
            <FormField label="Weight (kg)">
              <Input
                type="number"
                value={formData.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
                placeholder="e.g., 70"
                style={{ height: '40px', width: '100%' }}
              />
            </FormField>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
          <div>
            <FormField label="Smoking Status">
              <Select value={formData.smokingStatus} onValueChange={(value) => handleChange('smokingStatus', value)}>
                <SelectTrigger style={{ height: '40px', width: '100%' }}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never smoked</SelectItem>
                  <SelectItem value="former">Former smoker</SelectItem>
                  <SelectItem value="current">Current smoker</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
          
          <div>
            <FormField label="Alcohol Consumption">
              <Select value={formData.alcoholConsumption} onValueChange={(value) => handleChange('alcoholConsumption', value)}>
                <SelectTrigger style={{ height: '40px', width: '100%' }}>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="occasional">Occasional</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="heavy">Heavy</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
        </div>

        <FormField label="Exercise Frequency">
          <Select value={formData.exerciseFrequency} onValueChange={(value) => handleChange('exerciseFrequency', value)}>
            <SelectTrigger style={{ height: '40px' }}>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No exercise</SelectItem>
              <SelectItem value="1-2-weekly">1-2 times per week</SelectItem>
              <SelectItem value="3-4-weekly">3-4 times per week</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        {/* Medical History */}
        <SectionHeader title="Medical History" />
        <FormField label="Chronic Conditions">
          <Textarea
            value={formData.chronicConditions}
            onChange={(e) => handleChange('chronicConditions', e.target.value)}
            placeholder="List any chronic conditions (e.g., diabetes, hypertension, asthma)"
            style={{ minHeight: '80px', resize: 'vertical' }}
          />
        </FormField>

        <FormField label="Current Medications">
          <Textarea
            value={formData.currentMedications}
            onChange={(e) => handleChange('currentMedications', e.target.value)}
            placeholder="List all current medications and dosages"
            style={{ minHeight: '80px', resize: 'vertical' }}
          />
        </FormField>

        <FormField label="Family Medical History">
          <Textarea
            value={formData.familyMedicalHistory}
            onChange={(e) => handleChange('familyMedicalHistory', e.target.value)}
            placeholder="List significant family medical history (e.g., heart disease, cancer, diabetes)"
            style={{ minHeight: '80px', resize: 'vertical' }}
          />
        </FormField>

        {/* Risk Factors */}
        <SectionHeader title="Risk Assessment" />
        <FormField label="Driving Record">
          <Select value={formData.drivingRecord} onValueChange={(value) => handleChange('drivingRecord', value)}>
            <SelectTrigger style={{ height: '40px' }}>
              <SelectValue placeholder="Select driving record" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clean">Clean record</SelectItem>
              <SelectItem value="minor">Minor violations</SelectItem>
              <SelectItem value="major">Major violations</SelectItem>
              <SelectItem value="no-license">No license</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="High-Risk Activities or Hobbies">
          <Textarea
            value={formData.dangerousHobbies}
            onChange={(e) => handleChange('dangerousHobbies', e.target.value)}
            placeholder="List any high-risk activities (e.g., skydiving, rock climbing, motorsports)"
            style={{ minHeight: '80px', resize: 'vertical' }}
          />
        </FormField>

        <FormField label="Travel Frequency">
          <Select value={formData.travelFrequency} onValueChange={(value) => handleChange('travelFrequency', value)}>
            <SelectTrigger style={{ height: '40px' }}>
              <SelectValue placeholder="Select travel frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rarely">Rarely travel</SelectItem>
              <SelectItem value="domestic">Domestic travel only</SelectItem>
              <SelectItem value="international">International travel</SelectItem>
              <SelectItem value="frequent">Frequent international traveler</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        {/* Financial Information */}
        <SectionHeader title="Financial Information" />
        <FormField label="Existing Insurance Coverage">
          <Textarea
            value={formData.existingInsurance}
            onChange={(e) => handleChange('existingInsurance', e.target.value)}
            placeholder="List current insurance policies (life, health, auto, etc.)"
            style={{ minHeight: '80px', resize: 'vertical' }}
          />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%', marginBottom: '0' }}>
          <div>
            <FormField label="Monthly Expenses (SGD)">
              <Input
                value={formData.monthlyExpenses}
                onChange={(e) => handleChange('monthlyExpenses', e.target.value)}
                placeholder="e.g., 4,000"
                style={{ height: '40px', width: '100%' }}
              />
            </FormField>
          </div>
          
          <div>
            <FormField label="Credit Score Range">
              <Select value={formData.creditScore} onValueChange={(value) => handleChange('creditScore', value)}>
                <SelectTrigger style={{ height: '40px', width: '100%' }}>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent (800+)</SelectItem>
                  <SelectItem value="good">Good (670-799)</SelectItem>
                  <SelectItem value="fair">Fair (580-669)</SelectItem>
                  <SelectItem value="poor">Poor (Below 580)</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;