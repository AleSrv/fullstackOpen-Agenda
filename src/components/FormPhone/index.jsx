import PropTypes from "prop-types";

import { FormContainer } from './FormContainer';
import { useFormPhone } from './useFormPhone';
import './FormPhone.css';

const FormPhone = ({ actualContact, setActualContact, handleSubmit, onClose }) => {
    const { handleChange, onSubmit } = useFormPhone({
        actualContact,
        setActualContact,
        handleSubmit,
    });

    return (
        <FormContainer
            actualContact={actualContact}
            handleChange={handleChange}
            onSubmit={onSubmit}
            onClose={onClose}
        />
    );
};

FormPhone.propTypes = {
    actualContact: PropTypes.object.isRequired,
    setActualContact: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired, // Definir como requerida
};

export default FormPhone;
