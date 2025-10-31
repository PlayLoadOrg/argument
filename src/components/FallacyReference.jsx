import React from 'react';
import { X } from 'lucide-react';
import fallacyData from '../data/fallacyReference.json';

export default function FallacyReference({ onClose }) {
  return (
    <div className="fixed inset-0 bg-zinc-900 z-50 overflow-auto">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Fallacy Reference Guide</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded transition-colors"
            aria-label="Close reference"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-8">
          {fallacyData.categories.map((category) => (
            <section key={category.name} className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">{category.name}</h3>
              <p className="text-sm text-zinc-400 mb-4">{category.description}</p>

              <div className="space-y-4">
                {category.fallacies.map((fallacy) => (
                  <div key={fallacy.id} className="bg-zinc-900 rounded p-4">
                    <h4 className="font-semibold text-amber-400 mb-2">{fallacy.label}</h4>
                    <p className="text-zinc-300 mb-2">{fallacy.definition}</p>
                    <div className="text-sm text-zinc-400 italic">
                      <strong>Example:</strong> "{fallacy.example}"
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-8 bg-zinc-700 hover:bg-zinc-600 py-3 rounded font-semibold transition-colors"
        >
          Close Reference
        </button>
      </div>
    </div>
  );
}