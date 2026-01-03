// src/components/Vitals/VitalsTrends.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { vitalsAPI } from '../../services/api';
import { vitalsAPI } from '../../services/api';
import Navbar from '../Common/Navbar';
import Loading from '../Common/Loading';

const VitalsTrends = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [trendData, setTrendData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start_date: '',
    end_date: ''
  });

  const fetchTrends = useCallback(async () => {
    try {
      setLoading(true);
      const response = await vitalsAPI.getTrends(type, dateRange);
      setTrendData(response.data);
    } catch (err) {
      console.error('Failed to fetch trends:', err);
    } finally {
      setLoading(false);
    }
  }, [type, dateRange]);

  useEffect(() => {
    fetchTrends();
  }, [fetchTrends]);

  const handleDateChange = (field, value) => {
    setDateRange({ ...dateRange, [field]: value });
  };

  if (loading) return <Loading />;
  if (!trendData) return <div>No data available</div>;

  const chartData = trendData.trend.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: item.value,
    fullDate: item.date
  }));

  return (
    <div className="page-container">
      <Navbar />
      
      <div className="page-content">
        <div className="trends-header">
          <button className="btn-back" onClick={() => navigate('/vitals')}>
            ← Back to Vitals
          </button>
          <h1>{type} Trends</h1>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h4>Latest</h4>
            <p className="stat-value">{trendData.latest}</p>
          </div>
          <div className="stat-card">
            <h4>Average</h4>
            <p className="stat-value">{trendData.avg?.toFixed(2)}</p>
          </div>
          <div className="stat-card">
            <h4>Minimum</h4>
            <p className="stat-value">{trendData.min}</p>
          </div>
          <div className="stat-card">
            <h4>Maximum</h4>
            <p className="stat-value">{trendData.max}</p>
          </div>
          <div className="stat-card">
            <h4>Total Readings</h4>
            <p className="stat-value">{trendData.count}</p>
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="filters-container">
          <div className="filters-grid">
            <div className="filter-group">
              <label>Start Date</label>
              <input
                type="date"
                value={dateRange.start_date}
                onChange={(e) => handleDateChange('start_date', e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label>End Date</label>
              <input
                type="date"
                value={dateRange.end_date}
                onChange={(e) => handleDateChange('end_date', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="chart-container">
          <h3>Trend Over Time</h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2196F3" 
                  strokeWidth={2}
                  dot={{ fill: '#2196F3', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data">No data available for the selected date range</p>
          )}
        </div>

        {/* Data Table */}
        <div className="vitals-table-container">
          <h3>Reading History</h3>
          <table className="vitals-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Value</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {trendData.trend.map((item) => (
                <tr key={item.id}>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{item.value}</td>
                  <td>{item.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VitalsTrends;