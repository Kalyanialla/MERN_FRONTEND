// src/components/Reports/ReportFilters.jsx
import React from 'react';

const ReportFilters = ({ filters, onFilterChange, reportTypes }) => {
  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const clearFilters = () => {
    onFilterChange({ date: '', vital_type: '', report_type: '' });
  };

  const hasActiveFilters = filters.date || filters.vital_type || filters.report_type;

  return (
    <div className="filters-container">
      <div className="filters-grid">
        <div className="filter-group">
          <label>Date</label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => handleChange('date', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Report Type</label>
          <select
            value={filters.report_type}
            onChange={(e) => handleChange('report_type', e.target.value)}
          >
            <option value="">All Types</option>
            {reportTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Vital Type</label>
          <input
            type="text"
            placeholder="e.g., Blood Pressure"
            value={filters.vital_type}
            onChange={(e) => handleChange('vital_type', e.target.value)}
          />
        </div>
      </div>

      {hasActiveFilters && (
        <button className="btn-secondary small" onClick={clearFilters}>
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default ReportFilters;