import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import EyeButton from './EyeButton';
import EditButton from './EditButton';
import CloseButton from './CloseButton';
import DeleteButton from './DeleteButton';

const DisplayedPersons = ({ displayedPersons }) => {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const popoverRef = useRef(null);

    const togglePopover = (person) => {
        setSelectedPerson(selectedPerson === person.posicion ? null : person.posicion);
    };

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
                <li
                    key={person.posicion}
                    onClick={() => togglePopover(person)}
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }}
                >
                    <strong style={{ marginRight: '10px', display: 'inline-flex', alignItems: 'center' }}>
                        {person.posicion} - {person.name} {person.number}
                    </strong>
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <EyeButton />
                    </div>

                    {selectedPerson === person.posicion && (
                        <div ref={popoverRef} className="popoverDetails" style={{ marginLeft: '20px' }}>
                            <h3>Detalles de {person.name}</h3>
                            <p><strong>Posición:</strong> {person.posicion}</p>
                            <p><strong>Teléfono:</strong> {person.number}</p>
                            <div>
                                <button
                                    style={{ display: 'inline-flex', alignItems: 'center', margin: "5px" }}
                                >
                                    <EditButton />
                                    Editar
                                </button>
                                <button
                                    onClick={() => setSelectedPerson(null)}
                                    style={{ display: 'inline-flex', alignItems: 'center', margin: "5px" }}

                                >
                                    <CloseButton />
                                    Cerrar
                                </button>
                                <button
                                    onClick={() => setSelectedPerson(null)}
                                    style={{ display: 'inline-flex', alignItems: 'center', margin: "5px" }}

                                >
                                    <DeleteButton />
                                    Borrar
                                </button>
                            </div>
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
