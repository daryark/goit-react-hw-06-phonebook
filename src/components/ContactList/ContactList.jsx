// import PropTypes from 'prop-types';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Notification } from 'components/common/Notification/Notification.styled';
import { ContactInfo, ContactItem, DeleteBtn } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contacts/contactsSlice';
import { selectContacts, selectFilter } from 'redux/contacts/selectors';

export const ContactList = () => {
  const contactsR = useSelector(selectContacts);
  const filterR = useSelector(selectFilter);
  const dispatch = useDispatch();

  const getFilteredContacts = (contacts, filter) => {
    const filtered =
      filter && contacts.length
        ? contacts.filter(({ name }) =>
            name.trim().toLowerCase().includes(filter.trim().toLowerCase())
          )
        : contacts;

    return filtered;
    // return (
    //   Boolean(contacts.length) &&
    //   filtered.sort((a, b) => a.name.localeCompare(b.name))
    // );
  };

  const handleClickDelete = contactId => dispatch(deleteContact(contactId));

  const filtered = getFilteredContacts(contactsR, filterR);
  return (
    <ul>
      {Boolean(filtered.length) ? (
        filtered.map(({ name, number, id }) => (
          <ContactItem key={id}>
            <div>
              <ContactInfo>{name}</ContactInfo>
              <ContactInfo>{number}</ContactInfo>
            </div>
            <DeleteBtn type="button" onClick={() => handleClickDelete(id)}>
              <FaRegTrashAlt />
            </DeleteBtn>
          </ContactItem>
        ))
      ) : (
        <Notification>Sorry, no matches found</Notification>
      )}
    </ul>
  );
};

// ContactList.propTypes = {
//   deleteContact: PropTypes.func.isRequired,
//   filter: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string,
//       number: PropTypes.string,
//       id: PropTypes.string,
//     }).isRequired
//   ).isRequired,
// };
