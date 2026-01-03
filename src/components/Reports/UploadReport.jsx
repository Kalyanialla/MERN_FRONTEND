// src/components/Reports/UploadReport.jsx
import React, { useState } from 'react';
import { reportsAPI } from '../../services/api';

const UploadReport = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    file: null,
    report_type: '',
    date: '',
  });
  const [vitals, setVitals] = useState([{ type: '', value: '', unit: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const reportTypes = [
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        setError('Only PDF and image files are allowed');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setFormData({ ...formData, file });
      setError('');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVitalChange = (index, field, value) => {
    const newVitals = [...vitals];
    newVitals[index][field] = value;
    setVitals(newVitals);
  };

  const addVitalField = () => {
    setVitals([...vitals, { type: '', value: '', unit: '' }]);
  };

  const removeVitalField = (index) => {
    setVitals(vitals.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.file || !formData.report_type || !formData.date) {
      setError('Please fill all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', formData.file);
      formDataToSend.append('report_type', formData.report_type);
      formDataToSend.append('date', formData.date);

      const validVitals = vitals.filter(v => v.type && v.value);
      if (validVitals.length > 0) {
        formDataToSend.append('vitals', JSON.stringify(validVitals));
      }

      await reportsAPI.upload(formDataToSend);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Upload New Report</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label>Report File *</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              required
            />
            <small>Supported: PDF, JPG, PNG (Max 10MB)</small>
          </div>

          <div className="form-group">
            <label>Report Type *</label>
            <select
              name="report_type"
              value={formData.report_type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              {reportTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Test Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="vitals-section">
            <div className="section-header">
              <label>Vitals (Optional)</label>
              <button 
                type="button" 
                className="btn-secondary small"
                onClick={addVitalField}
              >
                ➕ Add Vital
              </button>
            </div>

            {vitals.map((vital, index) => (
              <div key={index} className="vital-input-group">
                <input
                  type="text"
                  placeholder="Type (e.g., Blood Pressure)"
                  value={vital.type}
                  onChange={(e) => handleVitalChange(index, 'type', e.target.value)}
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Value"
                  value={vital.value}
                  onChange={(e) => handleVitalChange(index, 'value', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Unit (e.g., mmHg)"
                  value={vital.unit}
                  onChange={(e) => handleVitalChange(index, 'unit', e.target.value)}
                />
                {vitals.length > 1 && (
                  <button 
                    type="button"
                    className="btn-danger small"
                    onClick={() => removeVitalField(index)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
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
              {loading ? 'Uploading...' : 'Upload Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadReport;