import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface SarcasmPieChartProps {
  sarcasticCount: number;
  totalCount: number;
}

export const SarcasmPieChart: React.FC<SarcasmPieChartProps> = ({
  sarcasticCount,
  totalCount
}) => {
  const data = [
    {
      name: 'Sarcastic Reviews',
      value: sarcasticCount,
      percentage: ((sarcasticCount / totalCount) * 100).toFixed(1)
    },
    {
      name: 'Non-Sarcastic Reviews',
      value: totalCount - sarcasticCount,
      percentage: (((totalCount - sarcasticCount) / totalCount) * 100).toFixed(1)
    }
  ];

  const COLORS = ['#ef4444', '#3b82f6'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
          <p className="font-semibold text-slate-900">{data.name}</p>
          <p className="text-slate-600">Count: {data.value.toLocaleString()}</p>
          <p className="text-slate-600">Percentage: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Sarcasm Detection Results</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ percentage }) => `${percentage}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};