export default function DataCard({ item, selectedCategory }) {
  const cutoff = item.cutoffs[selectedCategory] || 'NA';
  
  return (
    <div className="data-card">
      <div className="card-header">
        <div className="card-titles">
          <h2 className="card-title">{item.program}</h2>
          <div className="card-subtitle">{item.college}</div>
        </div>
        <div className="cutoff-badge">
          <span className="cutoff-label">{selectedCategory} Cutoff</span>
          <span className="cutoff-score">{cutoff !== 'NA' ? cutoff : '-'}</span>
        </div>
      </div>
      
      <div className="stats-divider"></div>
      
      <div className="stats-grid">
        <div className="stat-item highlight-stat">
          <span className="stat-label">Total Seats</span>
          <span className="stat-value">{item.seats?.Total || 'NA'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">UR</span>
          <span className="stat-value">{item.seats?.UR || 'NA'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">OBC</span>
          <span className="stat-value">{item.seats?.OBC || 'NA'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">SC</span>
          <span className="stat-value">{item.seats?.SC || 'NA'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">ST</span>
          <span className="stat-value">{item.seats?.ST || 'NA'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">EWS</span>
          <span className="stat-value">{item.seats?.EWS || 'NA'}</span>
        </div>
      </div>
    </div>
  );
}
