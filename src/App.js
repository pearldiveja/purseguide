import React, { useState } from 'react';

const DecisionTree = () => {
  const [currentStep, setCurrentStep] = useState('start');
  const [history, setHistory] = useState([]);

  // SVG Icons
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
    start: {
      question: "What type of purse are you authenticating?",
      options: [
        { text: "Coach", next: "coach" },
        { text: "Michael Kors", next: "mk" },
        { text: "Dooney & Bourke", next: "db" }
      ]
    },
    coach: {
      question: "Does it have a vintage tag?",
      options: [
        { text: "Yes", next: "vintageCoach" },
        { text: "No", next: "modernCoach" }
      ]
    },
    vintageCoach: {
      question: "Check the creed patch:",
      info: "Authentic vintage Coach bags have:\n- Serial numbers starting with NO\n- Made in New York City stamp\n- Glove-tanned leather",
      options: [
        { text: "Matches these characteristics", next: "coachAuthentic" },
        { text: "Doesn't match", next: "coachFake" }
      ]
    },
    modernCoach: {
      question: "Check the creed number format:",
      info: "Modern Coach bags should have:\n- 4-letter factory code\n- 4-digit date code\n- Style number in format XXXXX-XXXX",
      options: [
        { text: "Matches format", next: "coachAuthentic" },
        { text: "Invalid format", next: "coachFake" }
      ]
    },
    coachAuthentic: {
      result: "✓ Likely Authentic Coach",
      detail: "This bag shows consistent authentic characteristics. Final verification steps:",
      tips: [
        "Check stitching consistency (7-9 stitches per inch)",
        "Verify hardware engraving matches official patterns",
        "Authenticate dust bag and authenticity cards if included"
      ]
    },
    coachFake: {
      result: "✕ Likely Fake Coach",
      detail: "Red flags detected. Common replica signs:",
      tips: [
        "Misspelled 'Coach' branding",
        "Plastic wrapping on hardware",
        "Incorrect font on creed patch"
      ]
    },
    mk: {
      question: "Check the interior lining:",
      info: "Authentic Michael Kors bags have:",
      options: [
        { text: "Signature 'Michael Kors' printed lining", next: "mkLiningGood" },
        { text: "Plain or mismatched lining", next: "mkFake" }
      ]
    },
    mkLiningGood: {
      result: "✓ Likely Authentic Michael Kors",
      detail: "Continue verification with:",
      tips: [
        "Check zipper pull engravings",
        "Verify heat stamp matches collection",
        "Authenticate authenticity card hologram"
      ]
    },
    mkFake: {
      result: "✕ Likely Fake Michael Kors",
      detail: "Warning signs include:",
      tips: [
        "Peeling logo hardware",
        "Incorrect interior label font",
        "Missing serial number tag"
      ]
    },
    db: {
      question: "Check the duck logo hardware:",
      info: "Authentic Dooney & Bourke features:",
      options: [
        { text: "Sharp, detailed engraving", next: "dbHardwareGood" },
        { text: "Blurry or shallow engraving", next: "dbFake" }
      ]
    },
    dbHardwareGood: {
      result: "✓ Likely Authentic Dooney & Bourke",
      detail: "Final checks:",
      tips: [
        "Verify lining pattern matches collection",
        "Check stitching around handles",
        "Authenticate date code format"
      ]
    },
    dbFake: {
      result: "✕ Likely Fake Dooney & Bourke",
      detail: "Common replica indicators:",
      tips: [
        "Incorrect logo placement",
        "Plastic instead of brass hardware",
        "Missing registered trademark symbol ®"
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
