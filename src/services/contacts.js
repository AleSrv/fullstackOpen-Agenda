//src\services\contacts.js
import axios from "axios";
//JSON Server proporciona rutas CRUD (GET, POST, PUT, DELETE) automáticamente basándose en db.json.
const baseUrl = "http://localhost:3001/contacts";

//Leer contactos
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

//Crear contacto
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

//Actualizar contacto
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

//Eliminar un contacto
const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  deleteContact, // Exportar la nueva función
};
