import PropTypes from 'prop-types';



export default function CamposOrden({ isSorted, handleSortChange }) {
    return (
        <fieldset>
            <legend>Opciones de Ordenamiento</legend>
            <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="checkbox"
                    checked={isSorted}
                    onChange={handleSortChange}
                />
                Ordenar alfabéticamente
            </label>
        </fieldset>
    );
}

CamposOrden.propTypes = {
    isSorted: PropTypes.bool,
    handleSortChange: PropTypes.func
}