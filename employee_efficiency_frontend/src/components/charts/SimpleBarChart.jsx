import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

/**
 * PUBLIC_INTERFACE
 * SimpleBarChart
 * Renders a bar chart using recharts.
 * Props:
 *  - data: array of { name: string, value: number }
 *  - color?: string
 */
function SimpleBarChart({ data = [], color = '#3b82f6' }) {
  return (
    <div className="card">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="value" fill={color} radius={[6,6,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SimpleBarChart;
