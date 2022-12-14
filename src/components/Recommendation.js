import './Recommendation.css';

const Recommendation = (props) => {
  const onRecommendationClick = () => {
    props.onChoose(props);
  };

  return (
    <div onClick={onRecommendationClick}>
      <ul className='Recommendation'>
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

export default Recommendation;
