import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TimelineData } from '../data/analysisData';

interface TimelineChartProps {
  data: TimelineData[];
  title: string;
  dataKey: 'avgSentiment' | 'sarcasmRate';
  color: string;
  yAxisLabel: string;
}

export const TimelineChart: React.FC<TimelineChartProps> = ({
  data,
  title,
  dataKey,
  color,
  yAxisLabel
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200">
          <p className="font-semibold text-slate-900 mb-2">Year: {label}</p>
          <p className="text-slate-600">
            {dataKey === 'avgSentiment' ? 'Average Sentiment' : 'Sarcasm Rate'}: 
            {dataKey === 'avgSentiment' 
              ? ` ${data[dataKey].toFixed(3)}`
              : ` ${(data[dataKey] * 100).toFixed(1)}%`
            }
          </p>
          <p className="text-slate-600">Reviews: {data.reviewCount}</p>
          <p className="text-slate-600">Confidence: {data.avgConfidence.toFixed(3)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="year" 
            stroke="#64748b"
            fontSize={12}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
            label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={3}
            dot={{ fill: color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
            name={dataKey === 'avgSentiment' ? 'Average Sentiment' : 'Sarcasm Rate'}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};