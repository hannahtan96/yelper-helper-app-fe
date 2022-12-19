import { useState } from 'react';
import React from 'react';
import './RestaurantForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

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
        <div className='search-items'>
          <input
            className='input-field'
            name='name'
            value={formFields.name}
            onChange={onRestaurantNameChange}
            placeholder='Restaurant Name'
          />
          <input
            className='input-field'
            name='city'
            value={formFields.city}
            onChange={onRestaurantCityChange}
            placeholder='City'
          />
        </div>
        <button className='submit-button' onClick={onFormSubmit}>
          <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' />
        </button>
      </div>
    </form>
  );
};

export default RestaurantForm;
