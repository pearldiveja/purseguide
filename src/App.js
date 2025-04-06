import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const DecisionTree = () => {
  const [currentStep, setCurrentStep] = useState('start');
  const [history, setHistory] = useState([]);

  const steps = {
    start: {
      question: "Which luxury handbag are you evaluating?",
      options: [
        { 
          text: "Coach Vintage", 
          next: "coachAge",
          detail: "Pre-2000 models"
        },
        { 
          text: "Michael Kors Collection", 
          next: "mkLine",
          detail: "Premium line only"
        },
        { 
          text: "Dooney & Bourke Vintage", 
          next: "dooneyAge",
          detail: "All-Weather Leather era"
        }
      ]
    },
    coachAge: {
      question: "Manufacturing Date Check",
      info: "Look for 'Made in USA' stamp and creed patch",
      options: [
        { 
          text: "Pre-2000 (Vintage)", 
          next: "coachVintageCheck",
          detail: "Higher resale value"
        },
        { 
          text: "Post-2000", 
          next: "reject",
          detail: "Lower authentication ROI"
        }
      ]
    },
    coachVintageCheck: {
      question: "Model Identification",
      info: "Check creed patch serial number",
      options: [
        { 
          text: "Willis (#9927)", 
          next: "coachHighValue",
          detail: "Market value $150-300"
        },
        { 
          text: "Station (#5130)", 
          next: "coachHighValue",
          detail: "Market value $120-250"
        },
        { 
          text: "Court (#9870)", 
          next: "coachHighValue",
          detail: "Market value $150-280"
        },
        { 
          text: "Unclear/Other", 
          next: "coachMaterialCheck",
          detail: "Proceed to material check"
        }
      ]
    },
    coachMaterialCheck: {
      question: "Material Quality Assessment",
      info: "Inspect leather and hardware",
      options: [
        { 
          text: "Full-grain leather + Solid brass", 
          next: "coachMedValue",
          detail: "Medium authentication value"
        },
        { 
          text: "Any synthetic materials", 
          next: "reject",
          detail: "Not worth authenticating"
        }
      ]
    },
    coachHighValue: {
      result: "✅ Worth Authenticating",
      detail: "High-value vintage Coach detected",
      tips: [
        "Document creed patch details",
        "Photograph brass hardware",
        "Show leather patina",
        "Include measurements"
      ]
    },
    coachMedValue: {
      result: "⚠️ Conditional Value",
      detail: "Mid-range Coach - authenticate if excellent condition",
      tips: [
        "Check stitching integrity",
        "Verify hardware functionality",
        "Assess interior cleanliness",
        "Compare to recent sales"
      ]
    },
    mkLine: {
      question: "Product Line Verification",
      info: "Check interior label",
      options: [
        { 
          text: "Michael Kors Collection", 
          next: "mkCollectionCheck",
          detail: "Premium line"
        },
        { 
          text: "MICHAEL Michael Kors", 
          next: "reject",
          detail: "Lower value line"
        }
      ]
    },
    mkCollectionCheck: {
      question: "Quality Indicators",
      info: "Check materials and craftsmanship",
      options: [
        { 
          text: "Full-grain leather + Made in Italy", 
          next: "mkHighValue",
          detail: "Premium materials"
        },
        { 
          text: "Any discrepancies", 
          next: "reject",
          detail: "Potential counterfeit"
        }
      ]
    },
    mkHighValue: {
      result: "✅ Premium Collection Piece",
      detail: "Worth professional authentication",
      tips: [
        "Document Italian manufacturing tag",
        "Photograph minimal branding",
        "Show leather grain details",
        "Include dust bag if available"
      ]
    },
    dooneyAge: {
      question: "Vintage Verification",
      info: "Check for All-Weather Leather tag",
      options: [
        { 
          text: "Pre-1990 Vintage", 
          next: "dooneyVintageCheck",
          detail: "High collector interest"
        },
        { 
          text: "Post-1990", 
          next: "reject",
          detail: "Lower authentication priority"
        }
      ]
    },
    dooneyVintageCheck: {
      question: "Collection Identification",
      info: "Look for duck emblem and serial",
      options: [
        { 
          text: "All-Weather Leather", 
          next: "dooneyHighValue",
          detail: "Market value $150-400"
        },
        { 
          text: "Cavalry Collection", 
          next: "dooneyHighValue",
          detail: "Market value $200-450"
        },
        { 
          text: "Other/Unclear", 
          next: "dooneyMaterialCheck",
          detail: "Proceed to material check"
        }
      ]
    },
    dooneyMaterialCheck: {
      question: "Construction Quality",
      info: "Inspect materials and hardware",
      options: [
        { 
          text: "Heavy leather + Brass hardware", 
          next: "dooneyMedValue",
          detail: "Condition-dependent value"
        },
        { 
          text: "Lightweight materials", 
          next: "reject",
          detail: "Not worth authentication"
        }
      ]
    },
    dooneyHighValue: {
      result: "✅ Vintage Collector Piece",
      detail: "Worth authenticating and listing",
      tips: [
        "Document duck emblem details",
        "Photograph serial number",
        "Show brass hardware condition",
        "Include measurements"
      ]
    },
    dooneyMedValue: {
      result: "⚠️ Conditional Value",
      detail: "Authenticate if excellent condition",
      tips: [
        "Check stitching integrity",
        "Verify zipper functionality",
        "Assess interior lining",
        "Compare to recent sales"
      ]
    },
    reject: {
      result: "❌ Not Recommended",
      detail: "Low authentication ROI",
      tips: [
        "Estimated authentication cost: $25-50",
        "Potential resale value: <$100",
        "Recommendation: Sell as-is or donate"
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
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader className="border-b p-6">
          <div className="flex items-center gap-3">
            {step.result ? (
              step.result.includes('✅') ? (
                <Check className="w-8 h-8 text-green-600" />
              ) : step.result.includes('❌') ? (
                <X className="w-8 h-8 text-red-600" />
              ) : (
                <Info className="w-8 h-8 text-blue-600" />
              )
            ) : (
              <Info className="w-8 h-8 text-blue-600" />
            )}
            <h2 className="text-2xl font-semibold">
              {step.question || step.result}
            </h2>
          </div>
          {step.info && (
            <p className="mt-2 text-gray-600 text-sm">{step.info}</p>
          )}
        </CardHeader>

        <CardContent className="p-6">
          {step.options ? (
            <div className="space-y-3">
              {step.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOption(option)}
                  className="w-full p-4 text-left rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-between group"
                >
                  <div className="flex-1">
                    <p className="font-medium">{option.text}</p>
                    {option.detail && (
                      <p className="text-sm text-gray-500 mt-1">{option.detail}</p>
                    )}
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-lg font-medium text-gray-800">
                  {step.detail}
                </p>
              </div>
              <div className="space-y-4">
                {step.tips?.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 flex gap-4 justify-end max-w-3xl mx-auto">
        {history.length > 0 && (
          <button
            onClick={handleBack}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2 bg-white shadow-sm rounded-lg border border-gray-200"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <RefreshCw className="w-4 h-4" />
          Start Over
        </button>
      </div>
    </div>
  );
};

export default DecisionTree;
