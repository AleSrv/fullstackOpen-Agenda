//src\components\Filter.jsx
import PropTypes from 'prop-types';


export default function Filter({ limpiar, searchName, setSearchName, handleSearch }) {


    return (
        <input
            type="text"
            placeholder="Buscar..."
            name='search'
            onChange={handleSearch}
            value={searchName}
            onBlur={() => limpiar(setSearchName)}
            style={{ marginTop: '10px', marginBottom: '10px' }}
        />
    )
}

Filter.propTypes = {
    limpiar: PropTypes.func.isRequired,       // validar como función
    searchName: PropTypes.string.isRequired,  // validar como string
    setSearchName: PropTypes.func.isRequired, // validar como función
    handleSearch: PropTypes.func.isRequired   // validar como función
};