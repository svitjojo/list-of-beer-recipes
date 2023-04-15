import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useSelector, useDispatch } from 'react-redux'; 
import { useEffect } from 'react';
import { addRenderedRecipes, fetchRecipes, removeRecipeFromRendered } from '../actions/recipes';
import { RecipeCard } from '../components/RecipeCard';


export const HomePage = () => {
  const { renderedRecipes, selectedRecipes } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleScroll = () => {
    const { scrollTop, scrollHeight } = document.documentElement;
    const { innerHeight } = window;

    if (innerHeight + scrollTop + 1 >= scrollHeight) {
      dispatch(addRenderedRecipes());
    }
  };

  const handleClick = () => {
    dispatch(removeRecipeFromRendered(selectedRecipes));
  };

  useEffect(() => {
    dispatch(fetchRecipes());
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {!!selectedRecipes.length && (
        <Button onClick={handleClick} className='m-3' style={{ position: 'fixed', top: 0, zIndex: 10 }}>Delete</Button>
      )}

      <Container className='mt-4'>
        <Row xs={1} md={1} lg={1} className="g-4">
          {renderedRecipes.map((recipe) => (
            <Col key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
