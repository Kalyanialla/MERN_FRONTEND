// src/components/Dashboard/DashboardStats.jsx
import React from 'react';

const DashboardStats = ({ summary }) => {
  const stats = [
    {
      label: 'Total Reports',
      value: summary?.totalReports || 0,
      icon: '📄',
      color: '#4CAF50',
    },
    {
      label: 'Total Vitals',
      value: summary?.totalVitals || 0,
      icon: '❤️',
      color: '#2196F3',
    },
    {
      label: 'Vital Types',
      value: summary?.vitalTypes || 0,
      icon: '📊',
      color: '#FF9800',
    },
    {
      label: 'Shared By Me',
      value: summary?.sharedByMe || 0,
      icon: '↗️',
      color: '#9C27B0',
    },
    {
      label: 'Shared With Me',
      value: summary?.sharedWithMe || 0,
      icon: '↙️',
      color: '#00BCD4',
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-info">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;