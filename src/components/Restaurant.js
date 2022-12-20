import './Restaurant.css';
import Attribute from './Attribute';

const Restaurant = (props) => {
  const onRestaurantClick = () => {
    props.onChoose(props);
  };

  return (
    <div onClick={onRestaurantClick}>
      <ul className='restaurant'>
        <li className='name-css'>{props.name}</li>
        <li className='restaurant-details'>
          <div
            className='star-ratings-css'
            title={JSON.stringify((2 * props.stars) / 10)}
          ></div>
          <div className='reviews-css'>
            {props.review_count.toLocaleString('en-US')}
          </div>
        </li>
        <li className='restaurant-details'>
          <div className='category-css'>
            {JSON.stringify(props.categories).split(', ')[1]}
          </div>
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
