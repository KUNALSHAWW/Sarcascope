import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  Brain,
  Zap,
  Award,
  AlertTriangle
} from 'lucide-react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MetricCard } from './components/MetricCard';
import { SarcasmPieChart } from './components/SarcasmPieChart';
import { TimelineChart } from './components/TimelineChart';
import { GenreChart } from './components/GenreChart';
import { SarcasticReviewsTable } from './components/SarcasticReviewsTable';

import { 
  overallMetrics, 
  genreData, 
  timelineData, 
  topSarcasticReviews 
} from './data/analysisData';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            IMDB Sarcasm-Aware Sentiment Analysis
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Advanced sentiment analysis that detects and accounts for sarcasm in movie reviews, 
            providing more accurate insights into genuine user opinions.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-slide-up">
          <MetricCard
            title="Total Reviews Analyzed"
            value={overallMetrics.totalReviews.toLocaleString()}
            subtitle="IMDB movie reviews"
            icon={Users}
            color="blue"
          />
          <MetricCard
            title="Sarcastic Reviews Detected"
            value={`${overallMetrics.sarcasmRate}%`}
            subtitle={`${overallMetrics.sarcasticReviews.toLocaleString()} reviews`}
            icon={AlertTriangle}
            color="red"
          />
          <MetricCard
            title="Average Sentiment Score"
            value={overallMetrics.avgSentiment.toFixed(3)}
            subtitle="Sarcasm-adjusted sentiment"
            icon={TrendingUp}
            color="green"
          />
          <MetricCard
            title="Model Improvement"
            value={`${Math.abs(overallMetrics.improvement).toFixed(1)}%`}
            subtitle="Over traditional analysis"
            icon={Award}
            color="purple"
            trend={{
              value: Math.abs(overallMetrics.improvement),
              isPositive: false
            }}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <SarcasmPieChart 
              sarcasticCount={overallMetrics.sarcasticReviews}
              totalCount={overallMetrics.totalReviews}
            />
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <TimelineChart
              data={timelineData.filter(d => d.year >= 1990 && d.year <= 2010)}
              title="Sentiment Evolution Over Time"
              dataKey="avgSentiment"
              color="#3b82f6"
              yAxisLabel="Average Sentiment"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <TimelineChart
              data={timelineData.filter(d => d.year >= 1990 && d.year <= 2010)}
              title="Sarcasm Rate Over Time"
              dataKey="sarcasmRate"
              color="#ef4444"
              yAxisLabel="Sarcasm Rate"
            />
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <GenreChart data={genreData} type="sentiment" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <GenreChart data={genreData} type="sarcasm" />
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <GenreChart data={genreData} type="scatter" />
          </div>
        </div>

        {/* Performance Insights */}
        <div className="card mb-12 animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-primary-500" />
            <h3 className="text-xl font-bold text-slate-900">Model Performance Insights</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-slate-900 mb-1">Sarcasm Detection</h4>
              <p className="text-sm text-slate-600">
                Multi-layered approach combining pattern matching, sentiment contradiction, 
                and BERT-based classification
              </p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-slate-900 mb-1">Sentiment Adjustment</h4>
              <p className="text-sm text-slate-600">
                Intelligent sentiment flipping for sarcastic reviews using 
                confidence-weighted corrections
              </p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-slate-900 mb-1">Genre Analysis</h4>
              <p className="text-sm text-slate-600">
                Horror shows highest sarcasm rate (65.8%), while fantasy 
                has the most balanced sentiment distribution
              </p>
            </div>
          </div>
        </div>

        {/* Top Sarcastic Reviews Table */}
        <div className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <SarcasticReviewsTable reviews={topSarcasticReviews} />
        </div>

        {/* Key Findings */}
        <div className="card mt-12 animate-slide-up" style={{ animationDelay: '0.9s' }}>
          <h3 className="text-xl font-bold text-slate-900 mb-6">Key Findings & Insights</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Genre Insights</h4>
              <ul className="space-y-2 text-slate-600">
                <li>• <strong>Horror</strong> has the highest sarcasm rate at 65.8%</li>
                <li>• <strong>Sci-fi</strong> shows the most negative sentiment (-0.044)</li>
                <li>• <strong>Comedy</strong> has the largest sample size (1,218 reviews)</li>
                <li>• <strong>Fantasy</strong> shows the most balanced sentiment distribution</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Timeline Insights</h4>
              <ul className="space-y-2 text-slate-600">
                <li>• Peak analysis period: 1979 with 4,234 reviews</li>
                <li>• Highest sentiment year: 2024 (0.939)</li>
                <li>• Most negative year: 2055 (-0.688)</li>
                <li>• Sarcasm detection shows consistent patterns across decades</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;