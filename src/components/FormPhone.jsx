//src\components\FormPhone.jsx
import PropTypes from 'prop-types';
export default function FormPhone({ handleSubmit, setName, name, phone, setPhone }) {
    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <button type="submit">Agregar Contacto</button>
        </form>
    )
}

FormPhone.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    setName: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    setPhone: PropTypes.func.isRequired,
};
