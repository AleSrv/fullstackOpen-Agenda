import PropTypes from 'prop-types';

export default function FormPhone({ handleSubmit, newName, handleChange, inputRef, message, newPhone, phoneRef }) {
    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group" style={{ position: 'relative' }}>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    name="newName"
                    autoComplete="name"
                    value={newName}
                    onChange={handleChange}
                    ref={inputRef}
                />
                {message.activo && message.target === 'name' && (
                    <div className="popover">{message.mostrar}</div>
                )}
            </div>
            <div className="form-group" style={{ position: 'relative' }}>
                <label htmlFor="number">Number:</label>
                <input
                    id="number"
                    type="number"
                    name="newPhone"
                    autoComplete="tel"
                    max="999999999"
                    value={newPhone}
                    onChange={handleChange}
                    ref={phoneRef}
                />
                {message.activo && message.target === 'phone' && (
                    <div className="popover">{message.mostrar}</div>
                )}
            </div>
            <div>
                <button type="submit">Agregar</button>
            </div>
        </form>
    );
}

// Definición de las PropTypes
FormPhone.propTypes = {
    handleSubmit: PropTypes.func.isRequired,      // función para el evento onSubmit
    newName: PropTypes.string.isRequired,         // cadena de texto para el nombre
    handleChange: PropTypes.func,  // función para cambiar el nombre
    inputRef: PropTypes.oneOfType([               // referencia de React
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    message: PropTypes.shape({                    // objeto para mensajes
        activo: PropTypes.bool,
        target: PropTypes.string,
        mostrar: PropTypes.string
    }).isRequired,
    newPhone: PropTypes.oneOfType([               // número de teléfono como string o number
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    phoneRef: PropTypes.oneOfType([               // referencia de React
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ])
};
