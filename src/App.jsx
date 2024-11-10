import { useEffect, useRef, useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Alejandro' }, { name: 'Carlos' }, { name: 'Beatriz' }])
  const [newName, setNewName] = useState('')
  const [message, setMessage] = useState(false)
  const [isSorted, setIsSorted] = useState(false) // checkbox ordenamiento alfabético
  const [searchName, setSearchName] = useState("")
  const [displayedPersons, setDisplayedPersons] = useState(persons) // Nueva lista de visualización
  const inputRef = useRef(null)

  // useEffect para enfocar el input al cargar el componente
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  // Función cuando cambia el input de nombre
  const handleChangeName = (e) => {
    setNewName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Agregar nuevo nombre si no existe en la lista
    if (!persons.find(person => person.name === newName)) {
      const updatedPersons = [...persons, { name: newName }]
      setPersons(updatedPersons)
      setDisplayedPersons(updatedPersons)
      setNewName('')
      setMessage(false)
    } else {
      setMessage(true)
      inputRef.current.select()
    }
  }

  const handleSortChange = () => {
    setIsSorted(!isSorted)
    // Al hacer clic en el checkbox, aplica el ordenamiento a `displayedPersons`
    const sortedPersons = [...displayedPersons].sort((a, b) =>
      isSorted ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
    )
    setDisplayedPersons(sortedPersons)
  }

  const handleSearch = (e) => {
    const searchValue = e.target.value
    setSearchName(searchValue)
    // Filtrar personas que contengan el texto de búsqueda
    const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(searchValue.toLowerCase())
    )

    // Si `isSorted` está activo, ordenar los resultados filtrados
    const finalDisplay = isSorted
      ? filteredPersons.sort((a, b) => a.name.localeCompare(b.name))
      : filteredPersons

    setDisplayedPersons(finalDisplay)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChangeName} ref={inputRef} />
        </div>
        <div>
          <button type="submit" style={{ margin: "5px" }}>
            Agregar
          </button>
        </div>
      </form>

      <div style={message ? { background: "red" } : { background: "white" }}>
        <div>debug: {newName}</div>
        <p>{message ? "Ya existe en la lista" : ""}</p>
      </div>

      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar..."
        onChange={handleSearch}
        value={searchName}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      />

      {/* Checkbox para ordenar */}
      <fieldset style={{ border: "1px solid #ccc", padding: "10px", marginTop: "15px" }}>
        <legend>Opciones de Ordenamiento</legend>
        <div>
          <label>
            <input type="checkbox" checked={isSorted} onChange={handleSortChange} />
            Ordenar alfabéticamente
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
