import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';

const DisplayedPersons = ({ displayedPersons }) => {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const popoverRef = useRef(null);

    const togglePopover = (person) => {
        setSelectedPerson(selectedPerson === person.posicion ? null : person.posicion);
    };

    // Función para manejar el clic fuera del popover
    const handleClickOutside = (event) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target)) {
            setSelectedPerson(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <ul style={{ position: 'relative' }}>
            {displayedPersons.map(person => (
                <li key={person.posicion} onClick={() => togglePopover(person)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
                    <strong>{person.posicion}- {person.name} {person.number}</strong>

                    {selectedPerson === person.posicion && (
                        <div ref={popoverRef} className="popoverDetails">
                            <h3>Detalles de {person.name}</h3>
                            <p><strong>Posición:</strong> {person.posicion}</p>
                            <p><strong>Teléfono:</strong> {person.number}</p>
                            <button onClick={() => setSelectedPerson(null)}>Cerrar</button>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

DisplayedPersons.propTypes = {
    displayedPersons: PropTypes.arrayOf(
        PropTypes.shape({
            posicion: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired
        })
    ).isRequired
};

export default DisplayedPersons;
