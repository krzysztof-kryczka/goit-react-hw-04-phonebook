import { useState, useEffect } from 'react';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ]
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const checkContact = newContact => {
    return contacts.some(
      contact =>
        contact.name.toLowerCase().trim() ===
        newContact.name.toLowerCase().trim()
    );
  };

  const addContact = newContact => {
    const check = checkContact(newContact);
    if (!check) {
      setContacts([
        ...contacts,
        ...[
          {
            id: newContact.id,
            name: newContact.name,
            number: newContact.number,
          },
        ],
      ]);
    } else {
      alert(`${newContact.name} is already in contacts.`);
    }
  };

  const changeFilterValue = e => {
    setFilter(e.target.value);
  };

  const deleteUser = e => {
    const filtered = contacts.filter(contact => contact.id !== e.target.id);
    setContacts(filtered);
  };

  return (
    <>
      <ContactForm onSubmit={values => addContact(values)} />
      <Filter onFilterChange={changeFilterValue} />
      <ContactList
        contacts={contacts}
        filter={filter}
        onClickHandler={deleteUser}
      ></ContactList>
    </>
  );
};

export default App;
