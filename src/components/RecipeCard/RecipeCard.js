import { useState } from 'react';
import { addRecipeToSelected, removeRecipeFromSelected } from '../../actions/recipes';
import { useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const RecipeCard = ({ recipe }) => { 
  const { id, name, image_url, brewers_tips } = recipe;
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const handleSelected = (id) => (event) => {
    event.preventDefault();

    if (!clicked) {
      dispatch(addRecipeToSelected(id));
      setClicked(!clicked);

      return;
    }

    setClicked(!clicked);
    dispatch(removeRecipeFromSelected(id));
  };

  return (
    <Card className='flex-row' style={{ height: 400 }} onContextMenu={handleSelected(id)} >
      <Link to={`:${id}`} className='p-2' style={{ width: 225 }}>
        <Image src={image_url} className='h-100' style={{ objectFit: 'cover', objectPosition: 'center' }} />
      </Link>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {brewers_tips}
        </Card.Text>
        <Card.Text>
          {id}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.object,
};
