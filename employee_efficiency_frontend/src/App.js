import React, { useMemo, useState } from 'react';
import './App.css';
import SidebarFilters from './components/SidebarFilters';
import UploadClean from './pages/UploadClean';
import EDA from './pages/EDA';
import ANOVA from './pages/ANOVA';
import Modeling from './pages/Modeling';
import Clustering from './pages/Clustering';
import Recommendations from './pages/Recommendations';
import Report from './pages/Report';

// Simple local router state for tabs
const tabs = [
  { id: 'upload', label: 'Upload & Clean' },
  { id: 'eda', label: 'EDA' },
  { id: 'anova', label: 'ANOVA' },
  { id: 'modeling', label: 'Modeling' },
  { id: 'clustering', label: 'Clustering' },
  { id: 'recommendations', label: 'Recommendations' },
  { id: 'report', label: 'Report' },
];

/**
 * PUBLIC_INTERFACE
 * App shell containing top navigation, sidebar filters, and content area.
 * Keeps filters state and passes them down to pages as query params.
 */
function App() {
  const [active, setActive] = useState('upload');
  const [filters, setFilters] = useState({
    department: '',
    minExp: '',
    maxExp: '',
    workMode: '',
  });

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (filters.department) params.set('department', filters.department);
    if (filters.minExp !== '') params.set('min_exp', filters.minExp);
    if (filters.maxExp !== '') params.set('max_exp', filters.maxExp);
    if (filters.workMode) params.set('work_mode', filters.workMode);
    return params.toString();
  }, [filters]);

  const renderPage = () => {
    const pageProps = { filters, queryString: query };
    switch (active) {
      case 'upload':
        return <UploadClean {...pageProps} />;
      case 'eda':
        return <EDA {...pageProps} />;
      case 'anova':
        return <ANOVA {...pageProps} />;
      case 'modeling':
        return <Modeling {...pageProps} />;
      case 'clustering':
        return <Clustering {...pageProps} />;
      case 'recommendations':
        return <Recommendations {...pageProps} />;
      case 'report':
        return <Report {...pageProps} />;
      default:
        return <UploadClean {...pageProps} />;
    }
  };

  return (
    <div className="app-shell">
      <div className="topbar">
        <div className="brand">Employee Efficiency</div>
        <div className="tabs" role="tablist" aria-label="Dashboard Tabs">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`tab ${active === t.id ? 'active' : ''}`}
              role="tab"
              aria-selected={active === t.id}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="actions">
          <a className="btn" href="https://vscode-internal-21406-beta.beta01.cloud.kavia.ai:3001/docs" target="_blank" rel="noreferrer">API Docs</a>
        </div>
      </div>

      <div className="main">
        <aside className="sidebar" aria-label="Filters Sidebar">
          <h4 className="section-title">Filters</h4>
          <SidebarFilters value={filters} onChange={setFilters} />
        </aside>
        <main className="content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
