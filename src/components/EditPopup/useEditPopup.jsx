import { useEffect } from 'react';

export const useEditPopup = ({ onSave, onClose }) => {
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    const handleSubmit = async () => {
        await onSave();
    };

    return {
        handleSubmit
    };
};