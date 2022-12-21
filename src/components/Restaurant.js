import './Restaurant.css';
import Attribute from './Attribute';

const Restaurant = (props) => {
  const onRestaurantClick = () => {
    props.onChoose(props);
  };
  console.log(typeof props.categories);

  const displayCategory = () => {
    const categories = props.categories;
    if (Array.isArray(categories)) {
      return Object.values(categories)[0]
        .split(', ')
        .filter(
          (category) => category !== 'Food' && category !== 'Restaurants'
        )[0];
    } else {
      return categories
        .split(', ')
        .filter(
          (category) => category !== 'Food' && category !== 'Restaurants'
        )[0];
    }
  };
  // console.log(JSON.stringify((2 * props.stars) / 10));

  const starColor =
    props.stars > 3.5 ? 'four-and-above-color' : 'three-and-below-color';

  return (
    <div onClick={onRestaurantClick}>
      <ul className='restaurant'>
        <li className='name-css'>{props.name}</li>
        <li className='restaurant-details'>
          <div
            className={`star-ratings-css ${starColor}`}
            title={JSON.stringify((2 * props.stars) / 10)}
          ></div>
          <div className='reviews-css'>
            {props.review_count.toLocaleString('en-US')}
          </div>
        </li>
        <li className='restaurant-details'>
          <div className='category-css'>{displayCategory()}</div>
          <div>
            {'$'.repeat(parseInt(props.attributes.RestaurantsPriceRange2))}
          </div>
          <div className='city-css'>{props.city}</div>
        </li>
        <li className='restaurant-details'>
          {'RestaurantsReservations' in props.attributes ? (
            <Attribute
              caption='Reservations'
              attribute={props.attributes.RestaurantsReservations}
            ></Attribute>
          ) : null}
          {'RestaurantsDelivery' in props.attributes ? (
            <Attribute
              caption='Delivery'
              attribute={props.attributes.RestaurantsDelivery}
            ></Attribute>
          ) : null}
          {'OutdoorSeating' in props.attributes ? (
            <Attribute
              caption='Outdoor Seating'
              attribute={props.attributes.OutdoorSeating}
            ></Attribute>
          ) : null}
        </li>
      </ul>
    </div>
  );
};

export default Restaurant;
