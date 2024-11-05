import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')
  const [message, setMessage] = useState(false)
  const [isSorted, setIsSorted] = useState(false) //  checkbox ordenamiento alfabetico
  const [searchTerm, setSearchTerm] = useState('') // Estado buscador

  const handleChangeName = (e) => {
    const person = persons.find(p => p.name === e.target.value)
    if (!person) {
      setMessage(false)
      setNewName(e.target.value)
    } else {
      setMessage(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!persons.find(person => person.name === newName)) {
      setPersons([...persons, { name: newName }])
      setNewName('')
      setMessage(false)
    } else {
      setMessage(true)
    }
  }

  const handleSortChange = () => {
    setIsSorted(!isSorted)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value) // Actualiza el término de búsqueda a medida que el usuario escribe
  }

  // Filtrar y ordenar la lista de personas en función del término de búsqueda y el estado de orden
  const displayedPersons = persons
    .filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase())) // Filtra los nombres según el término de búsqueda
    .sort(isSorted ? (a, b) => a.name.localeCompare(b.name) : () => 0) // Ordena si el checkbox está marcado

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <div>debug: {newName}</div>
      <p>{message ? "Ya existe en la lista" : ""}</p>

      {/* Campo de entrada para el buscador */}
      <div>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginTop: "10px", marginBottom: "10px" }}
        />
      </div>

      {/* Fieldset para agrupar los checkboxes */}
      <fieldset style={{ border: "1px solid #ccc", padding: "10px", marginTop: "15px" }}>
        <legend>Opciones de Ordenamiento</legend>

        {/* Checkbox de ordenamiento alfabético */}
        <div>
          <label>
            <input type="checkbox" checked={isSorted} onChange={handleSortChange} />
            Ordenar alfabéticamente
          </label>
        </div>

        {/* Otro checkbox para futura funcionalidad */}
        <div>
          <label>
            <input type="checkbox" /* lógica para manejar este checkbox */ />
            Filtrar (nueva funcionalidad)
          </label>
        </div>
      </fieldset>

      <h2>Numbers</h2>
      {displayedPersons.map((person, index) => (
        <p key={index}>{index + 1} - {person.name}</p>
      ))}
    </div>
  )
}

export default App
