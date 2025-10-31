import React from 'react';
import { BookOpen, Scale, ListTree } from 'lucide-react';

export default function Tabs({ activeTab, setActiveTab, onTabChange }) {
  const tabs = [
    { id: 'statement', label: 'Statement', icon: BookOpen },
    { id: 'context', label: 'Context', icon: Scale },
    { id: 'analysis', label: 'Analysis', icon: ListTree }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className="tabs-container">
      <div className="tabs-wrapper">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}