import Recommendation from './Recommendation';
import './ListOfRecommendations.css';

const ListOfRecommendations = (props) => {
  const recommendationComponents = props.recommendations.map(
    (recommendation) => {
      return (
        <li key={recommendation.business_id}>
          <Recommendation
            business_id={recommendation.business_id}
            name={recommendation.name}
            address={recommendation.address}
            city={recommendation.city}
            state={recommendation.state}
            stars={recommendation.stars}
            categories={recommendation.categories}
            attributes={recommendation.attributes}
            review_count={recommendation.review_count}
          ></Recommendation>
        </li>
      );
    }
  );

  return (
    <section>
      <ul className='restaurant-block'>{recommendationComponents}</ul>
    </section>
  );
};

export default ListOfRecommendations;
