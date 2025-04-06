import React, { useState } from 'react';

const DecisionTree = () => {
  const [currentStep, setCurrentStep] = useState('start');
  const [history, setHistory] = useState([]);

  const steps = {
    start: {
      question: "What type of purse are you authenticating?",
      options: [
        { text: "Coach", next: "coach" },
        { text: "Michael Kors", next: "mk" },
        { text: "Dooney & Bourke", next: "db" }
      ]
    },
    coach: {
      result: "✓ Authentic Coach",
      detail: "Genuine Coach bags have:",
      tips: [
        "Crisp, deep stamping in leather",
        "Symmetrical stitching pattern",
        "YKK zipper pulls"
      ]
    },
    mk: {
      result: "✓ Authentic Michael Kors",
      detail: "Genuine Michael Kors bags have:",
      tips: [
        "High-quality leather with even grain",
        "MK logo hardware with clean edges",
        "Serial number inside"
      ]
    },
    db: {
      result: "✓ Authentic Dooney & Bourke",
      detail: "Genuine Dooney & Bourke bags have:",
      tips: [
        "Embossed logo on leather tag",
        "Red, white, and blue registration card",
        "Sturdy stitching and hardware"
      ]
    }
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
        <h2>{step.question || step.result}</h2>
        {step.detail && <p>{step.detail}</p>}
        {step.tips && (
          <ul>
            {step.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        )}
        {step.options && (
          <div>
            {step.options.map((option, index) => (
              <button key={index} onClick={() => handleOption(option)}>
                {option.text}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="navigation-buttons">
        {history.length > 0 && (
          <button onClick={handleBack}>← Back</button>
        )}
        <button onClick={handleReset}>↻ Start Over</button>
      </div>
    </div>
  );
};

export default DecisionTree;
