import React, { useState } from 'react';
import { uploadCSV } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * FileUploader
 * Allows uploading a CSV file and invokes onUploaded with server response.
 * Props:
 *  - onUploaded: function(responseData)
 */
function FileUploader({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please choose a CSV file.');
      return;
    }
    setError('');
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const { data } = await uploadCSV(fd);
      onUploaded?.(data);
    } catch (err) {
      setError(err?.response?.data?.detail || 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="card">
      <div className="form-group">
        <label htmlFor="csv">Upload CSV</label>
        <input id="csv" type="file" accept=".csv,text/csv"
               onChange={e => setFile(e.target.files?.[0] || null)} />
      </div>
      {error && <div style={{ color: '#EF4444', marginBottom: 8 }}>{error}</div>}
      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
}

export default FileUploader;
