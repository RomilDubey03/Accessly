import React, { useState } from 'react';
import { FiInfo, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const InfoBox = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="w-full">
      <div className={`glass-card overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'bg-slate-800/80' : 'bg-slate-800/40 hover:bg-slate-800/60'}`}>
        <div
          className="flex items-center justify-between p-6 cursor-pointer select-none group"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/20 transition-colors`}>
              <FiInfo className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-slate-200 group-hover:text-white transition-colors">About This Tool</h2>
          </div>
          <div className="text-slate-500 group-hover:text-indigo-400 transition-colors">
            {expanded ? <FiChevronUp className="w-6 h-6" /> : <FiChevronDown className="w-6 h-6" />}
          </div>
        </div>

        <div className={`transition-all duration-500 ease-in-out px-6 overflow-hidden ${expanded ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}>
          <p className="text-slate-400 leading-relaxed border-t border-slate-700/50 pt-4">
            This tool analyzes any webpage’s accessibility using <span className="font-semibold text-indigo-400">Axe-core</span> and provides detailed
            suggestions powered by <span className="font-semibold text-purple-400">AI</span>. It helps developers identify and fix accessibility
            issues to make websites inclusive for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
