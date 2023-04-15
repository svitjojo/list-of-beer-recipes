const initialState = {
  recipes: [],
  renderedRecipes: [],
  selectedRecipes: [],
  lastShownRecipeIndex: 0,
  page: 1
};

export const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_RECIPES':
      return {
        ...state,
        recipes: action.payload.recipes,
        renderedRecipes: state.renderedRecipes.length > 5
          ? [...state.renderedRecipes, ...action.payload.recipes.slice(0, action.payload.lastShownRecipeIndex)]
          : action.payload.recipes.slice(0, action.payload.lastShownRecipeIndex),
        lastShownRecipeIndex: action.payload.lastShownRecipeIndex,
        page: action.payload.page 
      };
    case 'ADD_RENDERED_RECIPES':
      return {
        ...state,
        renderedRecipes: action.payload.renderedRecipes,
        lastShownRecipeIndex: action.payload.lastShownRecipeIndex
      };
    case 'ADD_RECIPE_TO_SELECTED':
      return {
        ...state,
        selectedRecipes: [...state.selectedRecipes, state.renderedRecipes.find(({ id }) => id === action.payload)],
      };
    case 'REMOVE_RECIPE_FROM_SELECTED':
      return {
        ...state,
        selectedRecipes: state.selectedRecipes.filter(({ id }) => id !== action.payload)
      };
    case 'REMOVE_RECIPES_FROM_RENDERED':
      return {
        ...state,
        renderedRecipes: state.renderedRecipes.filter(({ id }) => !action.payload.some(recipe => recipe.id === id)),
        selectedRecipes: []
      };
    default:
      return state;
  }
};
