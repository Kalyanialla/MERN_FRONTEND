// src/utils/constants.js

export const REPORT_TYPES = [
  'Blood Test',
  'X-Ray',
  'MRI Scan',
  'CT Scan',
  'Ultrasound',
  'ECG',
  'Prescription',
  'Medical Certificate',
  'Other'
];

export const VITAL_TYPES = [
  { name: 'Blood Pressure (Systolic)', unit: 'mmHg' },
  { name: 'Blood Pressure (Diastolic)', unit: 'mmHg' },
  { name: 'Heart Rate', unit: 'bpm' },
  { name: 'Blood Sugar (Fasting)', unit: 'mg/dL' },
  { name: 'Blood Sugar (Random)', unit: 'mg/dL' },
  { name: 'HbA1c', unit: '%' },
  { name: 'Cholesterol (Total)', unit: 'mg/dL' },
  { name: 'Cholesterol (LDL)', unit: 'mg/dL' },
  { name: 'Cholesterol (HDL)', unit: 'mg/dL' },
  { name: 'Triglycerides', unit: 'mg/dL' },
  { name: 'Body Temperature', unit: '°F' },
  { name: 'Weight', unit: 'kg' },
  { name: 'BMI', unit: 'kg/m²' },
  { name: 'Oxygen Saturation', unit: '%' },
  { name: 'Hemoglobin', unit: 'g/dL' },
];

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';