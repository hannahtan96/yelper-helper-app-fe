import './Restaurant.css';

const Restaurant = (props) => {
  const onRestaurantClick = () => {
    // console.log(props);
    props.onChoose(props);
  };

  return (
    <div onClick={onRestaurantClick}>
      <ul className='restaurant'>
        <li>Name: {props.name}</li>
        <li>
          Location: {props.address} {props.city}, {props.state}
        </li>
        <li>Stars: {props.stars}</li>
        <li>Categories: {props.categories}</li>
        <li>Reviews: {props.review_count}</li>
      </ul>
    </div>
  );
};

export default Restaurant;
