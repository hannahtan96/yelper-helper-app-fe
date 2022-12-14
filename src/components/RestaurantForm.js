import { useState } from 'react';
import './RestaurantForm.css';

const RestaurantForm = (props) => {
  const [formFields, setFormFields] = useState({ name: '', city: '' });

  const onRestaurantNameChange = (event) => {
    setFormFields({ ...formFields, name: event.target.value });
  };

  const onRestaurantCityChange = (event) => {
    setFormFields({ ...formFields, city: event.target.value });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    props.searchRestaurantCallback({
      name: formFields.name,
      city: formFields.city
    });

    setFormFields({
      name: '',
      city: ''
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className='inline'>
        <input
          name='name'
          value={formFields.name}
          onChange={onRestaurantNameChange}
          placeholder='Restaurant Name'
        />
        <input
          name='city'
          value={formFields.city}
          onChange={onRestaurantCityChange}
          placeholder='City'
        />
      </div>
      <input className='inline' type='submit' value='Search Now!' />
    </form>
  );
};

export default RestaurantForm;