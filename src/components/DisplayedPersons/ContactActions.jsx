import PropTypes from 'prop-types';
import { ActionButton } from './ActionButton';

export const ContactActions = ({
    contact,
    onDelete,
    onToggleFavorite,
    onEdit
}) => {
    return (
        <div className="contact-actions">
            <ActionButton
                type="edit"
                onClick={() => onEdit(contact.id)}
                title="Editar contacto"
                icon="/edit.svg"
            />

            <ActionButton
                type="favorite"
                onClick={() => onToggleFavorite(contact.id)}
                title={contact.favorite ? 'Eliminar de Favorito' : 'Agregar a favorito'}
                icon={contact.favorite ? '/favorite.svg' : '/star.svg'}
            />

            <button
                className="delete-button"
                onClick={() => onDelete(contact.id)}
                title="Eliminar contacto"
            >
                Eliminar
            </button>
        </div>
    );
};

ContactActions.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.string.isRequired,
        favorite: PropTypes.bool.isRequired
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};