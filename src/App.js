import React, { useState } from 'react';

const DecisionTree = () => {
  // ... (keep your existing state and steps logic)

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="mb-4 bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{step.question || step.result}</h2>
          {step.info && <p className="text-gray-600 mb-4">{step.info}</p>}
        </div>

        {/* Keep your existing options rendering logic */}
      </div>

      {/* Keep your navigation buttons */}
    </div>
  );
};

export default DecisionTree;
