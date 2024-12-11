import PropTypes from 'prop-types';

export default function DisplayedPersons({ handleDelete, filteredContacts, toggleFavorite, handleEdit }) {
    return (
        <ul>
            {filteredContacts.map((contact, index) => (
                <li key={contact.id}>
                    {index + 1}. {contact.name} : {contact.phone}

                    {/* Ícono de editar */}
                    <img
                        src="/edit.svg"
                        alt="Editar"
                        title="Editar"
                        className="icon-edit"
                        onClick={() => handleEdit(contact.id)}  // Llamamos a handleEdit para abrir el popup
                    />

                    {/* Ícono de favorito */}
                    <img
                        src={contact.favorite ? '/favorite.svg' : '/star.svg'}
                        alt={contact.favorite ? 'Favorito' : 'Normal'}
                        className={contact.favorite ? 'icon-favorite active' : 'icon-favorite'}
                        onClick={() => toggleFavorite(contact.id)}
                    />

                    {/* Botón de eliminar */}
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
    ).isRequired,
    handleEdit: PropTypes.func.isRequired,  // Asegúrate de que la función handleEdit sea pasada como prop
};
