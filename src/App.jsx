import { useEffect, useRef, useState } from 'react';
import DisplayedPersons from './DisplayedPersons';
import Filter from './Filter';

const admins = [
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
];

const App = () => {
  const [persons, setPersons] = useState(admins);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [message, setMessage] = useState({ activo: false, mostrar: '', target: '' });
  const [isSorted, setIsSorted] = useState(false);
  const [displayedPersons, setDisplayedPersons] = useState(persons);
  const inputRef = useRef(null);
  const phoneRef = useRef(null);
  const [searchName, setSearchName] = useState('');

  const handleSearch = (e) => {
    setSearchName(e.target.value);
  };

  const limpiar = (setter) => {
    setter('');
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(searchName.toLowerCase())
    );

    const finalDisplay = isSorted
      ? filteredPersons.sort((a, b) => a.name.localeCompare(b.name))
      : filteredPersons;

    setDisplayedPersons(finalDisplay);
  }, [searchName, isSorted, persons]);

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };

  const handleChangePhone = (e) => {
    setNewPhone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())) {
      setMessage({ activo: true, mostrar: 'El nombre ya existe', target: 'name' });
      inputRef.current.select();
      return;
    }
    if (newName === '') {
      setMessage({ activo: true, mostrar: 'El campo de nombre no puede estar vacío', target: 'name' });
      inputRef.current.select();
      return;
    }

    if (newPhone < 0) {
      setMessage({ activo: true, mostrar: 'El campo de teléfono no puede ser negivo ', target: 'phone' })
      inputRef.current.select();
      return;
    }

    if (newPhone === '') {
      setMessage({ activo: true, mostrar: 'El campo de teléfono no puede estar vacío', target: 'phone' });
      phoneRef.current.focus();
      return;
    }

    const newId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 1;
    const newPerson = { id: newId, name: newName, number: newPhone };
    const updatedPersons = [...persons, newPerson];
    setPersons(updatedPersons);
    setDisplayedPersons(updatedPersons);
    setNewName('');
    setNewPhone('');
    setMessage({ activo: false, mostrar: '', target: '' });
  };

  const handleSortChange = () => {
    setIsSorted(!isSorted);
  };

  return (
    <div>
      <h2>Agenda Telefónica</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group" style={{ position: 'relative' }}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            value={newName}
            onChange={handleChangeName}
            ref={inputRef}
          />
          {message.activo && message.target === 'name' && (
            <div className="popover">{message.mostrar}</div>
          )}
        </div>
        <div className="form-group" style={{ position: 'relative' }}>
          <label htmlFor="number">Number:</label>
          <input
            id="number"
            type="number"
            max="999999999"
            value={newPhone}
            onChange={handleChangePhone}
            ref={phoneRef}
          />
          {message.activo && message.target === 'phone' && (
            <div className="popover">{message.mostrar}</div>
          )}
        </div>
        <div>
          <button type="submit">Agregar</button>
        </div>
      </form>

      <Filter limpiar={limpiar} setSearchName={setSearchName} searchName={searchName} handleSearch={handleSearch} />

      <h2>Listado</h2>

      <fieldset style={{ border: '1px solid #ccc', padding: '10px', marginTop: '15px' }}>
        <legend>Opciones de Ordenamiento</legend>
        <label>
          <input type="checkbox" checked={isSorted} onChange={handleSortChange} />
          Ordenar alfabéticamente
        </label>
      </fieldset>
      <DisplayedPersons displayedPersons={displayedPersons} />
    </div>
  );
};

export default App;
