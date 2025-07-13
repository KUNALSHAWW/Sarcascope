import React from 'react';
import { MessageSquare, Calendar, Star } from 'lucide-react';
import { SarcasticReview } from '../data/analysisData';

interface SarcasticReviewsTableProps {
  reviews: SarcasticReview[];
}

export const SarcasticReviewsTable: React.FC<SarcasticReviewsTableProps> = ({ reviews }) => {
  const getSentimentColor = (score: number) => {
    if (score > 0) return 'text-green-600 bg-green-50';
    if (score < -0.5) return 'text-red-600 bg-red-50';
    return 'text-orange-600 bg-orange-50';
  };

  const getGenreColor = (genre: string) => {
    const colors: { [key: string]: string } = {
      action: 'bg-red-100 text-red-800',
      comedy: 'bg-yellow-100 text-yellow-800',
      drama: 'bg-blue-100 text-blue-800',
      horror: 'bg-purple-100 text-purple-800',
      romance: 'bg-pink-100 text-pink-800',
      'sci-fi': 'bg-green-100 text-green-800',
      thriller: 'bg-gray-100 text-gray-800',
      fantasy: 'bg-indigo-100 text-indigo-800',
      unknown: 'bg-slate-100 text-slate-800'
    };
    return colors[genre] || colors.unknown;
  };

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="w-6 h-6 text-sarcasm-500" />
        <h3 className="text-xl font-bold text-slate-900">Top 10 Most Sarcastic Reviews</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Review</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Genre</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Year</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Sentiment</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-sarcasm-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-sarcasm-600">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-900 leading-relaxed max-w-md">
                        {review.review.length > 120 
                          ? `${review.review.substring(0, 120)}...` 
                          : review.review
                        }
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getGenreColor(review.genre)}`}>
                    {review.genre}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{review.year}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSentimentColor(review.sentimentScore)}`}>
                    {review.sentimentScore.toFixed(2)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-slate-600">{(review.confidence * 100).toFixed(0)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};