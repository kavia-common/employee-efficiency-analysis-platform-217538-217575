import React, { useState } from 'react';
import { trainModel } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * Modeling Page
 * Train a model and show returned metrics.
 */
function Modeling() {
  const [algo, setAlgo] = useState('linear_regression');
  const [features, setFeatures] = useState('experience,projects,attendance');
  const [target, setTarget] = useState('efficiency');
  const [metrics, setMetrics] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMetrics(null);
    try {
      const payload = {
        algorithm: algo,
        features: features.split(',').map(s => s.trim()).filter(Boolean),
        target: target.trim(),
      };
      const { data } = await trainModel(payload);
      setMetrics(data);
    } catch {
      setMetrics({ error: 'Training failed' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <form onSubmit={submit} className="card">
        <h3 style={{ marginTop: 0 }}>Train Model</h3>
        <div className="form-group">
          <label htmlFor="algo">Algorithm</label>
          <select id="algo" value={algo} onChange={e => setAlgo(e.target.value)}>
            <option value="linear_regression">Linear Regression</option>
            <option value="random_forest">Random Forest</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="features">Features (comma separated)</label>
          <input id="features" type="text" value={features} onChange={e => setFeatures(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="target">Target</label>
          <input id="target" type="text" value={target} onChange={e => setTarget(e.target.value)} />
        </div>
        <button className="btn btn-primary" disabled={busy} type="submit">
          {busy ? 'Training…' : 'Train'}
        </button>
      </form>

      {metrics && (
        <div className="card">
          <h4 style={{ marginTop: 0 }}>Metrics</h4>
          {'error' in metrics ? (
            <div style={{ color: '#EF4444' }}>{metrics.error}</div>
          ) : (
            <ul>
              {Object.entries(metrics).map(([k, v]) => (
                <li key={k}><strong>{k}:</strong> {String(v)}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Modeling;
