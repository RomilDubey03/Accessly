import React, { useState } from 'react';
import '../style/ReportViewer.css';

const ReportViewer = ({ report }) => {
  if (!report || report.length === 0) {
    return <p>No accessibility issues found. 🎉</p>;
  }

  return (
    <div className="report-container">
      <h2>Accessibility Report</h2>
      {report.map((violation, index) => (
        <ReportCard key={index} violation={violation} index={index} />
      ))}
    </div>
  );
};

const ReportCard = ({ violation, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="report-card">
      <div className="card-header" onClick={() => setExpanded(!expanded)}>
        <h3>{index + 1}. {violation.help}</h3>
        <span className={`impact ${violation.impact}`}>{violation.impact}</span>
      </div>
      {expanded && (
        <div className="card-body">
          <p><strong>ID:</strong> {violation.id}</p>
          <p><strong>Description:</strong> {violation.description}</p>
          <p><strong>HTML:</strong> <code>{violation.nodes?.[0]?.html || "N/A"}</code></p>
          <p><strong>Failure Summary:</strong> {violation.nodes?.[0]?.failureSummary || "N/A"}</p>

          <div className="gpt-box">
            <h4>🧠 GEMINI-Suggestion:</h4>
            {violation.gptExplanation
    ? violation.gptExplanation.split('\n').map((para, i) => (
        <p key={i} style={{ marginBottom: '1em' }}>{para}</p>
      ))
    : <p>No suggestion available.</p>
  }
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportViewer;
