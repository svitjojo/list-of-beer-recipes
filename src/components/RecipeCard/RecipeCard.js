import { useState } from 'react';
import { addRecipeToSelected, removeRecipeFromSelected } from '../../actions/recipes';
import { useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const RecipeCard = ({ recipe }) => { 
  const { id, name, image_url, description, tagline, ingredients, food_pairing } = recipe;
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();

  const handleSelected = (id) => {
    return (event) => {
      event.preventDefault();

      if (!selected) {
        dispatch(addRecipeToSelected(id));
        setSelected(!selected);

        return;
      }

      setSelected(!selected);
      dispatch(removeRecipeFromSelected(id));
    };
  };

  return (
    <Card
      className='flex-row'
      style={{ height: 400, transition: 'background-color 0.3s' }}
      onContextMenu={handleSelected(id)}
      bg={selected ? 'info' : 'light'}
    >
      <Link to={`:${id}`} className='p-2 flex-shrink-0' style={{ width: 225 }}>
        <Image src={image_url} className='h-100' style={{ objectFit: 'cover' }} />
      </Link>
      <Card.Body>
        <Card.Title>
          <Link to={`:${id}`}>
            {name}
          </Link>
        </Card.Title>
        <Card.Subtitle className='mb-2'>{tagline}</Card.Subtitle>
        <Card.Text>
          {description}
        </Card.Text>
        <div className='d-flex justify-content-between'>
          <div>
            <h5>Ingredients:</h5>
            <ul>
              {food_pairing.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Food Pairing:</h5>
            <ul>
              {ingredients.malt.map(({ name }) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
        
      </Card.Body>
    </Card>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.object,
};
