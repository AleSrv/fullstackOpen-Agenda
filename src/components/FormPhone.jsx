import PropTypes from 'prop-types';
export default function FormPhone({ handleSubmit, setName, name, phone, setPhone, setShowSave }) {

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input
                type="text"
                placeholder="Ingrese un nombre ..."
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Ingrese un teléfono ..."
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <div className="form-buttons">
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowSave(false);
                    }}
                >
                    Cancelar
                </button>
                <button type="submit">Guardar</button>
            </div>
        </form>
    );
}

FormPhone.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    setName: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    setPhone: PropTypes.func.isRequired,
    setShowSave: PropTypes.func.isRequired
};
