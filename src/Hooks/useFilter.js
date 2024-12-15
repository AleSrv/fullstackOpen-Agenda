import { useState, useEffect } from 'react';

export const useFilter = () => {
  const [filter, setFilter] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [favorites, setFavorites] = useState(false);

  useEffect(() => {
    if (!showSearch) {
      setFilter('');
    }
  }, [showSearch]);

  const filterContacts = (contacts) => {
    return contacts
      .filter(contact => {
        const lowerCaseFilter = filter.toLowerCase();
        // Verificar si el filtro coincide con el nombre o el teléfono
        return (
          contact.name.toLowerCase().includes(lowerCaseFilter) || 
          contact.phone.includes(filter)
        );
      })
      .filter(contact => (favorites ? contact.favorite : true));
  };

  return {
    filter,
    setFilter,
    showSearch,
    setShowSearch,
    favorites,
    setFavorites,
    filterContacts,
  };
};
