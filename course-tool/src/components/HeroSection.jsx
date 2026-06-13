import React, { useMemo } from 'react';
import data from '../data/colleges.json';

export default function HeroSection() {
  const stats = useMemo(() => {
    const uniquePrograms = new Set(data.map(item => item.program)).size;
    const uniqueColleges = new Set(data.map(item => item.college)).size;
    const totalSeats = data.reduce((acc, item) => {
      const seats = item.seats?.Total;
      return acc + (typeof seats === 'number' ? seats : 0);
    }, 0);
    
    return {
      programs: uniquePrograms,
      colleges: uniqueColleges,
      seats: totalSeats.toLocaleString('en-IN'),
      categories: 7 // UR, OBC, SC, ST, EWS, PwBD, Minority
    };
  }, []);

  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero-title">CUET (DU): All Programs, Colleges, Seats & Cutoffs</h1>
        <p className="hero-subtitle">
          Explore all Delhi University programs and colleges. Browse by category, search by name, and view detailed seat allocation and previous year cutoffs.
        </p>
        
        <div className="stats-cards-container">
          <div className="stat-card">
            <div className="stat-card-value">{stats.programs}</div>
            <div className="stat-card-label">Programs</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-value">{stats.colleges}</div>
            <div className="stat-card-label">Colleges</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-value">{stats.seats}</div>
            <div className="stat-card-label">Total Seats</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-value">{stats.categories}</div>
            <div className="stat-card-label">Categories</div>
          </div>
        </div>
      </div>
    </section>
  );
}
