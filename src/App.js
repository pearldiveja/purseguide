import React, { useState } from 'react';

const DecisionTree = () => {
  const [currentStep, setCurrentStep] = useState('start');
  const [history, setHistory] = useState([]);

  const steps = {
    start: {
      question: "Which brand are you evaluating?",
      options: [
        { text: "Coach", next: "coachAge" },
        { text: "Michael Kors", next: "mkLine" },
        { text: "Dooney & Bourke", next: "dooneyAge" }
      ]
    },
    coachAge: {
      question: "Is it vintage Coach (pre-2000)?",
      options: [
        { text: "Yes", next: "coachVintageCheck" },
        { text: "No", next: "reject" }
      ],
      info: "Look for 'Made in United States' tag and creed patch with serial number"
    },
    coachVintageCheck: {
      question: "Which model number is on the creed patch?",
      options: [
        { text: "Willis (#9927)", next: "coachHighValue", detail: "Market value $150-300" },
        { text: "Station (#5130)", next: "coachHighValue", detail: "Market value $120-250" },
        { text: "Court (#9870)", next: "coachHighValue", detail: "Market value $150-280" },
        { text: "Cashin Carry (#9800)", next: "coachHighValue", detail: "Market value $200-400" },
        { text: "Basic (#9455)", next: "coachMedValue", detail: "Market value $80-150" },
        { text: "Other/Can't find", next: "coachMaterialCheck" }
      ],
      info: "High-value vintage Coach bags typically start with '98' or '51'"
    },
    coachMaterialCheck: {
      question: "Check the material quality:",
      options: [
        { text: "Thick glove-tanned leather + brass hardware", next: "coachMedValue" },
        { text: "Lightweight or non-leather", next: "reject" }
      ]
    },
    mkLine: {
      question: "Which Michael Kors line is it?",
      options: [
        { text: "Michael Kors Collection", next: "mkCollectionCheck" },
        { text: "MICHAEL Michael Kors", next: "reject" }
      ],
      info: "Look for 'Collection' label and 'Made in Italy' tag"
    },
    mkCollectionCheck: {
      question: "Does it meet Collection criteria?",
      options: [
        { text: "Made in Italy + Premium leather", next: "mkHighValue" },
        { text: "Missing either feature", next: "reject" }
      ],
      info: "'Collection' bags should have minimal branding and high-end construction"
    },
    dooneyAge: {
      question: "Is it vintage Dooney & Bourke?",
      options: [
        { text: "Yes (All-Weather Leather era)", next: "dooneyVintageCheck" },
        { text: "No", next: "reject" }
      ],
      info: "Look for 'Made in USA' tag and All-Weather Leather tag"
    },
    dooneyVintageCheck: {
      question: "Which collection is it from?",
      options: [
        { text: "All-Weather Leather", next: "dooneyHighValue", detail: "Market value $150-400" },
        { text: "Cavalry", next: "dooneyHighValue", detail: "Market value $200-450" },
        { text: "Essex", next: "dooneyHighValue", detail: "Market value $180-350" },
        { text: "Equestrian", next: "dooneyMedValue", detail: "Market value $100-250" },
        { text: "Other vintage collection", next: "dooneyMaterialCheck" }
      ]
    },
    dooneyMaterialCheck: {
      question: "Check quality indicators:",
      options: [
        { text: "Heavy leather + brass + duck emblem", next: "dooneyMedValue" },
        { text: "Missing any of these", next: "reject" }
      ]
    },
    coachHighValue: {
      result: "HIGH VALUE COACH ✓",
      detail: "Premium vintage Coach piece - worth authenticating and listing",
      tips: [
        "Expect strong resale value",
        "Document serial number clearly",
        "Photograph brass hardware details",
        "Show creasing pattern in leather",
        "Include measurements and weight"
      ]
    },
    coachMedValue: {
      result: "MEDIUM VALUE COACH ✓",
      detail: "Good vintage piece - worth listing if condition is excellent",
      tips: [
        "Focus on leather quality in listing",
        "Compare to similar sold listings",
        "Consider condition carefully",
        "Document any wear thoroughly"
      ]
    },
    mkHighValue: {
      result: "HIGH VALUE MICHAEL KORS ✓",
      detail: "Premium Collection piece - worth authenticating and listing",
      tips: [
        "Emphasize 'Collection' line status",
        "Document Italian craftsmanship",
        "Show all interior labels clearly",
        "Include original dust bag if available"
      ]
    },
    dooneyHighValue: {
      result: "HIGH VALUE DOONEY & BOURKE ✓",
      detail: "Premium vintage piece - worth authenticating and listing",
      tips: [
        "Document serial number and duck emblem",
        "Show All-Weather Leather tag",
        "Photograph brass hardware details",
        "Include measurements of base"
      ]
    },
    dooneyMedValue: {
      result: "MEDIUM VALUE DOONEY & BOURKE ✓",
      detail: "Good vintage piece - worth listing if condition is excellent",
      tips: [
        "Focus on leather quality",
        "Document all authenticity features",
        "Show wear patterns clearly",
        "Price competitively"
      ]
    },
    reject: {
      result: "NOT RECOMMENDED ❌",
      detail: "Skip this item - unlikely to be worth authentication/listing costs",
      tips: [
        "Save authentication fees",
        "Focus on higher value pieces",
        "Consider selling in bulk lots",
        "Or donate to local charity"
      ]
    }
  };

  const handleOption = (nextStep) => {
    setHistory([...history, currentStep]);
    setCurrentStep(nextStep);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prevStep = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentStep(prevStep);
    }
  };

  const handleReset = () => {
    setCurrentStep('start');
    setHistory([]);
  };

  const currentStepData = steps[currentStep];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ 
        background: 'white', 
        borderRadius: '8px', 
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          {currentStepData.question || currentStepData.result}
        </h2>
        
        {currentStepData.info && (
          <p style={{ color: '#666', marginBottom: '1rem' }}>{currentStepData.info}</p>
        )}
        
        {currentStepData.detail && (
          <p style={{ marginBottom: '1rem' }}>{currentStepData.detail}</p>
        )}
        
        {currentStepData.tips && (
          <ul style={{ margin: '15px 0', paddingLeft: '1.5rem' }}>
            {currentStepData.tips.map((tip, index) => (
              <li key={index} style={{ margin: '5px 0', listStyleType: 'disc' }}>{tip}</li>
            ))}
          </ul>
        )}

        {currentStepData.options ? (
          <div style={{ marginTop: '15px' }}>
            {currentStepData.options.map((option, index) => (
              <button 
                key={index}
                onClick={() => handleOption(option.next)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px',
                  margin: '5px 0',
                  background: '#f0f0f0',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{option.text}</span>
                  {option.detail && (
                    <span style={{ color: '#666', fontSize: '0.9rem' }}>{option.detail}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        {history.length > 0 && (
          <button 
            onClick={handleBack}
            style={{ 
              padding: '8px 15px',
              background: '#e0e0e0',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ← Back
          </button>
        )}
        <button 
          onClick={handleReset}
          style={{ 
            padding: '8px 15px',
            background: '#e0e0e0',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default DecisionTree;
