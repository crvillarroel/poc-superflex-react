import React from 'react';
import EmployeeManagement from './components/EmployeeManagement';
import './App.css';
import AbsenceSummary from './components/AbsenceSummary';

function App() {
  return (
    <div className="App">
      <EmployeeManagement />
      <AbsenceSummary />
    </div>
  );
}

export default App;
