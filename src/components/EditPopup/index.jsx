import PropTypes from 'prop-types';
import { EditForm } from './EditForm';
import { useEditPopup } from './useEditPopup';
import './EditPopup.css';

const EditPopup = ({ contact, setActualContact, onSave, onClose }) => {
    const { handleSubmit } = useEditPopup({
        setActualContact,
        onSave,
        onClose
    });

    return (
        <div className="edit-popup-overlay">
            <div className="edit-popup">
                <div className="edit-popup-header">
                    <h3>Editar Contacto</h3>
                    <button
                        className="close-button"
                        onClick={onClose}
                        aria-label="Cerrar"
                    >
                        ×
                    </button>
                </div>

                <EditForm
                    contact={contact}
                    setActualContact={setActualContact}
                    onSubmit={handleSubmit}
                />

                <div className="edit-popup-footer">
                    <button
                        className="cancel-button"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

EditPopup.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired
    }).isRequired,
    setActualContact: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default EditPopup;