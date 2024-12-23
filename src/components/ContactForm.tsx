import React, { useState } from 'react';

interface Props {
  addContact: (name: string, number: string) => void;
}

export const ContactForm: React.FC<Props> = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addContact(name, number);
    setName('');
    setNumber('');
  };

  return (
    <div className="form-container">
      <h2>Agregar nuevo contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="number">Teléfono</label>
          <input
            type="tel"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="button">
          Agregar contacto
        </button>
      </form>
    </div>
  );
};