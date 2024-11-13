import PropTypes from 'prop-types';


const DisplayedPersons = ({ displayedPersons }) => {

    return (
        <ul>
            {displayedPersons.map(person => (
                <li key={person.posicion}>
                    <strong>{person.posicion}- {person.name} {person.number}</strong>
                </li>
            ))}
        </ul>
    );
};

DisplayedPersons.propTypes = {
    displayedPersons: PropTypes.arrayOf(
        PropTypes.shape({
            posicion: PropTypes.number,
            name: PropTypes.string.isRequired, // name como string requerposiciono
            number: PropTypes.string.isRequired // number como string requerposiciono
        })
    ).isRequired
};

export default DisplayedPersons;