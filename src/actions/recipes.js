const FETCH_RECIPES = 'FETCH_RECIPES';
const ADD_RENDERED_RECIPES = 'ADD_RENDERED_RECIPES';
const ADD_RECIPE_TO_SELECTED = 'ADD_RECIPE_TO_SELECTED';
const REMOVE_RECIPE_FROM_SELECTED = 'REMOVE_RECIPE_FROM_SELECTED';
const REMOVE_RECIPES_FROM_RENDERED = 'REMOVE_RECIPES_FROM_RENDERED';

export const fetchRecipes = (page = 1, endIndex = 5) => async (dispatch) => {
	try {
		const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}`);
		const recipes = await response.json();
		// endIndex = 5 || inputValue

		dispatch({ type: FETCH_RECIPES, payload: { recipes, endIndex } });
	} catch (error) {
		console.log(error);
	}
};

export const addRenderedRecipes = (addAmount = 5) => async (dispatch, getState) => {
	const state = getState();
	const { shownRecipesIndex, recipes, renderedRecipes } = state;
	const endIndex = shownRecipesIndex + addAmount;
	const newRenderedRecipes = [...renderedRecipes, ...recipes.slice(shownRecipesIndex, endIndex)];
	const page = Math.floor(renderedRecipes[renderedRecipes.length - 1].id / 25) + 1;

	if (endIndex > recipes.length) {
		try {
			await dispatch(fetchRecipes(page));
		} catch (error) {
			console.log(error);
		}
	} else {
		dispatch({ type: ADD_RENDERED_RECIPES, payload: newRenderedRecipes, shownRecipesIndex: endIndex });
	}
};

export const addRecipeToSelected = (id) => { 
	return { type: ADD_RECIPE_TO_SELECTED, payload: id};
};

export const removeRecipeFromSelected = (id) => { 
	return { type: REMOVE_RECIPE_FROM_SELECTED, payload: id};
};

export const removeRecipeFromRendered = (recipesToRemove) => async (dispatch, getState) => {
	const state = getState();
	const { shownRecipesIndex, renderedRecipes } = state;
	const numRecipesToRemove = recipesToRemove.length;

	if (shownRecipesIndex + numRecipesToRemove > 25) {
		const numRecipesToAddFromNewData = shownRecipesIndex + numRecipesToRemove - 25;

		dispatch({ type: REMOVE_RECIPES_FROM_RENDERED, payload: recipesToRemove });
		dispatch(addRenderedRecipes(25 - shownRecipesIndex));
		const page = Math.floor(renderedRecipes[renderedRecipes.length - 1].id / 25) + 1;
		console.log(renderedRecipes);


		try {
			await dispatch(fetchRecipes(page, 0));
			dispatch(addRenderedRecipes(numRecipesToAddFromNewData));
		} catch (error) {
			console.log(error);
		}
	} else {
		dispatch({ type: REMOVE_RECIPES_FROM_RENDERED, payload: recipesToRemove });
		dispatch((addRenderedRecipes(numRecipesToRemove)));
	}
};
