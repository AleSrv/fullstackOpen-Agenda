import PropTypes from 'prop-types';

const ErrorPopup = ({ errorMessage }) => {
    return (
        <div className="error">
            {errorMessage}
        </div>
    )
}

ErrorPopup.propTypes = {
    errorMessage: PropTypes.string.isRequired
};

export default ErrorPopup;