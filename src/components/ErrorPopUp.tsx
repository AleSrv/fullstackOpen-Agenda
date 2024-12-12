import React from "react";


const ErrorPopUp = ({ errorMessage }) => {
    return (
        <div className="error">
            {errorMessage}
        </div>
    )
}

export default ErrorPopUp;