import React, { useEffect, useState } from 'react';
import FileUploader from '../components/FileUploader';
import DataPreview from '../components/DataPreview';
import { fetchPreview } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * UploadClean Page
 * Upload CSV and show preview table from backend.
 * Props:
 *  - filters
 *  - queryString
 */
function UploadClean({ queryString }) {
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPreview = async () => {
    setLoading(true);
    try {
      const { data } = await fetchPreview(queryString);
      // expecting data.rows
      setPreview(Array.isArray(data?.rows) ? data.rows : (Array.isArray(data) ? data : []));
    } catch (e) {
      setPreview([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <FileUploader onUploaded={() => loadPreview()} />
      {loading ? <div className="card">Loading preview…</div> : <DataPreview rows={preview} title="Data Preview" />}
    </div>
  );
}

export default UploadClean;
