//src\components\DisplayedPersons.jsx
import PropTypes from 'prop-types';



export default function DisplayedPersons({ handleDelete, filteredContacts }) {

    return (
        <ul>
            {filteredContacts.map((contact, index) => (
                <li key={contact.id}>
                    {index + 1}. {contact.name} - {contact.phone}
                    <button onClick={() => handleDelete(contact.id)}>Eliminar</button>
                </li>
            ))}
        </ul>
    );
};

DisplayedPersons.propTypes = {
    handleDelete: PropTypes.func.isRequired,
    filteredContacts: PropTypes.array
};
