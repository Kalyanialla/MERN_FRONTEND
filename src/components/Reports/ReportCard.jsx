// src/components/Reports/ReportCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { reportsAPI } from '../../services/api';
import ShareReport from './ShareReport';

const ReportCard = ({ report, onDelete }) => {
  const [showShareModal, setShowShareModal] = useState(false);

  const handleDownload = () => {
    window.open(reportsAPI.download(report.id), '_blank');
  };

  return (
    <>
      <div className="report-card">
        <div className="report-card-header">
          <div className="report-type-badge">{report.report_type}</div>
          <div className="report-actions">
            <button 
              className="icon-btn"
              onClick={handleDownload}
              title="Download"
            >
              ⬇️
            </button>
            <button 
              className="icon-btn"
              onClick={() => setShowShareModal(true)}
              title="Share"
            >
              🔗
            </button>
            <button 
              className="icon-btn danger"
              onClick={() => onDelete(report.id)}
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </div>

        <div className="report-card-body">
          <h3>{report.original_name}</h3>
          <div className="report-meta">
            <span>📅 {new Date(report.date).toLocaleDateString()}</span>
            <span>⏰ Uploaded: {new Date(report.uploaded_at).toLocaleDateString()}</span>
          </div>

          {report.vitals_summary && (
            <div className="vitals-summary">
              <strong>Vitals:</strong> {report.vitals_summary}
            </div>
          )}
        </div>

        <div className="report-card-footer">
          <Link to={`/reports/${report.id}`} className="btn-secondary">
            View Details
          </Link>
        </div>
      </div>

      {showShareModal && (
        <ShareReport 
          reportId={report.id}
          reportName={report.original_name}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </>
  );
};

export default ReportCard;