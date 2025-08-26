import React, { useState } from 'react';
import { FiInfo, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import '../style/InfoBox.css';

const InfoBox = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="infoo">
         <div className={`info-box ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="info-header" onClick={() => setExpanded(!expanded)}>
        <FiInfo className="info-icon" />
        <h2>About This Tool</h2>
        {expanded ? <FiChevronUp className="toggle-icon" /> : <FiChevronDown className="toggle-icon" />}
      </div>
      {expanded && (
        <div className="info-content">
          <p>
            This tool analyzes any webpage’s accessibility using Axe-core and provides detailed
            suggestions powered by AI. It helps developers identify and fix accessibility
            issues to make websites inclusive for everyone.
          </p>
        </div>
      )}
    </div>
    </div>
   
  );
};

export default InfoBox;
