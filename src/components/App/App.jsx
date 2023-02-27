import {
  ContactList,
  ContactForm,
  Section,
  Container,
  Header2,
  Notification,
  Searchbar,
  Header,
} from 'components';
import { useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/selectors';

export function App() {
  const contacts = useSelector(selectContacts);

  return (
    <>
      <Header />

      <Section>
        <Container>
          <ContactForm />
          <Header2>Contacts</Header2>
          <Searchbar />

          {!contacts.length ? (
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
