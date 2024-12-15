export const useFormPhone = ({ actualContact, setActualContact, handleSubmit }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setActualContact(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit();
    };

    return {
        handleChange,
        onSubmit
    };
};