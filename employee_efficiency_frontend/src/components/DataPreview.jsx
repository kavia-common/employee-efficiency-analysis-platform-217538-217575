import React from 'react';

/**
 * PUBLIC_INTERFACE
 * DataPreview
 * Simple table preview, expects array of objects.
 * Props:
 *  - rows: array of objects
 *  - title?: string
 *  - limit?: number
 */
function DataPreview({ rows = [], title = 'Preview', limit = 10 }) {
  const displayRows = rows.slice(0, limit);
  const columns = displayRows.length ? Object.keys(displayRows[0]) : [];

  return (
    <div className="card">
      <h3 style={{ margin: '0 0 8px 0' }}>{title} <span className="badge">{displayRows.length} rows</span></h3>
      {columns.length === 0 ? (
        <div style={{ color: '#64748b' }}>No data</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                {columns.map(c => <th key={c}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {displayRows.map((r, i) => (
                <tr key={i}>
                  {columns.map(c => <td key={c}>{String(r[c])}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DataPreview;
