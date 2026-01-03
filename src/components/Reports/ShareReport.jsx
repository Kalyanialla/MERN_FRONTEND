// src/components/Reports/ShareReport.jsx
import React, { useState, useEffect } from 'react';
import { reportsAPI } from '../../services/api';

const ShareReport = ({ reportId, reportName, onClose }) => {
  const [email, setEmail] = useState('');
  const [sharedUsers, setSharedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSharedUsers();
  }, [reportId]);

  const fetchSharedUsers = async () => {
    try {
      const response = await reportsAPI.getSharedWith(reportId);
      setSharedUsers(response.data);
    } catch (err) {
      console.error('Failed to fetch shared users:', err);
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await reportsAPI.share(reportId, {
        shared_with_email: email,
        access_type: 'read'
      });
      setSuccess('Report shared successfully!');
      setEmail('');
      fetchSharedUsers();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to share report');
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (userId) => {
    if (window.confirm('Are you sure you want to revoke access?')) {
      try {
        await reportsAPI.revokeAccess(reportId, userId);
        setSuccess('Access revoked successfully');
        fetchSharedUsers();
      } catch (err) {
        setError('Failed to revoke access');
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Share Report</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <p className="report-name-display">
            <strong>Report:</strong> {reportName}
          </p>

          <form onSubmit={handleShare} className="share-form">
            <div className="form-group">
              <label>Share with Email</label>
              <div className="input-button-group">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Sharing...' : 'Share'}
                </button>
              </div>
            </div>
          </form>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="shared-users-section">
            <h3>Shared With ({sharedUsers.length})</h3>
            {sharedUsers.length > 0 ? (
              <div className="shared-users-list">
                {sharedUsers.map((user) => (
                  <div key={user.id} className="shared-user-item">
                    <div className="user-info">
                      <strong>{user.username}</strong>
                      <span className="user-email">{user.email}</span>
                      <span className="share-date">
                        Shared: {new Date(user.shared_at).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      className="btn-danger small"
                      onClick={() => handleRevoke(user.id)}
                    >
                      Revoke
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">Not shared with anyone yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareReport;