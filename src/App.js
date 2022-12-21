// GLOBAL FontAwesomeIcon
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantForm from './components/RestaurantForm';
import NewCityForm from './components/NewCityForm';
import ListOfRestaurants from './components/ListOfRestaurants';
import Restaurant from './components/Restaurant';
import './App.css';
import yelpLogo from './assets/Yelp_Logo.png';

// import { getSearchParamsForLocation } from 'react-router-dom/dist/dom';

function App() {
  library.add(faMagnifyingGlass);

  const [restaurant, setRestaurant] = useState({});
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [listOfRecIds, setListOfRecIds] = useState([]);
  const [listOfRecs, setListOfRecs] = useState([]);
  const [newCity, setNewCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const makeProper = (str) => {
    const string = str
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase()
      .split(' ')
      .map((word) => {
        return word[0].toUpperCase() + word.substr(1, word.length);
      })
      .join(' ');
    return string;
  };

  // FIND QUERIED RESTAURANT [TARGET RESTAURANT]
  const searchNewRestaurant = async (newRestaurant) => {
    const targetName = makeProper(newRestaurant.name);
    const targetCity = makeProper(newRestaurant.city);

    await axios
      .get('http://127.0.0.1:3001/find_businesses', {
        params: {
          name: targetName,
          city: targetCity
        }
      })
      .then((response) => {
        if (response.data.length === 1) {
          setRestaurant(response.data[0]);
          setListOfRestaurants([]);
          setErrorMessage('');
        } else if (response.data.length > 1) {
          setListOfRestaurants(response.data);
          setRestaurant({});
          setErrorMessage('');
        } else {
          setErrorMessage(
            `Search for ${targetName} in ${targetCity} yielded 0 results`
          );
        }

        if (listOfUsers.length > 0) {
          setListOfUsers([]);
          setListOfRecIds([]);
          setListOfRecs([]);
          setNewCity('');
        }
      });
  };

  const setChosenRestaurant = (restaurant) => {
    setRestaurant(restaurant);
    setListOfRestaurants([]);
  };

  // FIND USER IDS [TARGET USERS] THAT HAVE REVIEWED TARGET RESTAURANT
  const findUserIds = async () => {
    console.log('running findUserIds');

    await axios
      .get('http://127.0.0.1:3001/find_user_ids', {
        params: {
          business_id: restaurant.business_id
        }
      })
      .then((response) => {
        console.log('finished running findUserIds');
        if (response.data.length > 0) {
          setListOfUsers(response.data[0].data);
          setErrorMessage('');
        } else {
          setErrorMessage(`Could not find recommendations for ${newCity}}`);
        }
      })
      .catch((error) => {
        console.log('could not find reviews: ', error);
      });
  };

  // FIND OTHER BUSINESS RECS THAT TARGET USERS HAVE REVIEWED

  const findRecsBusinessIds = async () => {
    // await findUserIds();
    console.log('running findRecsBusinessIds');

    await axios
      .get('http://127.0.0.1:3001/find_rec_ids', {
        params: {
          users: `${listOfUsers.join(',')}`
        }
      })
      .then((response) => {
        console.log('finished running findRecsBusinessIds');
        if (response.data.length > 0) {
          setListOfRecIds(response.data.map((r) => r._id).slice(0, 1000));
          setErrorMessage('');
        } else {
          setErrorMessage(`Could not find recommendations for ${newCity}}`);
        }
      })
      .catch((error) => {
        console.log('could not find reviews: ', error);
      });
  };

  // NEW CITY - find relevant recs
  const findBusinessesInNewCity = async () => {
    console.log('running findBusinessesInNewCity');

    await axios
      .get('http://127.0.0.1:3001/find_rec_businesses', {
        params: {
          business_ids: `${listOfRecIds.join(',')}`,
          city: newCity
        }
      })
      .then((response) => {
        console.log('finished running findBusinessesInNewCity');
        setLoading(false);
        if (response.data.length > 0) {
          setListOfRecs(response.data);
          setErrorMessage('');
        } else {
          setErrorMessage(`Could not find recommendations in ${newCity}`);
        }
      })
      .catch((error) => {
        console.log('could not find reviews: ', error);
      });
  };

  const setNewCityName = async (newCity) => {
    setNewCity(makeProper(newCity.newCity));
  };

  const wait = (ms) =>
    new Promise((resolve, reject) => setTimeout(resolve, ms));

  const onRedirectRestaurant = (props) => {
    const urlName = props.name.split(' ').join('+');
    const newWindow = window.open(
      `https://www.yelp.com/search?find_desc=${urlName}&find_loc=${props.city}`,
      '_blank',
      'noopener,noreferrer'
    );
    if (newWindow) newWindow.opener = null;
  };
  useEffect(() => {
    setLoading(true);
    const callFirst = async () => {
      if (newCity) {
        await findUserIds();
      }
    };
    callFirst();
  }, [newCity]);

  useEffect(() => {
    const callSecond = async () => {
      if (listOfUsers.length > 1) {
        await findRecsBusinessIds();
      }
    };
    callSecond();
  }, [listOfUsers]);

  useEffect(() => {
    const callThird = async () => {
      if (listOfRecIds.length > 1) {
        await findBusinessesInNewCity();
      }
    };
    callThird();
  }, [listOfRecIds]);

  const newCityFormStatus = restaurant.name ? 'display' : 'no-display';
  const loadingStatus = loading && newCity ? 'display' : 'no-display';
  const resultStatus = listOfRecs.length > 1 ? 'display' : 'no-display';

  return (
    <div className='App'>
      <section className='header-section'>
        <img id='yelp-logo' alt='Yelp logo' src={yelpLogo} />
        <header id='app-title'>Yelper Helper</header>
      </section>

      <RestaurantForm
        searchRestaurantCallback={searchNewRestaurant}
      ></RestaurantForm>

      {errorMessage ? <div id='error-message'>{errorMessage}</div> : null}

      {Object.keys(restaurant).length > 0 ? (
        <ul className='chosen-restaurant'>
          <Restaurant
            business_id={restaurant.business_id}
            name={restaurant.name}
            address={restaurant.address}
            city={restaurant.city}
            state={restaurant.state}
            stars={restaurant.stars}
            categories={restaurant.categories}
            attributes={restaurant.attributes}
            review_count={restaurant.review_count}
            onChoose={onRedirectRestaurant}
          ></Restaurant>
        </ul>
      ) : (
        <ListOfRestaurants
          restaurants={listOfRestaurants}
          onChooseRestaurant={setChosenRestaurant}
        ></ListOfRestaurants>
      )}

      <div className={newCityFormStatus}>
        <NewCityForm setNewCityCallback={setNewCityName}></NewCityForm>
      </div>
      <div id='loading' className={loadingStatus}>
        Loading...
      </div>
      <div className={resultStatus}>
        <header id='recommendation-title'>
          Restaurant Recommendations for {newCity}
        </header>
        <div id='recommendations'>
          <ListOfRestaurants
            restaurants={listOfRecs}
            onChooseRestaurant={onRedirectRestaurant}
          ></ListOfRestaurants>
        </div>
      </div>
    </div>
  );
}

export default App;
