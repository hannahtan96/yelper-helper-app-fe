import './Restaurant.css';

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
          <div className='attributes-css'>
            <div
              className={
                (JSON.parse(
                  JSON.stringify(props.attributes.RestaurantsReservations)
                )
                  ? '✓'
                  : '✗') === '✓'
                  ? 'green'
                  : 'red'
              }
            >
              {JSON.parse(
                JSON.stringify(props.attributes.RestaurantsReservations)
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
                  JSON.stringify(props.attributes.RestaurantsDelivery)
                )
                  ? '✓'
                  : '✗') === '✓'
                  ? 'green'
                  : 'red'
              }
            >
              {JSON.parse(JSON.stringify(props.attributes.RestaurantsDelivery))
                ? '✓'
                : '✗'}
            </div>
            <div>Delivery</div>
          </div>
          <div className='attributes-css'>
            <div
              className={
                (JSON.parse(JSON.stringify(props.attributes.OutdoorSeating)) ===
                'None'
                  ? '✗'
                  : '✓') === '✓'
                  ? 'green'
                  : 'red'
              }
            >
              {JSON.parse(JSON.stringify(props.attributes.OutdoorSeating)) ===
              'None'
                ? '✗'
                : '✓'}
            </div>
            <div>Outdoor Seating</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Restaurant;
