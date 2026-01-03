// src/components/Reports/ReportDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { reportsAPI } from '../../services/api';
import { reportsAPI } from '../../services/api';
import Navbar from '../Common/Navbar';
import Loading from '../Common/Loading';

const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReportDetails();
  }, [id]);

  const fetchReportDetails = async () => {
    try {
      setLoading(true);
      const response = await reportsAPI.getById(id);
      setReport(response.data);
    } catch (err) {
      setError('Failed to load report details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    window.open(reportsAPI.download(id), '_blank');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        await reportsAPI.delete(id);
        navigate('/reports');
      } catch (err) {
        alert('Failed to delete report');
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="error-message">{error}</div>;
  if (!report) return <div>Report not found</div>;

  return (
    <div className="page-container">
      <Navbar />
      
      <div className="page-content">
        <div className="details-header">
          <button className="btn-back" onClick={() => navigate('/reports')}>
            ← Back to Reports
          </button>
          <div className="details-actions">
            <button className="btn-secondary" onClick={handleDownload}>
              ⬇️ Download
            </button>
            <button className="btn-danger" onClick={handleDelete}>
              🗑️ Delete
            </button>
          </div>
        </div>

        <div className="details-card">
          <div className="details-header-info">
            <h1>{report.original_name}</h1>
            <span className="type-badge">{report.report_type}</span>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <label>Test Date</label>
              <p>{new Date(report.date).toLocaleDateString()}</p>
            </div>

            <div className="detail-item">
              <label>Uploaded Date</label>
              <p>{new Date(report.uploaded_at).toLocaleDateString()}</p>
            </div>

            <div className="detail-item">
              <label>File Type</label>
              <p>{report.file_type}</p>
            </div>

            {report.owner_username && (
              <div className="detail-item">
                <label>Owner</label>
                <p>{report.owner_username}</p>
              </div>
            )}
          </div>

          {report.vitals && report.vitals.length > 0 && (
            <div className="vitals-details">
              <h3>Vitals Data</h3>
              <div className="vitals-table">
                <table>
                  <thead>
                    <tr>
                      <th>Vital Type</th>
                      <th>Value</th>
                      <th>Unit</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.vitals.map((vital) => (
                      <tr key={vital.id}>
                        <td>{vital.type}</td>
                        <td>{vital.value}</td>
                        <td>{vital.unit || '-'}</td>
                        <td>{new Date(vital.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;