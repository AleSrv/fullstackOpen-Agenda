//src\App.jsx
import { useState } from "react";
import "./styles/loading.css";
import "./styles/App.css";
import DisplayedPersons from "./components/DisplayedPersons";
import EditPopup from "./components/EditPopup";
import Loading from "./components/Loading";
import { motion, AnimatePresence } from "framer-motion";
import { validateAndPrepareContact } from "./utils/contactUtils";
import FormPhone from "./components/FormPhone";
import { useFilter } from "./Hooks/useFilter";
import { useContacts } from "./hooks/useContacts";

const App = () => {
  const [actualContact, setActualContact] = useState({ name: "", phone: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [order, setOrder] = useState(false); // checkbox Orden alfabético
  const [favorites, setFavorites] = useState(false); // checkbox favoritos 

  const {
    contacts,
    loading,
    addContact,
    updateContact,
    deleteContact,
    toggleFavorite,
    setIsError,
    setErrorMessage
  } = useContacts

  const {
    filter,
    setFilter,
    showSearch,
    setShowSearch,
    filterContacts
  } = useFilter()

  let displayedContacts = filterContacts(contacts);

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

  //Cerrar formulario al crear contacto
  const handleCloseForm = () => {
    setActualContact({ name: "", phone: "" });
    setShowSave(false); // Esto también cerrará el formulario visualmente
  };

  const handleCheckboxChange = (e) => {
    setOrder(e.target.checked);  // Según checked guardo en state order
  };

  const handleCheckboxFavorite = (e) => {
    setFavorites(e.target.checked)
  }

  // Filtrar contactos por nombre y por favoritos
  const filteredContacts = contacts
    .filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase())) // Filtro por nombre
    .filter(contact => (favorites ? contact.favorite : true)); // Filtro por favoritos


  // Ordenar contactos si el checkbox está activo
  displayedContacts = order
    ? [...filteredContacts].sort((a, b) => a.name.localeCompare(b.name))
    : filteredContacts;

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

      <h2>Listado de Contactos:</h2>
      <label>
        Orden alfabético
        <input
          type="checkbox"
          name="order"
          id="order"
          checked={order}
          onChange={handleCheckboxChange}
        />
      </label>

      <label>
        Mostrar favoritos
        <input
          type="checkbox"
          name="favorites"
          id="favorites"
          checked={favorites}
          onChange={handleCheckboxFavorite}
        />
      </label>

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