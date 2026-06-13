import { useState, useMemo } from 'react';
import './index.css';
import rawData from './data/colleges.json';
import { groupPrograms } from './utils';

import HeroSection from './components/HeroSection';
import ProgramCard from './components/ProgramCard';
import ProgramModal from './components/ProgramModal';

const CATEGORIES = [
  "Languages", 
  "Arts & Social Sciences", 
  "Science, Math & Tech", 
  "Commerce & Management", 
  "Music & Fine Arts", 
  "Vocational", 
  "Education"
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [selectedProgram, setSelectedProgram] = useState(null);
  
  const groupedPrograms = useMemo(() => groupPrograms(rawData), []);

  const filteredAndSorted = useMemo(() => {
    let result = groupedPrograms.filter(p => {
      const matchSearch = p.program.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = activeCategory ? p.category === activeCategory : true;
      return matchSearch && matchCategory;
    });

    if (sortOrder === 'A-Z') {
      result.sort((a, b) => a.program.localeCompare(b.program));
    } else if (sortOrder === 'Z-A') {
      result.sort((a, b) => b.program.localeCompare(a.program));
    } else if (sortOrder === 'Seats: High to Low') {
      result.sort((a, b) => b.totalSeats - a.totalSeats);
    } else if (sortOrder === 'Cutoff: High to Low') {
      result.sort((a, b) => b.topCutoff - a.topCutoff);
    }

    return result;
  }, [groupedPrograms, searchTerm, activeCategory, sortOrder]);

  return (
    <div className="app-container">
      <HeroSection />
      
      <main className="container main-content programs-layout">
        <div className="controls-row">
          <div className="search-container-large">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            className="sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="A-Z">Sort: A-Z</option>
            <option value="Z-A">Sort: Z-A</option>
            <option value="Seats: High to Low">Seats: High to Low</option>
            <option value="Cutoff: High to Low">Cutoff: High to Low</option>
          </select>
        </div>

        <div className="category-filters">
          <h4 className="filter-heading">Filter by Category</h4>
          <div className="pills-container">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                className={`pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="showing-text">
          Showing {filteredAndSorted.length} programs
        </div>

        <div className="programs-grid">
          {filteredAndSorted.length > 0 ? (
            filteredAndSorted.map((prog, idx) => (
              <ProgramCard key={idx} program={prog} onOpenModal={setSelectedProgram} />
            ))
          ) : (
            <div className="no-results">
              No programs found matching your criteria.
            </div>
          )}
        </div>
      </main>

      {selectedProgram && (
        <ProgramModal 
          program={selectedProgram} 
          onClose={() => setSelectedProgram(null)} 
        />
      )}
    </div>
  );
}

export default App;
