import PropTypes from 'prop-types';

export const ActionButton = ({ type, onClick, title, icon }) => {
    return (
        <img
            src={icon}
            alt={title}
            title={title}
            className={`action-icon ${type}-icon`}
            onClick={onClick}
        />
    );
};

ActionButton.propTypes = {
    type: PropTypes.oneOf(['edit', 'favorite']).isRequired,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};