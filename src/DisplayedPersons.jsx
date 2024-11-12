import PropTypes from 'prop-types';


const DisplayedPersons = ({ displayedPersons }) => {

    return (
        <ul>
            {displayedPersons.map(person => (
                <li key={person.id}>
                    <strong>{person.id}- {person.name} {person.number}</strong>
                </li>
            ))}
        </ul>
    );
};

DisplayedPersons.propTypes = {
    displayedPersons: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string.isRequired, // name como string requerido
            number: PropTypes.string.isRequired // number como string requerido
        })
    ).isRequired
};

export default DisplayedPersons;