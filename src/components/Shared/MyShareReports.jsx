// src/components/Shared/MySharedReports.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { reportsAPI } from '../../services/api';
import Navbar from '../Common/Navbar';
import Loading from '../Common/Loading';

const MySharedReports = () => {
  const [sharedReports, setSharedReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMySharedReports();
  }, []);

  const fetchMySharedReports = async () => {
    try {
      setLoading(true);
      const response = await reportsAPI.getMySharedReports();
      setSharedReports(response.data);
    } catch (err) {
      console.error('Failed to fetch my shared reports:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="page-container">
      <Navbar />
      
      <div className="page-content">
        <div className="page-header">
          <div>
            <h1>My Shared Reports</h1>
            <p>Reports you've shared with others</p>
          </div>
        </div>

        <div className="shared-reports-list">
          {sharedReports.length > 0 ? (
            sharedReports.map((report) => (
              <div key={report.id} className="shared-report-card">
                <div className="report-header">
                  <div>
                    <h3>{report.original_name}</h3>
                    <p className="share-count">
                      Shared with <strong>{report.shared_count}</strong> {report.shared_count === 1 ? 'person' : 'people'}
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
                    <label>Uploaded</label>
                    <p>{new Date(report.uploaded_at).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="report-actions">
                  <Link 
                    to={`/reports/${report.id}`}
                    className="btn-secondary"
                  >
                    View Details
                  </Link>
                  <Link 
                    to={`/reports/${report.id}`}
                    className="btn-primary"
                  >
                    Manage Access
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data-message">
              <p>You haven't shared any reports yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MySharedReports;