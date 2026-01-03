// src/components/Shared/SharedWithMe.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { reportsAPI } from '../../services/api';
import Navbar from '../Common/Navbar';
import Loading from '../Common/Loading';

const SharedWithMe = () => {
  const [sharedReports, setSharedReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSharedReports();
  }, []);

  const fetchSharedReports = async () => {
    try {
      setLoading(true);
      const response = await reportsAPI.getSharedReports();
      setSharedReports(response.data);
    } catch (err) {
      console.error('Failed to fetch shared reports:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (reportId) => {
    window.open(reportsAPI.download(reportId), '_blank');
  };

  if (loading) return <Loading />;

  return (
    <div className="page-container">
      <Navbar />
      
      <div className="page-content">
        <div className="page-header">
          <div>
            <h1>Shared With Me</h1>
            <p>Reports that others have shared with you</p>
          </div>
        </div>

        <div className="shared-reports-list">
          {sharedReports.length > 0 ? (
            sharedReports.map((report) => (
              <div key={report.id} className="shared-report-card">
                <div className="report-header">
                  <div>
                    <h3>{report.original_name}</h3>
                    <p className="owner-info">
                      Shared by: <strong>{report.owner_username}</strong>
                    </p>
                  </div>
                  <span className="type-badge">{report.report_type}</span>
                </div>

                <div className="report-details">
                  <div className="detail-item">
                    <label>Test Date</label>
                    <p>{new Date(report.date).toLocaleDateString()}</p>
                  </div>
                  <div className="detail-item">
                    <label>Shared On</label>
                    <p>{new Date(report.shared_at).toLocaleDateString()}</p>
                  </div>
                  <div className="detail-item">
                    <label>Access Type</label>
                    <p className="access-badge">{report.access_type}</p>
                  </div>
                </div>

                <div className="report-actions">
                  <Link 
                    to={`/reports/${report.id}`}
                    className="btn-secondary"
                  >
                    View Details
                  </Link>
                  <button 
                    className="btn-primary"
                    onClick={() => handleDownload(report.id)}
                  >
                    ⬇️ Download
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data-message">
              <p>No reports have been shared with you yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedWithMe;