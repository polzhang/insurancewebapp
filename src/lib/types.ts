// src/lib/types.ts

/**
 * Defines the structure for the user's profile data
 * sent from the frontend.
 */
export interface ProfileData {
  age: string;
  gender: string;
  maritalStatus: string;
  dependents: string;
  occupation: string;
  employmentStatus: string;
  annualIncome: string;
  employerName: string;
  height: string;
  weight: string;
  smokingStatus: string;
  alcoholConsumption: string;
  exerciseFrequency: string;
  chronicConditions: string;
  currentMedications: string;
  familyMedicalHistory: string;
  drivingRecord: string;
  dangerousHobbies: string;
  travelFrequency: string;
  existingInsurance: string;
  monthlyExpenses: string;
  creditScore: string;
}