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
      info: "'Collection' bags should have minimal branding and high-end construction"
    },
    mkCollectionCheck: {
      question: "'Collection' criteria met?",
      options:
       [
           {"YES","NO"}
       ]
    },
    reject:{
     result:"
