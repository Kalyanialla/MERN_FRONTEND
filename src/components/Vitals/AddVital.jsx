// src/components/Vitals/AddVital.jsx
import React, { useState } from 'react';
import { vitalsAPI } from '../../services/api';

const AddVital = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    type: '',
    value: '',
    unit: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const vitalTypes = [
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'type') {
      const selectedVital = vitalTypes.find(v => v.name === value);
      if (selectedVital) {
        setFormData(prev => ({ ...prev, unit: selectedVital.unit }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await vitalsAPI.add({
        type: formData.type,
        value: parseFloat(formData.value),
        unit: formData.unit,
        date: formData.date
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add vital');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Vital Reading</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="vital-form">
          <div className="form-group">
            <label>Vital Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              {vitalTypes.map((vital) => (
                <option key={vital.name} value={vital.name}>
                  {vital.name}
                </option>
              ))}
              <option value="Other">Other (Custom)</option>
            </select>
          </div>

          {formData.type === 'Other' && (
            <div className="form-group">
              <label>Custom Vital Name *</label>
              <input
                type="text"
                name="type"
                placeholder="Enter vital name"
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Value *</label>
            <input
              type="number"
              name="value"
              step="0.01"
              value={formData.value}
              onChange={handleChange}
              placeholder="Enter value"
              required
            />
          </div>

          <div className="form-group">
            <label>Unit *</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              placeholder="e.g., mmHg, mg/dL, bpm"
              required
            />
          </div>

          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-footer">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Vital'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVital;