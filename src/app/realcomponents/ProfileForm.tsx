'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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

// Define Field component OUTSIDE of ProfileForm
const Field = React.memo(({ label, id, value, onChange, type = "text", placeholder, options, textarea }) => (
  <div>
    <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
    {options ? (
      <Select value={value || ""} onValueChange={onChange}>
        <SelectTrigger className="mt-1">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(([optValue, optLabel]) => (
            <SelectItem key={optValue} value={optValue}>{optLabel}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    ) : textarea ? (
      <Textarea
        id={id}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 min-h-[60px]"
      />
    ) : (
      <Input
        id={id}
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1"
        min={type === "number" ? "0" : undefined}
      />
    )}
  </div>
));

const ProfileForm = ({ profile = {} as ProfileData, onProfileUpdate = () => {} }) => {
  const [data, setData] = useState(profile);
  const timeoutRef = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => onProfileUpdate(data), 300);
    return () => clearTimeout(timeoutRef.current);
  }, [data]);

  // Use useCallback to prevent function recreation
  const update = useCallback((field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  }, []);

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
        <div>
          <h3 className="text-base font-semibold mb-4 pb-2 border-b">1. Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Age" id="age" type="number" placeholder="e.g., 25" 
              value={data.age} onChange={(v) => update('age', v)} />
            <Field label="Gender" id="gender" placeholder="Select gender" 
              value={data.gender} onChange={(v) => update('gender', v)}
              options={[["male", "Male"], ["female", "Female"], ["other", "Other"]]} />
            <Field label="Marital Status" id="maritalStatus" placeholder="Select status"
              value={data.maritalStatus} onChange={(v) => update('maritalStatus', v)}
              options={[["single", "Single"], ["married", "Married"], ["divorced", "Divorced"], ["widowed", "Widowed"]]} />
            <Field label="Dependents" id="dependents" type="number" placeholder="0" 
              value={data.dependents} onChange={(v) => update('dependents', v)} />
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-4 pb-2 border-b">2. Employment & Income</h3>
          <div className="space-y-4">
            <Field label="Occupation" id="occupation" placeholder="e.g., Software Engineer" 
              value={data.occupation} onChange={(v) => update('occupation', v)} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Employment Status" id="employmentStatus" placeholder="Select status"
                value={data.employmentStatus} onChange={(v) => update('employmentStatus', v)}
                options={[["full-time", "Full-time"], ["part-time", "Part-time"], ["self-employed", "Self-employed"], ["unemployed", "Unemployed"], ["retired", "Retired"]]} />
              <Field label="Annual Income (SGD)" id="annualIncome" placeholder="e.g., 75,000" 
                value={data.annualIncome} onChange={(v) => update('annualIncome', v)} />
            </div>
            <Field label="Employer Name" id="employerName" placeholder="e.g., ABC Company Pte Ltd" 
              value={data.employerName} onChange={(v) => update('employerName', v)} />
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-4 pb-2 border-b">3. Health & Lifestyle</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Height (cm)" id="height" type="number" placeholder="e.g., 170" 
                value={data.height} onChange={(v) => update('height', v)} />
              <Field label="Weight (kg)" id="weight" type="number" placeholder="e.g., 70" 
                value={data.weight} onChange={(v) => update('weight', v)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Smoking Status" id="smokingStatus" placeholder="Select status"
                value={data.smokingStatus} onChange={(v) => update('smokingStatus', v)}
                options={[["never", "Never smoked"], ["former", "Former smoker"], ["current", "Current smoker"]]} />
              <Field label="Alcohol Consumption" id="alcoholConsumption" placeholder="Select frequency"
                value={data.alcoholConsumption} onChange={(v) => update('alcoholConsumption', v)}
                options={[["none", "None"], ["occasional", "Occasional"], ["moderate", "Moderate"], ["heavy", "Heavy"]]} />
            </div>
            <Field label="Exercise Frequency" id="exerciseFrequency" placeholder="Select frequency"
              value={data.exerciseFrequency} onChange={(v) => update('exerciseFrequency', v)}
              options={[["none", "No exercise"], ["1-2-weekly", "1-2 times per week"], ["3-4-weekly", "3-4 times per week"], ["daily", "Daily"]]} />
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-4 pb-2 border-b">4. Medical History</h3>
          <div className="space-y-4">
            <Field label="Chronic Conditions" id="chronicConditions" placeholder="List any chronic conditions" 
              value={data.chronicConditions} onChange={(v) => update('chronicConditions', v)} textarea />
            <Field label="Current Medications" id="currentMedications" placeholder="List current medications" 
              value={data.currentMedications} onChange={(v) => update('currentMedications', v)} textarea />
            <Field label="Family Medical History" id="familyMedicalHistory" placeholder="List significant family medical history" 
              value={data.familyMedicalHistory} onChange={(v) => update('familyMedicalHistory', v)} textarea />
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-4 pb-2 border-b">5. Risk Assessment</h3>
          <div className="space-y-4">
            <Field label="Driving Record" id="drivingRecord" placeholder="Select driving record"
              value={data.drivingRecord} onChange={(v) => update('drivingRecord', v)}
              options={[["clean", "Clean record"], ["minor", "Minor violations"], ["major", "Major violations"], ["no-license", "No license"]]} />
            <Field label="High-Risk Activities" id="dangerousHobbies" placeholder="List any high-risk activities" 
              value={data.dangerousHobbies} onChange={(v) => update('dangerousHobbies', v)} textarea />
            <Field label="Travel Frequency" id="travelFrequency" placeholder="Select travel frequency"
              value={data.travelFrequency} onChange={(v) => update('travelFrequency', v)}
              options={[["rarely", "Rarely travel"], ["domestic", "Domestic travel only"], ["international", "International travel"], ["frequent", "Frequent international traveler"]]} />
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-4 pb-2 border-b">6. Financial Information</h3>
          <div className="space-y-4">
            <Field label="Existing Insurance" id="existingInsurance" placeholder="List current insurance policies" 
              value={data.existingInsurance} onChange={(v) => update('existingInsurance', v)} textarea />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Monthly Expenses (SGD)" id="monthlyExpenses" placeholder="e.g., 4,000" 
                value={data.monthlyExpenses} onChange={(v) => update('monthlyExpenses', v)} />
              <Field label="Credit Score Range" id="creditScore" placeholder="Select range"
                value={data.creditScore} onChange={(v) => update('creditScore', v)}
                options={[["excellent", "Excellent (800+)"], ["good", "Good (670-799)"], ["fair", "Fair (580-669)"], ["poor", "Poor (Below 580)"], ["unknown", "Unknown"]]} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;