// Modified for direct Shopify embedding
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const DecisionTree = () => {
  // ... keep all your existing state and step logic ...

  return (
    <div className="shopify-decision-tree p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        {/* Keep existing JSX structure but replace Card with divs */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">{step.question || step.result}</h2>
          {step.info && <p className="text-sm text-gray-600 mb-4">{step.info}</p>}
        </div>

        {/* Replace button styling with simple CSS classes */}
        {step.options?.map((option, index) => (
          <button 
            key={index}
            onClick={() => handleOption(option)}
            className="w-full p-2 mb-2 text-left border rounded hover:bg-gray-100"
          >
            {option.text}
          </button>
        ))}

        {/* Results display */}
        {!step.options && (
          <div className="mt-4">
            <div className={`flex items-center ${step.result.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-2">{step.result.includes('✓') ? '✓' : '✕'}</span>
              <p className="font-semibold">{step.detail}</p>
            </div>
            <ul className="mt-4 pl-4">
              {step.tips?.map((tip, index) => (
                <li key={index} className="list-disc mb-2">💰 {tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Navigation controls */}
      <div className="flex gap-4 text-sm">
        {history.length > 0 && (
          <button onClick={handleBack} className="text-blue-600 hover:underline">
            ← Back
          </button>
        )}
        <button onClick={handleReset} className="text-blue-600 hover:underline">
          ↻ Start Over
        </button>
      </div>
    </div>
  );
};

// Shopify mount point
const root = createRoot(document.getElementById('decision-tree-root'));
root.render(<DecisionTree />);
