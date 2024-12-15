import PropTypes from 'prop-types';
import FormPhone from '../FormPhone';

export const EditForm = ({ contact, setActualContact, onSubmit }) => {
    return (
        <div className="edit-form">
            <FormPhone
                actualContact={contact}
                setActualContact={setActualContact}
                handleSubmit={onSubmit}
            />
        </div>
    );
};

EditForm.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired
    }).isRequired,
    setActualContact: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};