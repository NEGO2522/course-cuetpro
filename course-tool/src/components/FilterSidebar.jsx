export default function FilterSidebar({ 
  searchTerm,
  setSearchTerm,
  uniqueColleges, 
  selectedCollege, 
  setSelectedCollege,
  categories,
  selectedCategory,
  setSelectedCategory
}) {
  return (
    <aside className="filters-sidebar">
      <div className="filters-card">
        
        <div className="filter-group">
          <label className="filter-label">Search</label>
          <div className="search-container">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search program or college..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <h3 className="filters-title" style={{marginTop: '32px'}}>Filters</h3>

        <div className="filter-group">
          <label className="filter-label">College</label>
          <div className="select-wrapper">
            <select 
              className="filter-select"
              value={selectedCollege} 
              onChange={(e) => setSelectedCollege(e.target.value)}
            >
              <option value="">All Colleges</option>
              {uniqueColleges.map((col, idx) => (
                <option key={idx} value={col}>{col}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Category Cutoff</label>
          <div className="select-wrapper">
            <select 
              className="filter-select"
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </aside>
  );
}
