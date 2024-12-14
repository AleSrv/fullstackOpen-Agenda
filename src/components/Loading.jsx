
const Loading = () => {
    const spinnerStyle = {
        width: '50px',
        height: '50px',
        border: '5px solid rgba(0, 0, 0, 0.1)',
        borderTop: '5px solid #3498db', // Color del borde animado
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Tamaño total de la pantalla (ajústalo según tus necesidades)
    };

    return (
        <div style={containerStyle}>
            <div style={spinnerStyle}></div>
            <style>
                {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
            </style>
        </div>
    );
};

export default Loading;
