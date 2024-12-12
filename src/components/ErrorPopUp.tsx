import React from "react";


const ErrorPopUp = ({ errorMessage }) => {
    return (
        <div className="error">
            <h2>{errorMessage}</h2>
        </div>
    )
}

export default ErrorPopUp;