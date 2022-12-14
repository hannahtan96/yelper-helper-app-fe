import { useState } from 'react';
import './NewCityForm.css';

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
        <input
          name='name'
          value={formFields.newCity}
          onChange={onNewCityChange}
          placeholder='New City'
        />
      </div>
      <input className='inline' type='submit' value='Search Now!' />
    </form>
  );
};

export default NewCityForm;
