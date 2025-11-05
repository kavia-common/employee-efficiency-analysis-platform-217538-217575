import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * PUBLIC_INTERFACE
 * SimpleScatter
 * Renders a scatter plot using recharts.
 * Props:
 *  - data: array of { x: number, y: number }
 *  - xLabel?: string
 *  - yLabel?: string
 *  - color?: string
 */
function SimpleScatter({ data = [], xLabel = 'x', yLabel = 'y', color = '#06b6d4' }) {
  return (
    <div className="card">
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name={xLabel} tick={{ fontSize: 12 }} />
          <YAxis type="number" dataKey="y" name={yLabel} tick={{ fontSize: 12 }} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={data} fill={color} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SimpleScatter;
