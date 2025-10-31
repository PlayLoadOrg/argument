import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Tabs from './components/Tabs';
import ScenarioContent from './components/ScenarioContent';
import DecisionButtons from './components/DecisionButtons';
import FallacySelector from './components/FallacySelector';
import NarratorFeedback from './components/NarratorFeedback';
import EndScreen from './components/EndScreen';
import scenarios from './data/scenarios.json';
import { soundManager } from './utils/soundManager';
import { saveProgress, loadProgress, clearProgress } from './utils/saveProgress';

function App() {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('statement');
  const [decision, setDecision] = useState(null);
  const [selectedFallacies, setSelectedFallacies] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState([]);
  const [showEndScreen, setShowEndScreen] = useState(false);

  // Load progress on mount
  useEffect(() => {
    const savedProgress = loadProgress();
    if (savedProgress.currentScenarioIndex > 0) {
      setCurrentScenarioIndex(savedProgress.currentScenarioIndex);
      setResults(savedProgress.results || []);
    }
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    if (currentScenarioIndex > 0 || results.length > 0) {
      saveProgress({
        currentScenarioIndex,
        results,
        lastPlayed: new Date().toISOString()
      });
    }
  }, [currentScenarioIndex, results]);

  const scenario = scenarios[currentScenarioIndex];

  const handleTabChange = (tabId) => {
    soundManager.playPageTurn();
  };

  const handleDecision = (choice) => {
    setDecision(choice);
    if (choice === 'sound') {
      // Immediately evaluate for sound arguments
      evaluateDecision(choice, []);
    }
  };

  const toggleFallacy = (fallacyId) => {
    setSelectedFallacies(prev =>
      prev.includes(fallacyId)
        ? prev.filter(id => id !== fallacyId)
        : [...prev, fallacyId]
    );
  };

  const handleSubmit = () => {
    evaluateDecision('fallacy', selectedFallacies);
  };

  const evaluateDecision = (playerDecision, playerFallacies) => {
    const isCorrect = playerDecision === scenario.correctDecision;
    
    // Play appropriate sound
    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }

    const newResult = {
      scenarioId: scenario.id,
      correct: isCorrect,
      decision: playerDecision,
      selectedFallacies: playerFallacies
    };

    setResults([...results, newResult]);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setDecision(null);
    setSelectedFallacies([]);
    
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setActiveTab('statement');
    } else {
      setShowEndScreen(true);
    }
  };

  const handleRestart = () => {
    clearProgress();
    setCurrentScenarioIndex(0);
    setActiveTab('statement');
    setDecision(null);
    setSelectedFallacies([]);
    setShowFeedback(false);
    setResults([]);
    setShowEndScreen(false);
  };

  if (showEndScreen) {
    return <EndScreen results={results} onRestart={handleRestart} />;
  }

  if (showFeedback) {
    const lastResult = results[results.length - 1];
    return (
      <NarratorFeedback
        scenario={scenario}
        isCorrect={lastResult.correct}
        onNext={handleNext}
      />
    );
  }

  return (
    <div className="app-container">
      <Header scenarioIndex={currentScenarioIndex} totalScenarios={scenarios.length} />
      
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} onTabChange={handleTabChange} />

      <div className="content-area">
        <div className="max-width-container">
          <ScenarioContent scenario={scenario} activeTab={activeTab} />
        </div>
      </div>

      <div className="decision-container">
        <div className="max-width-container">
          {!decision ? (
            <DecisionButtons onDecision={handleDecision} />
          ) : decision === 'fallacy' ? (
            <FallacySelector
              selectedFallacies={selectedFallacies}
              onToggle={toggleFallacy}
              onSubmit={handleSubmit}
              onCancel={() => {
                setDecision(null);
                setSelectedFallacies([]);
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;