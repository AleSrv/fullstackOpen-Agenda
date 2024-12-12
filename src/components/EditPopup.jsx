import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const EditPopup = ({ contact, onClose, onSave }) => {
    const [localContact, setLocalContact] = useState(contact);

    useEffect(() => {
        setLocalContact(contact);
    }, [contact]);

    const handleSave = () => {
        onSave(localContact);
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Editar Contacto</h2>
                <input
                    type="text"
                    value={localContact.name}
                    onChange={(e) =>
                        setLocalContact({ ...localContact, name: e.target.value })
                    }
                />
                <input
                    type="text"
                    value={localContact.phone}
                    onChange={(e) =>
                        setLocalContact({ ...localContact, phone: e.target.value })
                    }
                />
                <button onClick={handleSave}>Guardar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};


EditPopup.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        favorite: PropTypes.bool,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default EditPopup;
