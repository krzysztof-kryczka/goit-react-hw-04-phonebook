import React, { Component } from 'react';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  checkContact = newContact => {
    const { contacts } = this.state;

    return contacts.some(
      contact =>
        contact.name.toLowerCase().trim() ===
        newContact.name.toLowerCase().trim()
    );
  };

  addContact = newContact => {
    const check = this.checkContact(newContact);
    if (!check) {
      const { contacts } = this.state;
      contacts.push(newContact);
      this.setState({ contacts: contacts });
    } else {
      alert(`${newContact.name} is already in contacts.`);
    }
  };

  changeFilterValue = e => {
    this.setState({ filter: e.target.value });
  };

  deleteUser = e => {
    const { contacts } = this.state;
    const filtered = contacts.filter(contact => contact.id !== e.target.id);
    this.setState({ contacts: filtered });
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem('contacts');
      const contacts = JSON.parse(json);

      if (contacts) {
        this.setState(() => ({ contacts: contacts }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const json = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', json);
    }
  }

  render() {
    return (
      <>
        <ContactForm onSubmit={values => this.addContact(values)} />
        <Filter onFilterChange={this.changeFilterValue} />
        <ContactList
          contacts={this.state.contacts}
          filter={this.state.filter}
          onClickHandler={this.deleteUser}
        ></ContactList>
      </>
    );
  }
}

export default App;
