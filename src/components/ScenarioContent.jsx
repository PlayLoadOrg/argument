import React from 'react';
import { BookOpen, Scale } from 'lucide-react';

export default function ScenarioContent({ scenario, activeTab }) {
  if (activeTab === 'statement') {
    return (
      <div>
        <div className="card">
          <div className="card-with-icon">
            <BookOpen className="icon-amber" size={32} />
            <div>
              <h2 className="statement-title">{scenario.title}</h2>
              <div className="statement-meta">
                {scenario.author.name} • {scenario.context.date}
              </div>
            </div>
          </div>
        </div>

        <div className="card-dark">
          <blockquote className="statement-quote">
            {scenario.statement}
          </blockquote>
        </div>
      </div>
    );
  }

  if (activeTab === 'context') {
    return (
      <div className="card">
        <div className="card-with-icon mb-4">
          <Scale className="icon-amber" size={24} />
          <h3 className="analysis-title">Historical Context</h3>
        </div>
        
        <div>
          <div className="context-section">
            <div className="context-label">Who Wrote It</div>
            <p className="context-text">{scenario.author.brief}</p>
            <p className="context-subtext">Bias: {scenario.author.bias}</p>
          </div>

          <div className="context-section">
            <div className="context-label">When & Why</div>
            <p className="context-text">{scenario.context.situation}</p>
          </div>

          <div className="context-section">
            <div className="context-label">What Was at Stake</div>
            <p className="context-text">{scenario.context.stakes}</p>
          </div>

          <div className="context-section">
            <div className="context-label">Intended Audience</div>
            <p className="context-text">{scenario.context.audience}</p>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'analysis') {
    return (
      <div className="card">
        <h3 className="analysis-title mb-2">Logical Structure</h3>
        <p className="analysis-description">
          Here's the argument broken down into its components. No judgment yet - just structure.
        </p>
        
        <div className="analysis-list">
          {scenario.logicalStructure.map((item, idx) => (
            <div key={idx} className="analysis-item">
              <div className="analysis-item-text">{item}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}