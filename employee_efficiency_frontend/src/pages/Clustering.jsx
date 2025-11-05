import React, { useState } from 'react';
import { runClustering } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * Clustering Page
 * Run clustering and display returned cluster labels and counts.
 */
function Clustering() {
  const [k, setK] = useState(3);
  const [features, setFeatures] = useState('experience,efficiency,projects');
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setResult(null);
    try {
      const payload = {
        method: 'kmeans',
        k: Number(k),
        features: features.split(',').map(s => s.trim()).filter(Boolean),
      };
      const { data } = await runClustering(payload);
      setResult(data);
    } catch {
      setResult({ error: 'Clustering failed' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <form onSubmit={submit} className="card">
        <h3 style={{ marginTop: 0 }}>K-Means Clustering</h3>
        <div className="form-group">
          <label htmlFor="k">Clusters (k)</label>
          <input id="k" type="number" min={2} max={12} value={k} onChange={e => setK(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="features">Features (comma separated)</label>
          <input id="features" type="text" value={features} onChange={e => setFeatures(e.target.value)} />
        </div>
        <button className="btn btn-success" disabled={busy} type="submit">
          {busy ? 'Running…' : 'Run'}
        </button>
      </form>

      {result && (
        <div className="card">
          <h4 style={{ marginTop: 0 }}>Results</h4>
          {'error' in result ? (
            <div style={{ color: '#EF4444' }}>{result.error}</div>
          ) : (
            <>
              {Array.isArray(result?.labels) ? (
                <div>
                  <div style={{ marginBottom: 8 }}><strong>Labels:</strong> {result.labels.join(', ')}</div>
                  {result?.counts && (
                    <div>
                      <strong>Counts:</strong>
                      <ul>
                        {Object.entries(result.counts).map(([cluster, count]) => (
                          <li key={cluster}>Cluster {cluster}: {count}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div>No labels returned.</div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Clustering;
