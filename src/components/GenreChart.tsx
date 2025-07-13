import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { GenreData } from '../data/analysisData';

interface GenreChartProps {
  data: GenreData[];
  type: 'sentiment' | 'sarcasm' | 'scatter';
}

export const GenreChart: React.FC<GenreChartProps> = ({ data, type }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200">
          <p className="font-semibold text-slate-900 mb-2 capitalize">{data.genre}</p>
          <p className="text-slate-600">Avg Sentiment: {data.avgSentiment.toFixed(3)}</p>
          <p className="text-slate-600">Sarcasm Rate: {(data.sarcasmRate * 100).toFixed(1)}%</p>
          <p className="text-slate-600">Reviews: {data.reviewCount}</p>
          <p className="text-slate-600">Confidence: {data.avgConfidence.toFixed(3)}</p>
        </div>
      );
    }
    return null;
  };

  if (type === 'scatter') {
    return (
      <div className="chart-container">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Sentiment vs Sarcasm Rate by Genre</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              type="number" 
              dataKey="sarcasmRate" 
              name="Sarcasm Rate"
              stroke="#64748b"
              fontSize={12}
              label={{ value: 'Sarcasm Rate', position: 'insideBottom', offset: -10 }}
            />
            <YAxis 
              type="number" 
              dataKey="avgSentiment" 
              name="Average Sentiment"
              stroke="#64748b"
              fontSize={12}
              label={{ value: 'Average Sentiment', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter 
              data={data} 
              fill="#3b82f6"
              r={8}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => 
    type === 'sentiment' ? b.avgSentiment - a.avgSentiment : b.sarcasmRate - a.sarcasmRate
  );

  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        {type === 'sentiment' ? 'Average Sentiment by Genre' : 'Sarcasm Rate by Genre'}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sortedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="genre" 
            stroke="#64748b"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
            label={{ 
              value: type === 'sentiment' ? 'Average Sentiment' : 'Sarcasm Rate', 
              angle: -90, 
              position: 'insideLeft' 
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey={type === 'sentiment' ? 'avgSentiment' : 'sarcasmRate'} 
            fill={type === 'sentiment' ? '#3b82f6' : '#ef4444'}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};