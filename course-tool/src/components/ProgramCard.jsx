export default function ProgramCard({ program, onOpenModal }) {
  return (
    <div className="program-card">
      <div className="program-card-header">
        <h3 className="program-card-title">{program.program}</h3>
        <span className="program-card-badge">{program.category}</span>
      </div>
      
      <div className="program-card-stats">
        <div className="program-stat-col">
          <span className="stat-num blue-text">{program.colleges}</span>
          <span className="stat-desc">Colleges</span>
        </div>
        <div className="program-stat-col">
          <span className="stat-num green-text">{program.totalSeats}</span>
          <span className="stat-desc">Total Seats</span>
        </div>
        <div className="program-stat-col">
          <span className="stat-num orange-text">{program.topCutoff > 0 ? program.topCutoff.toFixed(1) : '-'}</span>
          <span className="stat-desc">Top Cutoff</span>
        </div>
      </div>
      
      <div className="program-card-actions">
        <div className="action-link">
          <span className="arrow-icon">›</span> View Eligibility Requirements
        </div>
      </div>
      
      <div className="program-card-footer" onClick={() => onOpenModal(program)}>
        <div className="footer-link">
          <span className="search-mini-icon">🔍</span> View Colleges (Seats/Cutoffs)
        </div>
        <span className="arrow-right">→</span>
      </div>
    </div>
  );
}
