'use client';

import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface ProfileData {
  age: string; gender: string; maritalStatus: string; dependents: string;
  occupation: string; employmentStatus: string; annualIncome: string; employerName: string;
  height: string; weight: string; smokingStatus: string; alcoholConsumption: string; exerciseFrequency: string;
  chronicConditions: string; currentMedications: string; familyMedicalHistory: string;
  drivingRecord: string; dangerousHobbies: string; travelFrequency: string;
  existingInsurance: string; monthlyExpenses: string; creditScore: string;
}

interface ProfileFormProps {
  profile: ProfileData;
  onProfileUpdate: (profile: ProfileData) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onProfileUpdate }) => {
  const [localProfile, setLocalProfile] = useState<ProfileData>(profile);

  useEffect(() => {
    if (JSON.stringify(profile) !== JSON.stringify(localProfile)) {
      setLocalProfile(profile);
    }
  }, [profile]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (JSON.stringify(localProfile) !== JSON.stringify(profile)) {
        onProfileUpdate(localProfile);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [localProfile]);

  const updateField = (field: keyof ProfileData, value: string) => {
    setLocalProfile(prev => ({ ...prev, [field]: value }));
  };

  const FormField = ({ label, id, type = "text", placeholder, children }: {
    label: string; id: keyof ProfileData; type?: string; placeholder?: string; children?: React.ReactNode;
  }) => (
    <div>
      <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
      {children || (
        <Input
          id={id}
          type={type}
          value={localProfile[id]}
          onChange={(e) => updateField(id, e.target.value)}
          placeholder={placeholder}
          className="mt-1"
          min={type === "number" ? "0" : undefined}
        />
      )}
    </div>
  );

  const SelectField = ({ label, id, placeholder, options }: {
    label: string; id: keyof ProfileData; placeholder: string; options: { value: string; label: string }[];
  }) => (
    <FormField label={label} id={id}>
      <Select value={localProfile[id]} onValueChange={(value) => updateField(id, value)}>
        <SelectTrigger className="mt-1">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );

  const TextareaField = ({ label, id, placeholder }: {
    label: string; id: keyof ProfileData; placeholder: string;
  }) => (
    <FormField label={label} id={id}>
      <Textarea
        id={id}
        value={localProfile[id]}
        onChange={(e) => updateField(id, e.target.value)}
        placeholder={placeholder}
        className="mt-1 min-h-[60px]"
      />
    </FormField>
  );

  const sections = [
    {
      title: "1. Personal Information",
      fields: (
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Age" id="age" type="number" placeholder="e.g., 25" />
          <SelectField label="Gender" id="gender" placeholder="Select gender" 
            options={[
              {value: "male", label: "Male"}, {value: "female", label: "Female"}, {value: "other", label: "Other"}
            ]} />
          <SelectField label="Marital Status" id="maritalStatus" placeholder="Select status"
            options={[
              {value: "single", label: "Single"}, {value: "married", label: "Married"}, 
              {value: "divorced", label: "Divorced"}, {value: "widowed", label: "Widowed"}
            ]} />
          <FormField label="Dependents" id="dependents" type="number" placeholder="0" />
        </div>
      )
    },
    {
      title: "2. Employment & Income",
      fields: (
        <div className="space-y-4">
          <FormField label="Occupation" id="occupation" placeholder="e.g., Software Engineer" />
          <div className="grid grid-cols-2 gap-4">
            <SelectField label="Employment Status" id="employmentStatus" placeholder="Select status"
              options={[
                {value: "full-time", label: "Full-time"}, {value: "part-time", label: "Part-time"},
                {value: "self-employed", label: "Self-employed"}, {value: "unemployed", label: "Unemployed"},
                {value: "retired", label: "Retired"}
              ]} />
            <FormField label="Annual Income (SGD)" id="annualIncome" placeholder="e.g., 75,000" />
          </div>
          <FormField label="Employer Name" id="employerName" placeholder="e.g., ABC Company Pte Ltd" />
        </div>
      )
    },
    {
      title: "3. Health & Lifestyle",
      fields: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Height (cm)" id="height" type="number" placeholder="e.g., 170" />
            <FormField label="Weight (kg)" id="weight" type="number" placeholder="e.g., 70" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SelectField label="Smoking Status" id="smokingStatus" placeholder="Select status"
              options={[
                {value: "never", label: "Never smoked"}, {value: "former", label: "Former smoker"},
                {value: "current", label: "Current smoker"}
              ]} />
            <SelectField label="Alcohol Consumption" id="alcoholConsumption" placeholder="Select frequency"
              options={[
                {value: "none", label: "None"}, {value: "occasional", label: "Occasional"},
                {value: "moderate", label: "Moderate"}, {value: "heavy", label: "Heavy"}
              ]} />
          </div>
          <SelectField label="Exercise Frequency" id="exerciseFrequency" placeholder="Select frequency"
            options={[
              {value: "none", label: "No exercise"}, {value: "1-2-weekly", label: "1-2 times per week"},
              {value: "3-4-weekly", label: "3-4 times per week"}, {value: "daily", label: "Daily"}
            ]} />
        </div>
      )
    },
    {
      title: "4. Medical History",
      fields: (
        <div className="space-y-4">
          <TextareaField label="Chronic Conditions" id="chronicConditions" placeholder="List any chronic conditions" />
          <TextareaField label="Current Medications" id="currentMedications" placeholder="List current medications" />
          <TextareaField label="Family Medical History" id="familyMedicalHistory" placeholder="List significant family medical history" />
        </div>
      )
    },
    {
      title: "5. Risk Assessment",
      fields: (
        <div className="space-y-4">
          <SelectField label="Driving Record" id="drivingRecord" placeholder="Select driving record"
            options={[
              {value: "clean", label: "Clean record"}, {value: "minor", label: "Minor violations"},
              {value: "major", label: "Major violations"}, {value: "no-license", label: "No license"}
            ]} />
          <TextareaField label="High-Risk Activities" id="dangerousHobbies" placeholder="List any high-risk activities" />
          <SelectField label="Travel Frequency" id="travelFrequency" placeholder="Select travel frequency"
            options={[
              {value: "rarely", label: "Rarely travel"}, {value: "domestic", label: "Domestic travel only"},
              {value: "international", label: "International travel"}, {value: "frequent", label: "Frequent international traveler"}
            ]} />
        </div>
      )
    },
    {
      title: "6. Financial Information",
      fields: (
        <div className="space-y-4">
          <TextareaField label="Existing Insurance" id="existingInsurance" placeholder="List current insurance policies" />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Monthly Expenses (SGD)" id="monthlyExpenses" placeholder="e.g., 4,000" />
            <SelectField label="Credit Score Range" id="creditScore" placeholder="Select range"
              options={[
                {value: "excellent", label: "Excellent (800+)"}, {value: "good", label: "Good (670-799)"},
                {value: "fair", label: "Fair (580-669)"}, {value: "poor", label: "Poor (Below 580)"},
                {value: "unknown", label: "Unknown"}
              ]} />
          </div>
        </div>
      )
    }
  ];

  return (
    <Card className="w-full h-[550px] flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold">
          <User className="w-5 h-5" />
          Personal Profile
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Complete your profile for personalized recommendations
        </p>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto space-y-6">
        {sections.map((section, index) => (
          <div key={index}>
            <h3 className="text-base font-semibold mb-4 pb-2 border-b">{section.title}</h3>
            {section.fields}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProfileForm;