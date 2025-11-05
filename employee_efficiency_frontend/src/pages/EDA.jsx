import React, { useEffect, useState } from 'react';
import { fetchEDA, fetchScatter } from '../services/api';
import SimpleBarChart from '../components/charts/SimpleBarChart';
import SimpleScatter from '../components/charts/SimpleScatter';

/**
 * PUBLIC_INTERFACE
 * EDA Page
 * Shows summary KPIs and charts from backend EDA endpoints.
 * Props:
 *  - queryString
 */
function EDA({ queryString }) {
  const [summary, setSummary] = useState({ kpis: {}, bar: [], scatter: [] });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [{ data: s }, { data: sc }] = await Promise.all([
        fetchEDA(queryString),
        fetchScatter(queryString),
      ]);
      const kpis = s?.kpis || {};
      const bar = Array.isArray(s?.bar) ? s.bar : [];
      const scatter = Array.isArray(sc?.points) ? sc.points : [];
      setSummary({ kpis, bar, scatter });
    } catch {
      setSummary({ kpis: {}, bar: [], scatter: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {loading ? (
        <div className="card">Loading EDA…</div>
      ) : (
        <>
          <div className="kpi">
            <div className="item">
              <div className="value">{summary.kpis?.employees ?? '-'}</div>
              <div className="label">Employees</div>
            </div>
            <div className="item">
              <div className="value">{summary.kpis?.avg_efficiency ?? '-'}</div>
              <div className="label">Avg Efficiency</div>
            </div>
            <div className="item">
              <div className="value">{summary.kpis?.avg_experience ?? '-'}</div>
              <div className="label">Avg Experience</div>
            </div>
            <div className="item">
              <div className="value">{summary.kpis?.departments ?? '-'}</div>
              <div className="label">Departments</div>
            </div>
          </div>

          <SimpleBarChart data={summary.bar} />
          <SimpleScatter data={summary.scatter} xLabel="Experience" yLabel="Efficiency" />
        </>
      )}
    </div>
  );
}

export default EDA;
