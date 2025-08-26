import React, { useState } from 'react';
import URLInput from '../components/URLInput';
import ReportViewer from '../components/ReportViewer';
import '../style/URLInput.css';
import InfoBox from '../components/InfoBox';
import '../style/Home.css'
export default function Home() {
  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleURLSubmit = async (url) => {
    setLoading(true);
    try {
      // https://akv-dev339-accessly-backend-1.onrender.com/analyze-url
      const response = await fetch('http://localhost:5000/analyze-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setViolations(data.violations || []);
    } catch (error) {
      console.error('Error fetching violations:', error);
    }
    setLoading(false);
  };
  return (
    <div className='main_container'>
      <InfoBox/>
    <URLInput onSubmit={handleURLSubmit} />
    
    {loading && (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Analyzing accessibility...</p>
      </div>
    )}

   

    {!loading && violations.length > 0 && (
      <ReportViewer report={violations} />
    )}

    {!loading && violations.length === 0 && (
      <p style={{ textAlign: 'center' }}>No accessibility issues found. 🎉</p>
    )}
  </div>
  );
}
