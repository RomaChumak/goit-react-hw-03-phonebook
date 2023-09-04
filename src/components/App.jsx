import { Component } from "react";
import { ContactForm } from "./form/Form";
import { Filter } from "./filter/Filter";
import { ContactList } from "./contactList/ContactList";
import { Layout } from "./Layout.styled";
import { nanoid } from "nanoid";
export class App extends Component {
    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
    };
    searchContact = (contactName) => {
        this.setState({
            filter: contactName,
       })
   }
    deleteContact = (contactId) => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== contactId)
        }));
    }
    visibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    }
      addContact = newContact => {
    const { contacts } = this.state;
    const oldContact = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (!oldContact) {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, { id: nanoid(), ...newContact }],
      }));
    } else {
      alert(`${newContact.name} is already in contacts.`);
    }
  };
    render() { 
        const contact = this.visibleContacts()
        const filter = this.state.filter
    return (
    <Layout>
    <ContactForm onAddContact={this.addContact}/>
    <Filter filter={filter} onSearchContact={this.searchContact} />
    <ContactList contacts={contact} onDelete={this.deleteContact}/>
    </Layout>
    
    )}

}
