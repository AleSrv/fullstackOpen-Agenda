import PropTypes from 'prop-types';

export default function DisplayedPersons({ handleDelete, filteredContacts, toggleFavorite }) {
    return (
        <ul>
            {filteredContacts.map((contact, index) => (
                <li key={contact.id}>
                    {index + 1}. {contact.name} : {contact.phone}
                    <img
                        src={contact.favorite ? '/favorite.svg' : '/star.svg'}
                        alt={contact.favorite ? 'Favorito' : 'Normal'}
                        style={{ width: '20px', height: '20px', marginLeft: '10px', cursor: 'pointer' }}
                        onClick={() => toggleFavorite(contact.id)}
                    />
                    <button onClick={() => handleDelete(contact.id)}>Eliminar</button>
                </li>
            ))}
        </ul>
    );
}

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
    ).isRequired
};
