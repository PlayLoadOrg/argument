import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export default function NarratorFeedback({ scenario, isCorrect, onNext }) {
  return (
    <div className="feedback-container">
      <div className="feedback-card">
        <div className="feedback-header">
          <div className="feedback-icon">
            {isCorrect ? (
              <CheckCircle className="text-success" size={64} />
            ) : (
              <AlertTriangle className="text-warning" size={64} />
            )}
          </div>
          <h2 className="feedback-title">
            {isCorrect ? 'You Got It' : 'Not Quite'}
          </h2>
          <div className="feedback-meta">
            {scenario.author.name}, {scenario.context.date}
          </div>
        </div>
        
        <div className="feedback-text">
          <p>
            {isCorrect ? scenario.narratorFeedback.correct : scenario.narratorFeedback.incorrect}
          </p>
        </div>

        <div className="feedback-lesson">
          <div className="feedback-lesson-title">Key Lesson</div>
          <p className="feedback-lesson-text">
            {isCorrect 
              ? "Remember: An argument can be logically sound even if you disagree with its conclusion. The test is whether the reasoning holds, not whether you like where it leads."
              : "When evaluating arguments, separate your emotional reaction from the logical structure. Strong feelings about a conclusion don't mean the reasoning is flawed - and eloquent rhetoric doesn't guarantee sound logic."
            }
          </p>
        </div>

        <button
          onClick={onNext}
          className="btn-primary btn-full-width btn-large"
        >
          Continue
        </button>
      </div>
    </div>
  );
}