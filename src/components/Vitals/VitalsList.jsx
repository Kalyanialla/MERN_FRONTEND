// src/components/Vitals/VitalsList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { vitalsAPI } from '../../services/api';
import { vitalsAPI } from '../../services/api';
import Navbar from '../Common/Navbar';
import AddVital from './AddVital';
import Loading from '../Common/Loading';

const VitalsList = () => {
  const [vitals, setVitals] = useState([]);
  const [vitalTypes, setVitalTypes] = useState([]);
  const [latestVitals, setLatestVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    start_date: '',
    end_date: ''
  });

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [vitalsRes, typesRes, latestRes] = await Promise.all([
        vitalsAPI.getAll(filters),
        vitalsAPI.getTypes(),
        vitalsAPI.getLatest()
      ]);
      setVitals(vitalsRes.data);
      setVitalTypes(typesRes.data);
      setLatestVitals(latestRes.data);
    } catch (err) {
      console.error('Failed to fetch vitals:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleAddSuccess = () => {
    setShowAddModal(false);
    fetchData();
  };

  if (loading) return <Loading />;

  return (
    <div className="page-container">
      <Navbar />
      
      <div className="page-content">
        <div className="page-header">
          <div>
            <h1>Vitals Tracking</h1>
            <p>Monitor your health vitals over time</p>
          </div>
          <button 
            className="btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            ➕ Add Vital
          </button>
        </div>

        {/* Latest Vitals Summary */}
        <div className="vitals-summary">
          <h3>Latest Readings</h3>
          <div className="vitals-cards-grid">
            {latestVitals.map((vital) => (
              <Link 
                key={vital.id} 
                to={`/vitals/trends/${vital.type}`}
                className="vital-summary-card"
              >
                <div className="vital-icon">❤️</div>
                <div className="vital-info">
                  <h4>{vital.type}</h4>
                  <p className="vital-value">
                    {vital.value} {vital.unit}
                  </p>
                  <span className="vital-date">
                    {new Date(vital.date).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Vital Types Overview */}
        <div className="vital-types-section">
          <h3>Vital Types Tracked</h3>
          <div className="vital-types-grid">
            {vitalTypes.map((type) => (
              <Link 
                key={type.type} 
                to={`/vitals/trends/${type.type}`}
                className="vital-type-card"
              >
                <h4>{type.type}</h4>
                <p>{type.count} readings</p>
                <span className="view-trends">View Trends →</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="filters-container">
          <div className="filters-grid">
            <div className="filter-group">
              <label>Vital Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="">All Types</option>
                {vitalTypes.map(type => (
                  <option key={type.type} value={type.type}>{type.type}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Start Date</label>
              <input
                type="date"
                value={filters.start_date}
                onChange={(e) => handleFilterChange('start_date', e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>End Date</label>
              <input
                type="date"
                value={filters.end_date}
                onChange={(e) => handleFilterChange('end_date', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Vitals Table */}
        <div className="vitals-table-container">
          <h3>All Readings</h3>
          <table className="vitals-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Value</th>
                <th>Unit</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {vitals.length > 0 ? (
                vitals.map((vital) => (
                  <tr key={vital.id}>
                    <td>{vital.type}</td>
                    <td>{vital.value}</td>
                    <td>{vital.unit || '-'}</td>
                    <td>{new Date(vital.date).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">No vitals recorded</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <AddVital 
          onClose={() => setShowAddModal(false)}
          onSuccess={handleAddSuccess}
        />
      )}
    </div>
  );
};

export default VitalsList;