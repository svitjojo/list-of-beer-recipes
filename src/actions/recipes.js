const FETCH_RECIPES = 'FETCH_RECIPES';
const ADD_RENDERED_RECIPES = 'ADD_RENDERED_RECIPES';
const ADD_RECIPE_TO_SELECTED = 'ADD_RECIPE_TO_SELECTED';
const REMOVE_RECIPE_FROM_SELECTED = 'REMOVE_RECIPE_FROM_SELECTED';
const REMOVE_RECIPES_FROM_RENDERED = 'REMOVE_RECIPES_FROM_RENDERED';

export const fetchRecipes = (page = 1, endIndex = 10) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}`);
			const recipes = await response.json();

			dispatch({ type: FETCH_RECIPES, payload: { recipes, lastShownRecipeIndex: endIndex, page } });
		} catch (error) {
			console.log(error);
		}
	};
};

export const addRenderedRecipes = (addAmount = 5) => async (dispatch, getState) => {
	const state = getState();
	const { lastShownRecipeIndex, recipes, renderedRecipes, page } = state;
	const endIndex = lastShownRecipeIndex + addAmount;
	const newRenderedRecipes = [...renderedRecipes, ...recipes.slice(lastShownRecipeIndex, endIndex)];

	if (endIndex > recipes.length) {
		try {
			await dispatch(fetchRecipes(page + 1));
		} catch (error) {
			console.log(error);
		}
	} else {
		dispatch({ type: ADD_RENDERED_RECIPES, payload: { renderedRecipes: newRenderedRecipes, lastShownRecipeIndex: endIndex } });
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
	const { lastShownRecipeIndex, page, renderedRecipes } = state;

	if (!recipesToRemove) {
		const firstFiveRecipes = renderedRecipes.slice(0, 5);

		dispatch({ type: REMOVE_RECIPES_FROM_RENDERED, payload: firstFiveRecipes });

		return;
	}
	
	const numRecipesToRemove = recipesToRemove.length;

	if (lastShownRecipeIndex + numRecipesToRemove > 25) {
		const numRecipesToAddFromNewData = lastShownRecipeIndex + numRecipesToRemove - 25;

		dispatch({ type: REMOVE_RECIPES_FROM_RENDERED, payload: recipesToRemove });
		dispatch(addRenderedRecipes(25 - lastShownRecipeIndex));

		try {
			await dispatch(fetchRecipes(page + 1, 0));
			dispatch(addRenderedRecipes(numRecipesToAddFromNewData));
		} catch (error) {
			console.log(error);
		}
	} else {
		dispatch({ type: REMOVE_RECIPES_FROM_RENDERED, payload: recipesToRemove });
		dispatch((addRenderedRecipes(numRecipesToRemove)));
	}
};
