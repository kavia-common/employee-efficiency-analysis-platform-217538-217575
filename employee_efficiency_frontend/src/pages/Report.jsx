import React, { useState } from 'react';
import { downloadReportPDF, getApiBaseUrl } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * Report Page
 * Provides a button to download a PDF report from /report/pdf.
 */
function Report() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const download = async () => {
    setBusy(true);
    setError('');
    try {
      const blob = await downloadReportPDF();
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'employee_efficiency_report.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      setError('Failed to download report. Ensure backend is running at ' + getApiBaseUrl());
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Executive Report</h3>
      <p className="badge">Generates application/pdf from backend</p>
      {error && <div style={{ color: '#EF4444', marginBottom: 8 }}>{error}</div>}
      <button className="btn btn-primary" onClick={download} disabled={busy}>
        {busy ? 'Preparing…' : 'Download Report PDF'}
      </button>
      <div style={{ marginTop: 12 }}>
        <small style={{ color: '#64748b' }}>
          Backend endpoint: GET /report/pdf
        </small>
      </div>
    </div>
  );
}

export default Report;
