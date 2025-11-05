import React, { useState } from 'react';
import { runANOVA } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * ANOVA Page
 * Runs ANOVA test and displays F-statistic and p-value.
 * Props:
 *  - queryString
 */
function ANOVA({ queryString }) {
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    setBusy(true);
    try {
      const { data } = await runANOVA(queryString);
      setResult(data);
    } catch {
      setResult({ error: 'Failed to run ANOVA' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h3 style={{ marginTop: 0 }}>ANOVA Test</h3>
        <p className="badge">Uses current filters</p>
        <button className="btn btn-primary" onClick={run} disabled={busy}>
          {busy ? 'Running…' : 'Run ANOVA'}
        </button>
      </div>

      {result && (
        <div className="card">
          <h4 style={{ marginTop: 0 }}>Results</h4>
          {'error' in result ? (
            <div style={{ color: '#EF4444' }}>{result.error}</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="item">
                <div className="value">{result?.f_stat ?? '-'}</div>
                <div className="label">F-statistic</div>
              </div>
              <div className="item">
                <div className="value">{result?.p_value ?? '-'}</div>
                <div className="label">p-value</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ANOVA;
