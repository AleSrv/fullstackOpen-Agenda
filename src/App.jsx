import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const [message, setMessage] = useState(false)

  const handleChangeName = (e) => {
    setNewName(e.target.value)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    //Buscar en el array si existe el nombre
    const person = persons.find(p => p.name === newName)
    if (!person) {
      setMessage(false)
      setPersons([...persons, { name: newName }])
      setNewName('') // Limpiar el campo después de agregar
    } else {
      setMessage(true)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
          <p>{message ? "El nombre ya existe" : ""}</p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <p key={index}>{index + 1} - {person.name}</p>
      ))}
    </div>
  )
}

export default App
