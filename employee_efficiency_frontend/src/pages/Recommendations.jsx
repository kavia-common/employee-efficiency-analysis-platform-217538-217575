import React, { useEffect, useState } from 'react';
import { fetchRecommendations } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * Recommendations Page
 * Retrieves and displays a list of recommendations.
 * Props:
 *  - queryString
 */
function Recommendations({ queryString }) {
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    const load = async () => {
      setBusy(true);
      try {
        const { data } = await fetchRecommendations(queryString);
        const recs = Array.isArray(data?.items) ? data.items : (Array.isArray(data) ? data : []);
        setItems(recs);
      } catch {
        setItems([]);
      } finally {
        setBusy(false);
      }
    };
    load();
  }, [queryString]);

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Recommendations</h3>
      {busy ? (
        <div>Loading…</div>
      ) : items.length === 0 ? (
        <div style={{ color: '#64748b' }}>No recommendations available.</div>
      ) : (
        <ul>
          {items.map((r, i) => (
            <li key={i}>{typeof r === 'string' ? r : JSON.stringify(r)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Recommendations;
