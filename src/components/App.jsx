import { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid'

export class App extends Component {
  state = {
    contacts: [],
    filter: ''
  };
  
  addContacts = ({ name, number }) => {
    const contact = { id: nanoid(10), name, number };
    const { contacts } = this.state
   
    const findName = contacts.find(item => item.name.toLowerCase() === name.toLowerCase())
      
    findName ?
      Notiflix.Notify.failure(`${name} is already in contacts`)
      :
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact]
      }))
  };
  
        
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  };

  filterContacts = e => {
  this.setState({filter: e.currentTarget.value})
}

  render() {
    const { addContacts, deleteContact, filterContacts } = this;
    const { contacts, filter } = this.state;
    
    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(
      contact => contact.name.toLowerCase().includes(normalizedFilter))

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmitForm={addContacts} contacts={ contacts} />
      <h2>Contacts</h2>
      <Filter onFilter={filterContacts} />
      <ContactList contacts={visibleContacts} onDelete={deleteContact}/>
    </div>
  )
}
};
