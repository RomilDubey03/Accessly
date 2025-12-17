import React, { useState } from 'react';
import URLInput from '../components/URLInput';
import ReportViewer from '../components/ReportViewer';
import InfoBox from '../components/InfoBox';

export default function Home() {
  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analyzedUrl, setAnalyzedUrl] = useState('');

  const handleURLSubmit = async (url) => {
    setLoading(true);
    setAnalyzedUrl(url);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/analyze-url`, {
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
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-12 py-12 relative z-10">

      {/* Hero Section */}
      <header className="text-center space-y-6">
        <h1 className="text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 drop-shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Accessly
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Ensure your web presence is inclusive. <br />
          <span className="text-indigo-400 font-medium">AI-powered accessibility auditing</span> for everyone.
        </p>
      </header>

      {/* Main Input Section */}
      <section className="w-full max-w-2xl animate-in zoom-in-95 duration-700 delay-150">
        <URLInput onSubmit={handleURLSubmit} />
      </section>

      {/* Info / Results Section */}
      <section className="w-full max-w-4xl space-y-8">

        {!loading && !analyzedUrl && (
          <div className="animate-in fade-in delay-300 duration-700">
            <InfoBox />
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4 glass rounded-3xl">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-indigo-300 font-medium animate-pulse text-lg">Analyzing website structure...</p>
          </div>
        )}

        {!loading && violations.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <ReportViewer report={violations} analyzedUrl={analyzedUrl} />
          </div>
        )}

        {!loading && violations.length === 0 && analyzedUrl && (
          <div className="glass p-8 rounded-2xl text-center animate-in zoom-in-95">
            <p className="text-3xl mb-2">🎉</p>
            <p className="text-xl font-medium text-emerald-400">No accessibility issues found.</p>
            <p className="text-slate-400 mt-2">Your site is looking great!</p>
          </div>
        )}
      </section>
    </div>
  );
}