import React from 'react';
import { Brain, Github, ExternalLink } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-sarcasm-500 rounded-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Sarcascope</h1>
              <p className="text-sm text-slate-600">Sarcasm-Aware Sentiment Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 text-slate-600">
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">GitHub</span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">View Analysis</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};