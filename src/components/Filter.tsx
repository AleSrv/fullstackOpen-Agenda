import React from 'react';
import { FilterType } from '../types';
import './components.css'

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
        placeholder="Buscar por nombre o teléfono..."
        className="search-input"
      />
      <div className='todos'>
        <button
          id='todos'
          className={`button ${filterType === 'all' ? 'active' : ''}`}
          onClick={() => setFilterType('all')}
          style={{ marginRight: '0.5rem' }}
        >
          Todos
        </button>
        <button
          className={`button ${filterType === 'favorites' ? 'active' : ''}`}
          onClick={() => setFilterType('favorites')}
        >
          Favoritos
        </button>
      </div>
    </div>
  );
};