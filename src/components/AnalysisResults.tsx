import React from 'react';
import { MetricCard } from './MetricCard';
import { SarcasmPieChart } from './SarcasmPieChart';
import { TimelineChart } from './TimelineChart';
import { GenreChart } from './GenreChart';
import { SarcasticReviewsTable } from './SarcasticReviewsTable';
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Award,
  Brain,
  Download
} from 'lucide-react';

interface AnalysisResultsProps {
  results: {
    processedReviews: any[];
    totalReviews: number;
    sarcasticReviews: number;
    avgSentiment: number;
    avgConfidence: number;
    genreBreakdown: any[];
    timelineData: any[];
    topSarcastic: any[];
  };
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
  const sarcasmRate = (results.sarcasticReviews / results.totalReviews) * 100;

  const downloadResults = () => {
    const csvContent = [
      'id,review,genre,year,is_sarcastic,sentiment_score,confidence,adjusted_sentiment',
      ...results.processedReviews.map(review => 
        `${review.id},"${review.review.replace(/"/g, '""')}",${review.genre || 'unknown'},${review.year || ''},${review.isSarcastic},${review.sentimentScore.toFixed(3)},${review.confidence.toFixed(3)},${review.adjustedSentiment.toFixed(3)}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sarcascope_analysis_results.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Results Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-primary-500" />
            <h3 className="text-xl font-bold text-slate-900">Analysis Results</h3>
          </div>
          <button
            onClick={downloadResults}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Results
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Reviews Analyzed"
            value={results.totalReviews.toLocaleString()}
            subtitle="From your uploaded CSV"
            icon={Users}
            color="blue"
          />
          <MetricCard
            title="Sarcastic Reviews Detected"
            value={`${sarcasmRate.toFixed(1)}%`}
            subtitle={`${results.sarcasticReviews.toLocaleString()} reviews`}
            icon={AlertTriangle}
            color="red"
          />
          <MetricCard
            title="Average Sentiment Score"
            value={results.avgSentiment.toFixed(3)}
            subtitle="Sarcasm-adjusted sentiment"
            icon={TrendingUp}
            color="green"
          />
          <MetricCard
            title="Average Confidence"
            value={`${(results.avgConfidence * 100).toFixed(1)}%`}
            subtitle="Model confidence level"
            icon={Award}
            color="purple"
          />
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SarcasmPieChart 
          sarcasticCount={results.sarcasticReviews}
          totalCount={results.totalReviews}
        />
        
        {results.timelineData.length > 1 && (
          <TimelineChart
            data={results.timelineData}
            title="Sentiment Evolution Over Time"
            dataKey="avgSentiment"
            color="#3b82f6"
            yAxisLabel="Average Sentiment"
          />
        )}
      </div>

      {results.timelineData.length > 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TimelineChart
            data={results.timelineData}
            title="Sarcasm Rate Over Time"
            dataKey="sarcasmRate"
            color="#ef4444"
            yAxisLabel="Sarcasm Rate"
          />
          
          {results.genreBreakdown.length > 1 && (
            <GenreChart data={results.genreBreakdown} type="sentiment" />
          )}
        </div>
      )}

      {results.genreBreakdown.length > 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GenreChart data={results.genreBreakdown} type="sarcasm" />
          <GenreChart data={results.genreBreakdown} type="scatter" />
        </div>
      )}

      {/* Top Sarcastic Reviews */}
      {results.topSarcastic.length > 0 && (
        <SarcasticReviewsTable reviews={results.topSarcastic} />
      )}

      {/* Analysis Summary */}
      <div className="card">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Analysis Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Key Findings</h4>
            <ul className="space-y-2 text-slate-600">
              <li>• <strong>{sarcasmRate.toFixed(1)}%</strong> of reviews were detected as sarcastic</li>
              <li>• Average sentiment score: <strong>{results.avgSentiment.toFixed(3)}</strong></li>
              <li>• Model confidence: <strong>{(results.avgConfidence * 100).toFixed(1)}%</strong></li>
              <li>• Total reviews processed: <strong>{results.totalReviews.toLocaleString()}</strong></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Model Features</h4>
            <ul className="space-y-2 text-slate-600">
              <li>• Pattern-based sarcasm detection</li>
              <li>• Sentiment contradiction analysis</li>
              <li>• Genre-aware processing</li>
              <li>• Confidence scoring for each prediction</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};