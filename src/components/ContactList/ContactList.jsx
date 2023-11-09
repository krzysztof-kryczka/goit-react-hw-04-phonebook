import PropTypes from 'prop-types';

import css from './ContactList.module.css';

const ContactList = props => {
  const { contacts, filter, onClickHandler } = props;

  return (
    <div className={css.contacts}>
      <h2>Contacts</h2>
      <ul className={css.contacts__list}>
        {contacts
          .filter(({ name }) =>
            name.toLowerCase().includes(filter.toLowerCase())
          )
          .map(({ id, name, number }) => (
            <li className={css.contacts__item} key={id}>
              {name} : {number} {' '}
              <button
                className={css.contacts__btn}
                id={id}
                onClick={onClickHandler}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string.isRequired,
};

export default ContactList;
