import PropTypes from 'prop-types';
import { ContactActions } from './ContactActions';

export const ContactItem = ({
    contact,
    index,
    onDelete,
    onToggleFavorite,
    onEdit
}) => {
    return (
        <li className="contact-item">
            <div className="contact-info">
                <span className="contact-index">{index + 1}.</span>
                <span className="contact-name">{contact.name}</span>
                <span className="contact-separator">:</span>
                <span className="contact-phone">{contact.phone}</span>
            </div>

            <ContactActions
                contact={contact}
                onDelete={onDelete}
                onToggleFavorite={onToggleFavorite}
                onEdit={onEdit}
            />
        </li>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        favorite: PropTypes.bool.isRequired
    }).isRequired,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};