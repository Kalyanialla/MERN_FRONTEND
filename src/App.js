// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import Dashboard from './components/Dashboard';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/" element={<Dashboard />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import ReportsList from './components/Reports/ReportsList';
import ReportDetails from './components/Reports/ReportDetails';
import VitalsList from './components/Vitals/VitalsList';
import VitalsTrends from './components/Vitals/VitalsTrends';
import SharedWithMe from './components/Shared/SharedWithMe';
// import MySharedReports from './components/Shared/MySharedReports'
// ;
import MySharedReports from './components/Shared/MyShareReports';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import './styles/App.css';
import './styles/Auth.css';
import './styles/Components.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute>
              <ReportsList />
            </ProtectedRoute>
          } />
          
          <Route path="/reports/:id" element={
            <ProtectedRoute>
              <ReportDetails />
            </ProtectedRoute>
          } />
          
          <Route path="/vitals" element={
            <ProtectedRoute>
              <VitalsList />
            </ProtectedRoute>
          } />
          
          <Route path="/vitals/trends/:type" element={
            <ProtectedRoute>
              <VitalsTrends />
            </ProtectedRoute>
          } />
          
          <Route path="/shared-with-me" element={
            <ProtectedRoute>
              <SharedWithMe />
            </ProtectedRoute>
          } />
          
          <Route path="/my-shared-reports" element={
            <ProtectedRoute>
              <MySharedReports />
            </ProtectedRoute>
          } />
          
          {/* Redirect to dashboard if route not found */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
