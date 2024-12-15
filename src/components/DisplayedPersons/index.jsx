import PropTypes from 'prop-types';
import { ContactList } from './ContactList';
import './DisplayedPersons.css';

const DisplayedPersons = ({
    handleDelete,
    filteredContacts,
    toggleFavorite,
    handleEdit
}) => {
    if (!filteredContacts.length) {
        return <p className="no-contacts">No hay contactos</p>;
    }

    return (
        <ContactList
            contacts={filteredContacts}
            onDelete={handleDelete}
            onToggleFavorite={toggleFavorite}
            onEdit={handleEdit}
        />
    );
};

DisplayedPersons.propTypes = {
    handleDelete: PropTypes.func.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    filteredContacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            phone: PropTypes.string.isRequired,
            favorite: PropTypes.bool.isRequired
        })
    ).isRequired,
    handleEdit: PropTypes.func.isRequired,
};

export default DisplayedPersons;