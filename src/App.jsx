import { useEffect, useRef, useState } from 'react';
import CamposOrden from './components/CamposOrden';
import DisplayedPersons from './components/DisplayedPersons';
import Filter from './components/Filter';
import FormPhone from './components/FormPhone';

// const admins = [
//   { name: 'Arto Hellas', number: '040-123456', posicion: 1 },
//   { name: 'Ada Lovelace', number: '39-44-5323523', posicion: 2 },
//   { name: 'Dan Abramov', number: '12-43-234345', posicion: 3 },
//   { name: 'Mary Poppendieck', number: '39-23-6423122', posicion: 4 }
// ];
// Cargar datos iniciales desde localStorage
const storedPersons = localStorage.getItem('contacts')
  ? JSON.parse(localStorage.getItem('contacts'))
  : [];

const App = () => {
  const [persons, setPersons] = useState(storedPersons);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [message, setMessage] = useState({ activo: false, mostrar: '', target: '' });
  const [isSorted, setIsSorted] = useState(false);
  const [displayedPersons, setDisplayedPersons] = useState(persons);
  const inputRef = useRef(null);
  const phoneRef = useRef(null);
  const [searchName, setSearchName] = useState('');

  const limpiar = (setter) => setter('');



  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()));
    const finalDisplay = isSorted ? [...filteredPersons].sort((a, b) => a.name.localeCompare(b.name)) : filteredPersons;
    setDisplayedPersons(finalDisplay);
  }, [searchName, isSorted, persons]);

  // Guardar en localStorage cada vez que persons cambia
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(persons));
  }, [persons]);

  useEffect(() => {
    if (message.activo) {
      const timer = setTimeout(() => setMessage({ activo: false, mostrar: '', target: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newName') setNewName(value);
    else if (name === 'search') setSearchName(value);
    else if (name === 'newPhone') setNewPhone(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      setMessage({ activo: true, mostrar: 'El nombre ya existe', target: 'name' });
      inputRef.current.select();
      return;
    }
    if (newName === '' || newPhone === '' || Number(newPhone) < 0) {
      setMessage({ activo: true, mostrar: 'Campos inválidos', target: 'phone' });
      phoneRef.current.focus();
      return;
    }

    // Crear el nuevo contacto
    const newposicion = persons.length > 0 ? Math.max(...persons.map(p => p.posicion)) + 1 : 1;
    const newContact = { posicion: newposicion, name: newName, number: newPhone };

    // Actualizar el estado de persons
    setPersons([...persons, newContact]);

    // Limpiar campos y mensaje
    setNewName('');
    setNewPhone('');
    setMessage({ activo: false, mostrar: '', target: '' });
  };


  return (
    <div>
      <h1>Agenda Telefónica</h1>
      <h2>Agregar nuevo número</h2>
      <FormPhone
        handleSubmit={handleSubmit}
        newName={newName}
        handleChange={handleChange}
        inputRef={inputRef}
        message={message}
        newPhone={newPhone}
        phoneRef={phoneRef}
      />
      <Filter limpiar={limpiar} setSearchName={setSearchName} searchName={searchName} handleSearch={handleChange} />
      <h2>Listado</h2>
      <CamposOrden isSorted={isSorted} handleSortChange={() => setIsSorted(!isSorted)} />
      <DisplayedPersons displayedPersons={displayedPersons} />
    </div>
  );
};

export default App;
