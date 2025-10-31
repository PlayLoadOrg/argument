import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, RotateCcw } from 'lucide-react';
import { calculateAccuracy, getRepublicStatus } from '../utils/saveProgress';

export default function EndScreen({ results, onRestart }) {
  const accuracy = calculateAccuracy(results);
  const republicStatus = getRepublicStatus(accuracy);
  const correctCount = results.filter(r => r.correct).length;

  const StatusIcon = () => {
    if (republicStatus.status === 'stands') return <CheckCircle className="text-success" size={96} />;
    if (republicStatus.status === 'wavers') return <AlertTriangle className="text-warning" size={96} />;
    return <XCircle className="text-danger" size={96} />;
  };

  const getStatusClass = () => {
    if (republicStatus.color === 'green') return 'status-green';
    if (republicStatus.color === 'yellow') return 'status-yellow';
    return 'status-red';
  };

  return (
    <div className="end-screen-container">
      <div className="end-screen-content">
        <div className="end-screen-header">
          <div className="end-screen-icon">
            <StatusIcon />
          </div>
          <h1 className="end-screen-title">{republicStatus.title}</h1>
          <div className="end-screen-subtitle">
            {correctCount} of {results.length} Arguments Correctly Evaluated
          </div>
          <div className="end-screen-accuracy">{accuracy}%</div>
          <div className="end-screen-label">Accuracy</div>
        </div>

        <div className={`status-message ${getStatusClass()}`}>
          <p>{republicStatus.message}</p>
        </div>

        {republicStatus.status === 'stands' && (
          <div className="madison-quote">
            <p>
              "A well-instructed people alone can be permanently a free people." 
              <span className="quote-author">— James Madison</span>
            </p>
          </div>
        )}

        <div className="scenario-summary">
          <h3 className="summary-title">Summary by Scenario</h3>
          <div className="summary-list">
            {results.map((result, idx) => (
              <div 
                key={idx} 
                className={`summary-item ${result.correct ? 'correct' : 'incorrect'}`}
              >
                {result.correct ? (
                  <CheckCircle className="text-success" size={20} />
                ) : (
                  <XCircle className="text-danger" size={20} />
                )}
                <div className="summary-item-content">
                  <div className="summary-item-title">Scenario {idx + 1}</div>
                  <div className="summary-item-subtitle">
                    {result.correct ? 'Correctly identified' : 'Missed'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onRestart}
          className="btn-primary btn-full-width btn-large flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} />
          <span>Start Over</span>
        </button>

        <div className="end-screen-footer">
          <p>Share this game with others who care about democracy</p>
          <p>Critical thinking is contagious</p>
        </div>
      </div>
    </div>
  );
}