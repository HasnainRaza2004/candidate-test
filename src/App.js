import React from 'react';
import './App.css';
import BarChartComponent from './components/BarChartComponent';

function App() {
  return (
    <div className="App">
      <h1>Bar Chart</h1>
      <BarChartComponent endpoint="https://django-dev.aakscience.com/candidate_test/fronted" />
    </div>
  );
}

export default App;
