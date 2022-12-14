import RestaurantForm from './components/RestaurantForm';
import NewCityForm from './components/NewCityForm';
import ListOfRestaurants from './components/ListOfRestaurants';
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [restaurant, setRestaurant] = useState({});
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [listOfRecIds, setlistOfRecIds] = useState([]);
  const [listOfRecs, setlistOfRecs] = useState([]);
  const [newCity, setNewCity] = useState('');

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
    await axios
      .get('http://127.0.0.1:3001/find_businesses', {
        params: {
          name: makeProper(newRestaurant.name),
          city: makeProper(newRestaurant.city)
        }
      })
      .then((response) => {
        if (response.data.length === 1) {
          setRestaurant(response.data[0]);
          setListOfRestaurants([]);
        } else {
          setListOfRestaurants(response.data);
          setRestaurant({});
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
        setListOfUsers(response.data[0].data);
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
        setlistOfRecIds(response.data.map((r) => r._id).slice(0, 1000));
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
          city: makeProper(newCity)
        }
      })
      .then((response) => {
        console.log('finished running findBusinessesInNewCity');
        setlistOfRecs(
          response.data.slice(0, Math.min(20, response.data.length))
        );
      })
      .catch((error) => {
        console.log('could not find reviews: ', error);
      });
  };

  const setNewCityName = async (newCity) => {
    setNewCity(newCity.newCity);
  };

  const wait = (ms) =>
    new Promise((resolve, reject) => setTimeout(resolve, ms));

  useEffect(() => {
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

  return (
    <div className='App'>
      <header>Yelper Helper</header>
      <RestaurantForm
        searchRestaurantCallback={searchNewRestaurant}
      ></RestaurantForm>

      {Object.keys(restaurant).length > 0 ? (
        <ul className='chosen-restaurant'>
          <li>Name: {restaurant.name}</li>
          <li>
            Location: {restaurant.city}, {restaurant.state}
          </li>
          <li>Stars: {restaurant.stars}</li>
          <li>Reviews: {restaurant.review_count}</li>
        </ul>
      ) : (
        <ListOfRestaurants
          restaurants={listOfRestaurants}
          onChooseRestaurant={setChosenRestaurant}
        ></ListOfRestaurants>
      )}

      {/* <button onClick={findUserIds}>Get Rec Business Ids</button> */}
      {/* <button onClick={findRecsBusinessIds}>Get Rec Business Ids</button> */}

      <NewCityForm setNewCityCallback={setNewCityName}></NewCityForm>
      {/* <button onClick={findBusinessesInNewCity}>Get Recs</button> */}

      <h2>Restaurant Recommendations for {newCity}</h2>
      <ListOfRestaurants
        restaurants={listOfRecs}
        onChooseRestaurant={setChosenRestaurant}
      ></ListOfRestaurants>
    </div>
  );
}

export default App;
