import Restaurant from './Restaurant';
import './ListOfRestaurants.css';

const ListOfRestaurants = (props) => {
  const restaurantComponents = props.restaurants.map((restaurant) => {
    return (
      <li key={restaurant.business_id}>
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
          onChoose={props.onChooseRestaurant}
        ></Restaurant>
      </li>
    );
  });

  return (
    <section>
      <ul className='restaurant-block'>{restaurantComponents}</ul>
    </section>
  );
};

export default ListOfRestaurants;
