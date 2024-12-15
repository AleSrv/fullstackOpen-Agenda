import { useState } from "react";
import "./styles/loading.css";
import "./styles/App.css";
import DisplayedPersons from "./components/DisplayedPersons";
import EditPopup from "./components/EditPopup";
import Loading from "./components/Loading";
import { motion, AnimatePresence } from "framer-motion";
import { validateAndPrepareContact } from "./utils/contactUtils";
import { useContacts } from "./hooks/useContacts";
import { useFilter } from "./hooks/useFilter";
import FormPhone from "./components/FormPhone";

const App = () => {
  const [actualContact, setActualContact] = useState({ name: "", phone: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [showSave, setShowSave] = useState(false);

  const {
    contacts,
    loading,
    addContact,
    updateContact,
    deleteContact,
    toggleFavorite,
    setIsError,
    setErrorMessage
  } = useContacts();

  const {
    filter,
    setFilter,
    showSearch,
    setShowSearch,
    filterContacts
  } = useFilter();

  const displayedContacts = filterContacts(contacts);

  const handleValidationError = (result) => {
    if (result.error) {
      setErrorMessage(result.error);
      setIsError(true);
      return true;
    }
    return false;
  };

  const handleAddContact = async () => {
    const result = validateAndPrepareContact({ ...actualContact, contacts });

    if (result.error) {
      setErrorMessage(result.error);
      setIsError(true);
      return;
    }

    if (result.conflict) {
      const confirmName = window.confirm(
        `El teléfono ${result.contact.phone} ya existe con el contacto: ${contacts.find(c => c.id === result.contact.id).name}.\n¿Desea sobrescribir el nombre?`
      );

      if (!confirmName) {
        setErrorMessage("No se sobrescribió el nombre.");
        setIsError(true);
        return;
      }
    }

    const response = result.contact.id
      ? await updateContact(result.contact.id, result.contact)
      : await addContact(result.contact);

    if (response.success) {
      setActualContact({ name: "", phone: "" });
      setShowSave(false);
    }
  };


  const handleSaveEdit = async () => {
    const result = validateAndPrepareContact({
      ...actualContact,
      id: actualContact.id,
      contacts
    });
    if (handleValidationError(result)) return;

    const response = await updateContact(result.contact.id, result.contact);
    if (response.success) {
      setIsEditing(false);
      setActualContact({ name: "", phone: "" });
    }
  };

  const handleEdit = (id) => {
    const contactToEdit = contacts.find(contact => contact.id === id);
    if (!contactToEdit) return;
    setActualContact(contactToEdit);
    setIsEditing(true);
  };

  if (loading) {
    return <Loading />;
  }

  //Cerrar formulario crear contacto
  const handleCloseForm = () => {
    setActualContact({ name: "", phone: "" });
    setShowSave(false); // Esto también cerrará el formulario visualmente
  };

  return (
    <div>
      <h1>Agenda Telefónica <small>(v.2.0)</small></h1>

      <div className="actions-container">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="action-button"
        >
          {showSearch ? "🔍 Ocultar búsqueda" : "🔍 Buscar contacto"}
        </button>

        <button
          onClick={() => setShowSave(!showSave)}
          className="action-button"
        >
          {showSave ? "Ocultar formulario" : "💾 Nuevo contacto"}
        </button>
      </div>

      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="form-container"
          >
            <div className="search-container">
              <input
                type="text"
                placeholder="Ingrese nombre para buscar..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="search-input"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isEditing && (
        <EditPopup
          contact={actualContact}
          setActualContact={setActualContact}
          onSave={handleSaveEdit}
          onClose={() => setIsEditing(false)}
        />
      )}

      {showSave && (
        <FormPhone
          actualContact={actualContact}
          setActualContact={setActualContact}
          handleSubmit={handleAddContact}
          onClose={handleCloseForm} // Pasar handleCloseForm aquí
        />
      )}

      {displayedContacts.length > 0 ? (
        <DisplayedPersons
          handleDelete={deleteContact}
          filteredContacts={displayedContacts}
          toggleFavorite={toggleFavorite}
          handleEdit={handleEdit}
        />
      ) : (
        <p className="no-contacts">No hay contactos</p>
      )}
    </div>
  );
};

export default App;