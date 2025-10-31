import React, { useState } from 'react';
import { X, Volume2, VolumeX, BookOpen, RotateCcw, Info, Accessibility } from 'lucide-react';
import { soundManager } from '../utils/soundManager';
import FallacyReference from './FallacyReference';

export default function HamburgerMenu({ isOpen, onClose }) {
  const [soundEnabled, setSoundEnabled] = useState(soundManager.enabled);
  const [showFallacyRef, setShowFallacyRef] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  if (!isOpen) return null;

  const toggleSound = () => {
    const newState = soundManager.toggle();
    setSoundEnabled(newState);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.removeItem('argument_game_progress');
      window.location.reload();
    }
  };

  if (showFallacyRef) {
    return <FallacyReference onClose={() => setShowFallacyRef(false)} />;
  }

  if (showHowToPlay) {
    return (
      <div className="fullscreen-overlay">
        <div className="overlay-content">
          <div className="overlay-header">
            <h2 className="overlay-title">How to Play</h2>
            <button onClick={() => setShowHowToPlay(false)} className="overlay-close">
              <X size={24} />
            </button>
          </div>

          <div className="guide-section">
            <h3 className="guide-title">Your Mission</h3>
            <p className="guide-text">
              Evaluate arguments from America's Founding Era. Determine whether each argument is logically sound
              or contains fallacies. The Republic depends on citizens who can think critically.
            </p>
          </div>

          <div className="guide-section">
            <h3 className="guide-title">How It Works</h3>
            <ol className="guide-list">
              <li>Read the historical statement carefully</li>
              <li>Review the context (who wrote it, when, and why)</li>
              <li>Examine the logical structure</li>
              <li>Decide: Is this a <strong>Sound Argument</strong> or does it <strong>Contain Fallacies</strong>?</li>
              <li>If fallacious, identify which specific fallacies are present</li>
              <li>Learn from the narrator's feedback</li>
            </ol>
          </div>

          <div className="guide-section">
            <h3 className="guide-title">Important Distinction</h3>
            <p className="guide-text mb-2">
              <strong>Disagreeing with a conclusion ≠ Finding a logical flaw</strong>
            </p>
            <p className="guide-text">
              An argument can be logically sound even if you disagree with its premises or conclusion.
              Your job is to evaluate the <em>reasoning</em>, not judge whether you like the conclusion.
            </p>
          </div>

          <div className="guide-section">
            <h3 className="guide-title">Victory Condition</h3>
            <p className="guide-text">
              Achieve 80% accuracy or higher to prove the Republic can stand. Below that threshold,
              democracy becomes vulnerable to manipulation and demagoguery.
            </p>
          </div>

          <button onClick={() => setShowHowToPlay(false)} className="btn-secondary btn-full-width mt-4">
            Got It
          </button>
        </div>
      </div>
    );
  }

  if (showAbout) {
    return (
      <div className="fullscreen-overlay">
        <div className="overlay-content">
          <div className="overlay-header">
            <h2 className="overlay-title">About ARGUMENT</h2>
            <button onClick={() => setShowAbout(false)} className="overlay-close">
              <X size={24} />
            </button>
          </div>

          <div className="guide-section">
            <h3 className="guide-title">Why This Matters</h3>
            <p className="guide-text">
              In the information age, democracies face unprecedented cognitive warfare. Citizens who cannot
              distinguish sound reasoning from fallacious rhetoric are vulnerable to manipulation.
            </p>
          </div>

          <div className="guide-section">
            <h3 className="guide-title">Learning from the Founders</h3>
            <p className="guide-text">
              The Founders were brilliant AND flawed. Their arguments deserve evaluation on merit - which means
              seeing both the logic AND the fallacies. This game uses actual historical statements to teach
              critical thinking skills that apply to modern discourse.
            </p>
          </div>

          <div className="guide-section">
            <h3 className="guide-title">Open Source</h3>
            <p className="guide-text mb-2">
              ARGUMENT is open source and built by citizens for citizens. We believe critical thinking
              education should be freely accessible to all.
            </p>
            <p className="guide-text">
              GitHub: <a href="https://github.com/PlayLoadOrg/argument" className="text-accent" style={{textDecoration: 'underline'}}>
                PlayLoadOrg/argument
              </a>
            </p>
          </div>

          <div className="guide-section">
            <h3 className="guide-title">Credits</h3>
            <p className="guide-text">
              Created by educators and developers who believe democracy requires an informed citizenry
              capable of critical reasoning.
            </p>
          </div>

          <button onClick={() => setShowAbout(false)} className="btn-secondary btn-full-width mt-4">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-overlay">
      <div className="menu-panel">
        <div className="menu-header">
          <h2 className="menu-title">Menu</h2>
          <button onClick={onClose} className="menu-close" aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <nav className="menu-nav">
          <button onClick={() => setShowHowToPlay(true)} className="menu-item">
            <Info size={20} />
            <span>How to Play</span>
          </button>

          <button onClick={() => setShowFallacyRef(true)} className="menu-item">
            <BookOpen size={20} />
            <span>Fallacy Reference</span>
          </button>

          <button onClick={toggleSound} className="menu-item">
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            <span>Sound: {soundEnabled ? 'On' : 'Off'}</span>
          </button>

          <button onClick={handleReset} className="menu-item danger">
            <RotateCcw size={20} />
            <span>Reset Progress</span>
          </button>

          <button onClick={() => setShowAbout(true)} className="menu-item">
            <Accessibility size={20} />
            <span>About ARGUMENT</span>
          </button>
        </nav>

        <div className="menu-footer">
          <p>Open source critical thinking training</p>
          <p className="mt-1">Version 1.0.0</p>
        </div>
      </div>

      <div className="menu-overlay-clickable" onClick={onClose} />
    </div>
  );
}