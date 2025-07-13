import React from 'react';
import { Heart, Code, Database } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Sarcascope</h3>
            <p className="text-slate-300 leading-relaxed">
              An intelligent sentiment analysis dashboard that goes beyond traditional sentiment analysis 
              by detecting and accounting for sarcasm in IMDB movie reviews.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Technologies</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <Code className="w-4 h-4" />
                <span>Python, HuggingFace Transformers</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Database className="w-4 h-4" />
                <span>RoBERTa, BERT, VADER</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Heart className="w-4 h-4" />
                <span>React, TypeScript, Tailwind</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Key Features</h3>
            <ul className="space-y-2 text-slate-300">
              <li>• Sarcasm-aware sentiment analysis</li>
              <li>• Genre-wise breakdown</li>
              <li>• Historical timeline analysis</li>
              <li>• Interactive visualizations</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            Built with <Heart className="w-4 h-4 inline text-red-500" /> for better sentiment understanding
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Sarcascope - Because sometimes "great movie" doesn't mean great movie
          </p>
        </div>
      </div>
    </footer>
  );
};