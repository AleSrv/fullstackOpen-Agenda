import PropTypes from 'prop-types';

export const FormInput = ({
    type,
    name,
    value,
    onChange,
    placeholder,
    label,
    pattern,
    title
}) => {
    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                pattern={pattern}
                title={title}
                className="form-input"
                required
            />
        </div>
    );
};

FormInput.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    pattern: PropTypes.string,
    title: PropTypes.string
};