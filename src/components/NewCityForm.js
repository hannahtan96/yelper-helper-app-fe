import { useState } from 'react';
import './NewCityForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NewCityForm = (props) => {
  const [formFields, setFormFields] = useState({ newCity: '' });

  const onNewCityChange = (event) => {
    setFormFields({ ...formFields, newCity: event.target.value });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    props.setNewCityCallback({
      newCity: formFields.newCity
    });

    setFormFields({
      newCity: ''
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className='inline'>
        <div className='search-items'>
          <input
            className='input-field'
            name='name'
            value={formFields.newCity}
            onChange={onNewCityChange}
            placeholder='New City'
          />
        </div>
        <button className='submit-button' onClick={onFormSubmit}>
          <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' />
        </button>
      </div>
    </form>
  );
};

export default NewCityForm;
