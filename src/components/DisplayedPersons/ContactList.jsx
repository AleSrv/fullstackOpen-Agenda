import PropTypes from 'prop-types';
import { ContactItem } from './ContactItem';

export const ContactList = ({ contacts, onDelete, onToggleFavorite, onEdit }) => {
  return (
    <ul className="contact-list">
      {contacts.map((contact, index) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          index={index}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      favorite: PropTypes.bool.isRequired
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};