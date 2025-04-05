import React, { useState } from 'react';

const DecisionTree = () => {
  const [currentStep, setCurrentStep] = useState('start');
  const [history, setHistory] = useState([]);

  // SVG Icons (Embedded directly)
  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  );

  const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  );

  const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );

  const steps = {
    // ... (Keep EXACTLY the same step configuration from your original code)
    // Paste your entire 'steps' object here unchanged
  };

  const handleOption = (option) => {
    setHistory([...history, currentStep]);
    setCurrentStep(option.next);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const newHistory = [...history];
      const lastStep = newHistory.pop();
      setHistory(newHistory);
      setCurrentStep(lastStep);
    }
  };

  const handleReset = () => {
    setCurrentStep('start');
    setHistory([]);
  };

  const step = steps[currentStep];

  return (
    <div className="decision-tree-app">
      <div className="decision-card">
        <div className="card-header">
          <h2>{step.question || step.result}</h2>
          {step.info && <p className="info-text">{step.info}</p>}
        </div>

        {step.options ? (
          <div className="options-container">
            {step.options.map((option, index) => (
              <button 
                key={index}
                onClick={() => handleOption(option)}
                className="option-button"
              >
                <span className="option-text">
                  {option.text}
                  {option.detail && <span className="option-detail">{option.detail}</span>}
                </span>
                <ArrowIcon />
              </button>
            ))}
          </div>
        ) : (
          <div className="result-container">
            <div className="result-header">
              {step.result.includes('✓') ? (
                <CheckIcon className="success-icon" />
              ) : (
                <XIcon className="error-icon" />
              )}
              <p className="result-text">{step.detail}</p>
            </div>
            <div className="tips-list">
              {step.tips?.map((tip, index) => (
                <div key={index} className="tip-item">
                  <span className="tip-icon">💰</span>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="navigation-buttons">
        {history.length > 0 && (
          <button onClick={handleBack} className="nav-button back-button">
            ← Back
          </button>
        )}
        <button onClick={handleReset} className="nav-button reset-button">
          ↻ Start Over
        </button>
      </div>
    </div>
  );
};

export default DecisionTree;
