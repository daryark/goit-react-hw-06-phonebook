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
  const contactsR = useSelector(selectContacts);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const contactsLS = JSON.parse(localStorage.getItem('contacts'));
  //   if (contactsLS) {
  //     setContacts([...contactsLS]);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

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
            disabled={!contactsR.length}
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
