// GLOBAL FontAwesomeIcon
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantForm from './components/RestaurantForm';
import NewCityForm from './components/NewCityForm';
import ListOfRestaurants from './components/ListOfRestaurants';
import ListOfRecommendations from './components/ListOfRecommendations';
import './App.css';
import yelpLogo from './assets/Yelp_Logo.png';

// import { getSearchParamsForLocation } from 'react-router-dom/dist/dom';

function App() {
  library.add(faMagnifyingGlass);

  const [restaurant, setRestaurant] = useState({});
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [listOfRecIds, setlistOfRecIds] = useState([]);
  const [listOfRecs, setlistOfRecs] = useState([]);
  const [newCity, setNewCity] = useState('');
  const [loading, setLoading] = useState(false);

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
        setlistOfRecs(response.data);
        setLoading(false);
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
  // const reservationStatus = JSON.parse(
  //   JSON.stringify(restaurant.attributes.RestaurantsReservations)
  // )
  //   ? '✓'
  //   : '✗';
  // const deliveryStatus = JSON.parse(
  //   JSON.stringify(restaurant.attributes.RestaurantsDelivery)
  // )
  //   ? '✓'
  //   : '✗';
  // const outdoorSeatingStatus =
  //   JSON.parse(JSON.stringify(restaurant.attributes.OutdoorSeating)) === 'None'
  //     ? '✗'
  //     : '✓';

  return (
    <div className='App'>
      <section className='header-section'>
        <img id='yelp-logo' alt='Yelp logo' src={yelpLogo} />
        <header id='app-title'>Yelper Helper</header>
      </section>

      <RestaurantForm
        searchRestaurantCallback={searchNewRestaurant}
      ></RestaurantForm>

      {Object.keys(restaurant).length > 0 ? (
        <ul className='chosen-restaurant'>
          <li className='name-css'>{restaurant.name}</li>
          <li className='restaurant-details'>
            <div
              className='star-ratings-css'
              title={JSON.stringify((2 * restaurant.stars) / 10)}
            ></div>
            <div className='reviews-css'>
              {restaurant.review_count.toLocaleString('en-US')}
            </div>
          </li>
          <li className='restaurant-details'>
            <div className='category-css'>
              {JSON.stringify(restaurant.categories).split(', ')[1]}
            </div>
            <div>
              {'$'.repeat(
                parseInt(restaurant.attributes.RestaurantsPriceRange2)
              )}
            </div>
            <div className='city-css'>{restaurant.city}</div>
          </li>
          <li className='restaurant-details'>
            <div className='attributes-css'>
              <div
                className={
                  (JSON.parse(
                    JSON.stringify(
                      restaurant.attributes.RestaurantsReservations
                    )
                  )
                    ? '✓'
                    : '✗') === '✓'
                    ? 'green'
                    : 'red'
                }
              >
                {JSON.parse(
                  JSON.stringify(restaurant.attributes.RestaurantsReservations)
                )
                  ? '✓'
                  : '✗'}
              </div>
              <div>Reservations</div>
            </div>
            <div className='attributes-css'>
              <div
                className={
                  (JSON.parse(
                    JSON.stringify(restaurant.attributes.RestaurantsDelivery)
                  )
                    ? '✓'
                    : '✗') === '✓'
                    ? 'green'
                    : 'red'
                }
              >
                {JSON.parse(
                  JSON.stringify(restaurant.attributes.RestaurantsDelivery)
                )
                  ? '✓'
                  : '✗'}
              </div>
              <div>Delivery</div>
            </div>
            <div className='attributes-css'>
              <div
                className={
                  (JSON.parse(
                    JSON.stringify(restaurant.attributes.OutdoorSeating)
                  ) === 'None'
                    ? '✗'
                    : '✓') === '✓'
                    ? 'green'
                    : 'red'
                }
              >
                {JSON.parse(
                  JSON.stringify(restaurant.attributes.OutdoorSeating)
                ) === 'None'
                  ? '✗'
                  : '✓'}
              </div>
              <div>Outdoor Seating</div>
            </div>
          </li>
        </ul>
      ) : (
        <ListOfRestaurants
          restaurants={listOfRestaurants}
          onChooseRestaurant={setChosenRestaurant}
        ></ListOfRestaurants>
      )}

      {/* <button onClick={findUserIds}>Get Rec Business Ids</button> */}
      {/* <button onClick={findRecsBusinessIds}>Get Rec Business Ids</button> */}
      {/* <button onClick={findBusinessesInNewCity}>Get Recs</button> */}

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
          <ListOfRecommendations
            recommendations={listOfRecs}
          ></ListOfRecommendations>
        </div>
      </div>
    </div>
  );
}

export default App;
