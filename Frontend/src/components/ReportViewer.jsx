import React, { useState } from 'react';

// Receive analyzedUrl as a prop
const ReportViewer = ({ report, analyzedUrl }) => {
  const [loading, setLoading] = useState(false);

  if (!report || report.length === 0) {
    return <p className="text-center text-slate-300 mt-4">No accessibility issues found. 🎉</p>;
  }

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/analyze-url/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ violations: report, url: analyzedUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Get the response as a blob
      const blob = await response.blob();

      // Create a temporary link to trigger the download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `accessibility-report-${new URL(analyzedUrl).hostname}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Clean up the temporary link
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error downloading PDF. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white">Accessibility Report</h2>
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white rounded-xl transition-all font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-600"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin"></span>
              Generating...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download PDF
            </>
          )}
        </button>
      </div>
      <div className="space-y-4">
        {report.map((violation, index) => (
          <ReportCard key={index} violation={violation} index={index} />
        ))}
      </div>
    </div>
  );
};

// ... (ReportCard component) ...
const ReportCard = ({ violation, index }) => {
  const [expanded, setExpanded] = useState(false);

  // Helper for impact color
  const getImpactColor = (impact) => {
    switch (impact) {
      case 'critical': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'serious': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'moderate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'minor': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className={`glass-card overflow-hidden transition-all duration-300 ${expanded ? 'ring-1 ring-indigo-500/50' : 'hover:bg-slate-800/60'}`}>
      <div
        className="flex items-start justify-between p-5 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex gap-4">
          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-700/50 text-slate-300 font-mono text-sm border border-slate-600">
            {index + 1}
          </span>
          <div>
            <h3 className="text-lg font-semibold text-slate-200 leading-tight">{violation.help}</h3>
            <p className="text-sm text-slate-500 mt-1 font-mono">{violation.id}</p>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getImpactColor(violation.impact)}`}>
          {violation.impact || 'Unknown'}
        </span>
      </div>

      {expanded && (
        <div className="border-t border-slate-700/50 bg-slate-900/30 p-6 space-y-6 animate-in slide-in-from-top-2">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</p>
              <p className="text-slate-300">{violation.description}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Failure Summary</p>
              <p className="text-slate-300 text-sm">{violation.nodes?.[0]?.failureSummary || "N/A"}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Element Source</p>
            <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800 overflow-x-auto">
              <code className="text-sm font-mono text-emerald-400">{violation.nodes?.[0]?.html || "N/A"}</code>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-xl p-5 border border-indigo-500/20">
            <h4 className="flex items-center gap-2 text-indigo-300 font-bold mb-3">
              <span className="text-xl">🧠</span> GEMINI Suggestion
            </h4>
            <div className="text-slate-300 space-y-2 leading-relaxed">
              {violation.gptExplanation
                ? violation.gptExplanation.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))
                : <p className="italic text-slate-500">No AI suggestion available for this issue.</p>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportViewer;
