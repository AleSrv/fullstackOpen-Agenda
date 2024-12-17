import React from 'react';
import { Contact } from '../types';

interface Props {
  contacts: Contact[];
  deleteContact: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export const ContactList: React.FC<Props> = ({
  contacts,
  deleteContact,
  toggleFavorite,
}) => {
  if (contacts.length === 0) {
    return (
      <div id='contacto'>
        No se encuentran contactos
      </div>
    );
  }

  return (
    <ul className="contact-list">
      {contacts
        .slice() // Crea una copia para evitar mutar el estado original
        .sort((a, b) => a.name.localeCompare(b.name)) // Ordena alfabéticamente por nombre
        .map((contact) => (
          <li key={contact.id} className="contact-item">
            <div className="contact-info">
              <div className="contact-name">{contact.name}</div>
              <div className="contact-number">{contact.number}</div>
            </div>
            <div className="contact-actions">
              <button
                onClick={() => toggleFavorite(contact.id)}
                className={`icon-button favorite ${contact.isFavorite ? 'active' : ''}`}
                title={contact.isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                {contact.isFavorite ? '★' : '☆'}
              </button>
              <button
                onClick={() => deleteContact(contact.id)}
                className="icon-button delete"
                title="Eliminar contacto"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
}  