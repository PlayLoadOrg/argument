import React from 'react';

export default function DecisionButtons({ onDecision, disabled }) {
  return (
    <div className="decision-buttons">
      <button
        onClick={() => onDecision('sound')}
        disabled={disabled}
        className="btn-success"
      >
        Sound Argument
      </button>
      <button
        onClick={() => onDecision('fallacy')}
        disabled={disabled}
        className="btn-danger"
      >
        Contains Fallacy
      </button>
    </div>
  );
}