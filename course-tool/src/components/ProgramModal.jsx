import { useState } from 'react';

export default function ProgramModal({ program, onClose }) {
  const [view, setView] = useState('Cutoffs'); // 'Seats' or 'Cutoffs'

  if (!program) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Colleges offering {program.program}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-controls">
          <span className="view-label">View:</span>
          <div className="toggle-switch">
            <button 
              className={`toggle-btn ${view === 'Seats' ? 'active' : ''}`}
              onClick={() => setView('Seats')}
            >
              📊 Seats
            </button>
            <button 
              className={`toggle-btn ${view === 'Cutoffs' ? 'active' : ''}`}
              onClick={() => setView('Cutoffs')}
            >
              📈 Cutoffs
            </button>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>College</th>
                <th>UR</th>
                <th>OBC</th>
                <th>SC</th>
                <th>ST</th>
                <th>EWS</th>
                <th>PwBD</th>
              </tr>
            </thead>
            <tbody>
              {program.records.map((record, idx) => {
                const isWomenCollege = record.college.toLowerCase().includes('(w)') || record.college.toLowerCase().includes('women');
                const cleanCollegeName = record.college.replace(/\s*\(W\)\s*/i, ' ');

                return (
                  <tr key={idx}>
                    <td style={{ textAlign: 'left' }}>
                      {cleanCollegeName}
                      {isWomenCollege && <span className="women-badge">Women</span>}
                    </td>
                    {view === 'Cutoffs' ? (
                      <>
                        <td>{record.cutoffs?.UR !== "NA" ? record.cutoffs.UR : '—'}</td>
                        <td>{record.cutoffs?.OBC !== "NA" ? record.cutoffs.OBC : '—'}</td>
                        <td>{record.cutoffs?.SC !== "NA" ? record.cutoffs.SC : '—'}</td>
                        <td>{record.cutoffs?.ST !== "NA" ? record.cutoffs.ST : '—'}</td>
                        <td>{record.cutoffs?.EWS !== "NA" ? record.cutoffs.EWS : '—'}</td>
                        <td>{record.cutoffs?.PwBD !== "NA" ? record.cutoffs.PwBD : '—'}</td>
                      </>
                    ) : (
                      <>
                        <td>{record.seats?.UR !== "NA" ? record.seats.UR : '—'}</td>
                        <td>{record.seats?.OBC !== "NA" ? record.seats.OBC : '—'}</td>
                        <td>{record.seats?.SC !== "NA" ? record.seats.SC : '—'}</td>
                        <td>{record.seats?.ST !== "NA" ? record.seats.ST : '—'}</td>
                        <td>{record.seats?.EWS !== "NA" ? record.seats.EWS : '—'}</td>
                        <td>{record.seats?.PwBD !== "NA" ? record.seats.PwBD : '—'}</td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="warning-alert">
          💡 2025 cutoffs are approximate and may contain mapping errors (based on the lowest score across all rounds)
        </div>
      </div>
    </div>
  );
}
