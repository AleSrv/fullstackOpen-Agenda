import { useState, useEffect } from 'react';
import contactsService from '../services/contacts';
import { handleError } from '../utils/errorUtils';

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    contactsService
      .getAll()
      .then((initialContacts) => {
        setContacts(initialContacts);
      })
      .catch((error) => {
        handleError(setErrorMessage, setIsError, "Error fetching data:", error);
      });
  }, []);

  const addContact = async (contactToAdd) => {
    setLoading(true);
    try {
      const returnedContact = await contactsService.create(contactToAdd);
      setContacts([...contacts, returnedContact]);
      return { success: true, contact: returnedContact };
    } catch (error) {
      handleError(setErrorMessage, setIsError, "Error adding contact:", error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const updateContact = async (id, contactToUpdate) => {
    setLoading(true);
    try {
      const updatedContact = await contactsService.update(id, contactToUpdate);
      setContacts(contacts.map(contact => 
        contact.id === updatedContact.id ? updatedContact : contact
      ));
      return { success: true, contact: updatedContact };
    } catch (error) {
      handleError(setErrorMessage, setIsError, "Error updating contact:", error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    try {
      await contactsService.deleteContact(id);
      setContacts(contacts.filter(contact => contact.id !== id));
      return { success: true };
    } catch (error) {
      handleError(setErrorMessage, setIsError, "Error deleting contact:", error);
      return { success: false, error };
    }
  };

  const toggleFavorite = async (id) => {
    const contact = contacts.find(c => c.id === id);
    if (!contact) return;

    const updatedContact = { ...contact, favorite: !contact.favorite };
    return await updateContact(id, updatedContact);
  };

  return {
    contacts,
    loading,
    errorMessage,
    isError,
    addContact,
    updateContact,
    deleteContact,
    toggleFavorite,
    setIsError
  };
};