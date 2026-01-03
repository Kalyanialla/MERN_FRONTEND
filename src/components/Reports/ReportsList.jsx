// src/components/Reports/ReportsList.jsx
import React, { useState, useEffect } from 'react';
import { reportsAPI } from '../../services/api';
import Navbar from '../Common/Navbar';
import ReportCard from './ReportCard';
import UploadReport from './UploadReport';
import ReportFilters from './ReportFilters';
import Loading from '../Common/Loading';

const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [filters, setFilters] = useState({
    date: '',
    vital_type: '',
    report_type: '',
  });

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, reports]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await reportsAPI.getAll();
      setReports(response.data);
      setFilteredReports(response.data);
    } catch (err) {
      console.error('Failed to fetch reports:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...reports];

    if (filters.date) {
      filtered = filtered.filter(r => r.date === filters.date);
    }

    if (filters.report_type) {
      filtered = filtered.filter(r => r.report_type === filters.report_type);
    }

    if (filters.vital_type) {
      filtered = filtered.filter(r => 
        r.vitals_summary && r.vitals_summary.includes(filters.vital_type)
      );
    }

    setFilteredReports(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleUploadSuccess = () => {
    setShowUploadModal(false);
    fetchReports();
  };

  const handleDelete = async (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        await reportsAPI.delete(reportId);
        fetchReports();
      } catch (err) {
        alert('Failed to delete report');
        console.error(err);
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="page-container">
      <Navbar />
      
      <div className="page-content">
        <div className="page-header">
          <div>
            <h1>My Reports</h1>
            <p>Manage your medical reports and documents</p>
          </div>
          <button 
            className="btn-primary"
            onClick={() => setShowUploadModal(true)}
          >
            ➕ Upload Report
          </button>
        </div>

        <ReportFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          reportTypes={[...new Set(reports.map(r => r.report_type))]}
        />

        <div className="reports-grid">
          {filteredReports.length > 0 ? (
            filteredReports.map(report => (
              <ReportCard 
                key={report.id} 
                report={report}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="no-data-message">
              <p>No reports found. Upload your first report to get started!</p>
            </div>
          )}
        </div>
      </div>

      {showUploadModal && (
        <UploadReport 
          onClose={() => setShowUploadModal(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
};

export default ReportsList;