import { useEffect, useState } from 'react';
import { FaRegAddressBook, FaSearch } from 'react-icons/fa';
import {
  ContactList,
  ContactForm,
  Section,
  Container,
  HeaderSection,
  Header1,
  Header2,
  Input,
  Search,
  Notification,
} from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/selectors';
import { setFilterValue } from 'redux/contacts/contactsSlice';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const contactsR = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    const contactsLS = JSON.parse(localStorage.getItem('contacts'));
    if (contactsLS) {
      setContacts([...contactsLS]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChangeFilter = e => dispatch(setFilterValue(e.target.value));
  return (
    <>
      <HeaderSection>
        <Container>
          <Header1>
            <FaRegAddressBook /> Phonebook
          </Header1>
        </Container>
      </HeaderSection>

      <Section>
        <Container>
          <ContactForm />
          <Header2>Contacts</Header2>

          <Search htmlFor="filter">
            <FaSearch />
          </Search>
          <Input
            type="text"
            name="filter"
            id="filter"
            onChange={handleChangeFilter}
            disabled={!contacts.length}
          />

          {!contactsR.length ? (
            <Notification>
              You don't have contacts yet, add somebody!
            </Notification>
          ) : (
            <ContactList />
          )}
        </Container>
      </Section>
    </>
  );
}
