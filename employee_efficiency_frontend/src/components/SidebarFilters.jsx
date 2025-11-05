import React from 'react';

/**
 * PUBLIC_INTERFACE
 * SidebarFilters
 * Renders filter controls: Department, Experience range, Work Mode.
 * Props:
 *  - value: { department, minExp, maxExp, workMode }
 *  - onChange: function(updated)
 */
function SidebarFilters({ value, onChange }) {
  const handle = (key, val) => onChange({ ...value, [key]: val });

  return (
    <div>
      <div className="form-group">
        <label htmlFor="dept">Department</label>
        <select id="dept" value={value.department} onChange={e => handle('department', e.target.value)}>
          <option value="">All</option>
          <option>Engineering</option>
          <option>Sales</option>
          <option>Marketing</option>
          <option>HR</option>
          <option>Finance</option>
          <option>Operations</option>
        </select>
      </div>

      <div className="form-group">
        <label>Experience (years)</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input type="number" placeholder="Min" value={value.minExp}
                 onChange={e => handle('minExp', e.target.value)} />
          <input type="number" placeholder="Max" value={value.maxExp}
                 onChange={e => handle('maxExp', e.target.value)} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="wm">Work Mode</label>
        <select id="wm" value={value.workMode} onChange={e => handle('workMode', e.target.value)}>
          <option value="">All</option>
          <option>Remote</option>
          <option>Hybrid</option>
          <option>Onsite</option>
        </select>
      </div>

      <hr />

      <p className="badge">Filters are applied to pages that support them</p>
    </div>
  );
}

export default SidebarFilters;
