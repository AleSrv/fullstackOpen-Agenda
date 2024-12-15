import PropTypes from "prop-types";
import { FormInput } from "./FormInput";

export const FormContainer = ({ actualContact, handleChange, onSubmit, onClose }) => {
    return (
        <form onSubmit={onSubmit} className="form-phone">
            <FormInput
                type="text"
                name="name"
                value={actualContact.name}
                onChange={handleChange}
                placeholder="Nombre"
                label="Nombre"
            />
            <FormInput
                type="tel"
                name="phone"
                value={actualContact.phone}
                onChange={handleChange}
                placeholder="Teléfono"
                label="Teléfono"
                pattern="[6-9]\d{8}"
                title="El teléfono debe comenzar con 6, 7, 8 o 9 y tener 9 dígitos"
            />
            <div className="form-buttons">
                <button type="submit" className="form-submit">
                    Guardar
                </button>
                <button
                    type="button"
                    className="form-cancel"
                    onClick={onClose}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};



FormContainer.propTypes = {
    actualContact: PropTypes.shape({
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired // Asegúrate de definir esta prop como requerida
};
