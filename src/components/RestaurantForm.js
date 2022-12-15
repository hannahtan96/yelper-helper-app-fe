import { useState } from 'react';
import './RestaurantForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

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

  // const magnifyGlass = <FontAwesomeIcon icon={faMagnifyingGlass} />;

  return (
    <form onSubmit={onFormSubmit}>
      <div className='inline'>
        <input
          className='restaurant-name'
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
      <input className='submit-button' type='submit'></input>
    </form>
  );
};

export default RestaurantForm;
