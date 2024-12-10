const addContact = () => {
  const newContact = {
    id: uuidv4(),
    name,
    phone,
  };

  axios
    .post("http://localhost:3001/contacts", newContact)
    .then((response) => {
      setContacts([...contacts, response.data]);
      setName("");
      setPhone("");
    })
    .catch((error) => {
      console.error("Error adding contact:", error);
    });
};
