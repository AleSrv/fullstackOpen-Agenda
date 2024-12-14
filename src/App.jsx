//src\App.jsx
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import contactsService from "./services/contacts";
import FormPhone from "./components/FormPhone";
import DisplayedPersons from "./components/DisplayedPersons";
import EditPopup from "./components/EditPopup";
import { motion, AnimatePresence } from "framer-motion";
import { capitalizeWords } from "./utils/stringUtils";
import { validarTelefonoEspanol } from "./utils/validarUtils";
import ErrorPopUp from "./components/ErrorPopUp";
import { handleError } from "./utils/errorUtils";



const App = () => {
  const [contacts, setContacts] = useState([]); // state Array contactos
  const [name, setName] = useState(""); // state nombre
  const [phone, setPhone] = useState(""); // state teléfono
  const [filter, setFilter] = useState(""); // filtro nombre
  const [order, setOrder] = useState(false); // checkbox Orden alfabético
  const [favorites, setFavorites] = useState(false); // checkbox favoritos 
  const [isEditing, setIsEditing] = useState(false); // Modo edicion
  const [editingContact, setEditingContact] = useState(null); // contacto en edición
  const [showSearch, setShowSearch] = useState(false); // Controla la visibilidad del input de búsqueda
  const [showSave, setShowSave] = useState(false); // Controla la visibilidad del FormPhone
  const [errorMessage, setErrorMessage] = useState("")
  const [isError, setIsError] = useState(false); // Controla popup Errores
  // const [isLoading, setIsLoading] = useState(false); // Carga de datos

  useEffect(() => {
    //CONEXION servidor GET
    contactsService
      .getAll()
      .then((initialContacts) => {
        setContacts(initialContacts);
      })
      .catch((error) => {
        handleError(setErrorMessage, setIsError, "Error fetching data:", error);
      });
  }, []);

  // efecto cambio en busqueda nombre filter
  useEffect(() => {
    if (!showSearch) {
      setFilter(""); // Resetea el filtro al cerrar la búsqueda
    }
  }, [showSearch]);


  // Crear contacto
  const addContact = (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario.

    // Validar el nombre
    if (!name.trim()) {
      setErrorMessage("El nombre es obligatorio.");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setErrorMessage(null)
      }, 3000)
      return;
    }

    // Validar el teléfono
    if (!validarTelefonoEspanol(phone.trim())) {
      setErrorMessage("El teléfono tiene que ser un número comenzado con 6, 7, 8 o 9 y tener 9 dígitos.");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setErrorMessage(null)
      }, 3000)
      return;
    }

    const formattedName = capitalizeWords(name.trim());
    setName(formattedName); // Formatear el nombre al estilo capitalizado.

    // Buscar telefono en contactos
    const foundPhone = contacts.find(person => person.phone === phone);

    let contactToSave;

    // CASO Telefono y nombre existente
    if (foundPhone && (foundPhone.name === formattedName)) {
      alert(`El contacto ${formattedName} con telefono: ${phone} ya existe en la base de datos`)
      return;
    }
    // CASO Telefono existente pero nombre diferente
    if (foundPhone) {
      const confirmName = window.confirm(`El teléfono ${foundPhone.phone} ya esxiste en el contacto: ${foundPhone.name}.\nDesea sobreescribir?`);

      //CASO Telefono existente sobreescribe nombre
      if (confirmName) {
        contactToSave = {
          id: foundPhone.id,
          name: formattedName,
          phone: foundPhone.phone,
          favorite: false
        };

        // CONEXION servidor PUT
        contactsService
          .update(foundPhone.id, contactToSave)
          .then((updatedContact) => {
            // Actualizar en el estado
            setContacts(contacts.map(contact =>
              contact.id === updatedContact.id ? updatedContact : contact
            ));
            setName("");  // Limpiar el formulario
            setPhone("");
          })
          .catch((error) => {
            handleError(setErrorMessage, setIsError, "Error fetching data:", error);
          });
      } else {
        // Si el usuario cancela la acción, no hacer nada
        setName("");  // Limpiar el formulario
        setPhone("");
      }
    }
    // CASO Telefono no existente
    // Si no se encuentra el contacto, crear uno nuevo
    else {
      contactToSave = {
        id: uuidv4(),
        name: formattedName,
        phone: phone.trim(),
        favorite: false,
      };

      // CONEXION servidor POST
      contactsService
        .create(contactToSave)
        .then((response) => {
          setContacts([...contacts, response]);
          setName("");  // Limpiar el formulario
          setPhone("");
        })
        .catch((error) => {
          handleError(setErrorMessage, setIsError, "Error adding contact:", error);
        });
    }
  }


  // Borrar contacto
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este contacto?")) {

      // CONEXION servidor DELETE
      contactsService
        .deleteContact(id)
        .then(() => {
          const contactsTemp = contacts.filter((contact) => contact.id !== id);
          setContacts(contactsTemp);
        })
        .catch((error) => {
          handleError(setErrorMessage, setIsError, "Error deleting contact:", error);
        });
    }
  };

  //Update contact favorite
  const toggleFavorite = (id) => {
    const contactToUpdate = contacts.find(contact => contact.id === id);
    if (!contactToUpdate) return;

    const updatedContact = { ...contactToUpdate, favorite: !contactToUpdate.favorite };

    // CONEXION servidor PUT
    contactsService
      .update(id, updatedContact)
      .then((returnedContact) => {
        setContacts(contacts.map(contact =>
          contact.id === id ? returnedContact : contact
        ));
      })
      .catch((error) => {
        handleError(setErrorMessage, setIsError, "Error updating contact:", error);
      });
  };

  //Editar contacto (UPDATE)
  const handleEdit = (id) => {
    const contactToEdit = contacts.find(contact => contact.id === id);
    if (!contactToEdit) return;
    setEditingContact(contactToEdit);
    setIsEditing(true); // Activa el popup
  };


  const saveEdit = (updatedContact) => {
    // Validar nombre
    if (!updatedContact.name.trim()) {
      setErrorMessage("El nombre es obligatorio.");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setErrorMessage(null)
      }, 3000)
      return;
    }

    const formattedName = capitalizeWords(updatedContact.name.trim());

    // Validar teléfono
    if (!validarTelefonoEspanol(updatedContact.phone.trim())) {
      setErrorMessage("El teléfono no es válido. Debe comenzar con 6, 7, 8 o 9 y tener 9 dígitos.");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setErrorMessage(null)
      }, 3000)
      return;
    }

    const contactToSave = {
      ...updatedContact,
      name: formattedName,
      phone: updatedContact.phone.trim(), // Formatear el teléfono
    };

    // CONEXION servidor PUT
    contactsService
      .update(updatedContact.id, contactToSave)
      .then((returnedContact) => {
        setContacts(contacts.map(contact =>
          contact.id === returnedContact.id ? returnedContact : contact
        ));
        setIsEditing(false);
        setEditingContact(null);
      })
      .catch((error) => {
        handleError(setErrorMessage, setIsError, "Error updating contact:", error);
      });
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
  const displayedContacts = order
    ? [...filteredContacts].sort((a, b) => a.name.localeCompare(b.name))
    : filteredContacts;


  return (
    <div>
      <h1>Agenda Telefónica</h1>

      <button onClick={() => setShowSearch(!showSearch)}>
        {showSearch ? "🔍 Ocultar búsqueda" : "🔍 Buscar contacto"}
      </button>

      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="form-container"
          >
            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                placeholder="Ingrese nombre para buscar..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setShowSave(!showSave)}>
        {showSave ? "Ocultar formulario" : "💾 Nuevo contacto"}
      </button>

      {isError && errorMessage && (
        <ErrorPopUp
          errorMessage={errorMessage}
        />
      )}

      {showSave && (
        <FormPhone
          handleSubmit={addContact} // Pasa addContact directamente.
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          setShowSave={setShowSave}
        />

      )}

      {isEditing && editingContact && (
        <EditPopup
          contact={editingContact} // Se pasa el contacto seleccionado como prop "contact"
          onClose={() => setIsEditing(false)} // Función para cerrar el popup
          onSave={saveEdit} // Función para guardar los cambios
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
          handleDelete={handleDelete}
          filteredContacts={displayedContacts}
          toggleFavorite={toggleFavorite}
          handleEdit={handleEdit}
        />
      ) : (
        <p>No hay contactos</p>
      )}
    </div>
  );
};

export default App;