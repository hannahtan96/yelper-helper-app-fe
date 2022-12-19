import './Recommendation.css';

const Recommendation = (props) => {
  const onRecommendationClick = () => {
    const urlName = props.name.split(' ').join('+');
    const newWindow = window.open(
      `https://www.yelp.com/search?find_desc=${urlName}&find_loc=${props.city}`,
      '_blank',
      'noopener,noreferrer'
    );
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div onClick={onRecommendationClick}>
      <ul className='recommendation'>
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
