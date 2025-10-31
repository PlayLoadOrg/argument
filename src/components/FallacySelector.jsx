import React from 'react';
import fallacyData from '../data/fallacyReference.json';

export default function FallacySelector({ selectedFallacies, onToggle, onSubmit, onCancel }) {
  return (
    <div className="fallacy-selector">
      <div className="fallacy-intro">
        Select all fallacies present in this argument
      </div>
      
      {fallacyData.categories.map((category) => (
        <div key={category.name} className="fallacy-category">
          <div className="fallacy-category-title">{category.name}</div>
          <div className="fallacy-options">
            {category.fallacies.map((fallacy) => (
              <button
                key={fallacy.id}
                onClick={() => onToggle(fallacy.id)}
                className={`fallacy-button ${selectedFallacies.includes(fallacy.id) ? 'selected' : ''}`}
              >
                {fallacy.label}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="fallacy-actions">
        <button
          onClick={onCancel}
          className="btn-secondary"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={selectedFallacies.length === 0}
          className={`btn-danger btn-submit ${selectedFallacies.length === 0 ? '' : ''}`}
        >
          Submit ({selectedFallacies.length} selected)
        </button>
      </div>
    </div>
  );
}