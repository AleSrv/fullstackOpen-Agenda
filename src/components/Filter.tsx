import React from 'react';
import { FilterType } from '../types';

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
}

export const Filter: React.FC<Props> = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
}) => {
  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name or number..."
        className="search-input"
      />
      <div style={{ marginTop: '1rem' }}>
        <button
          className={`button ${filterType === 'all' ? 'active' : ''}`}
          onClick={() => setFilterType('all')}
          style={{ marginRight: '0.5rem' }}
        >
          All Contacts
        </button>
        <button
          className={`button ${filterType === 'favorites' ? 'active' : ''}`}
          onClick={() => setFilterType('favorites')}
        >
          Favorites
        </button>
      </div>
    </div>
  );
};