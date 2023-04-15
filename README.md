# Recipe List App
This is a recipe list app built with React and Redux, using the Punk API as the data source. The app displays a list of recipes and allows the user to select and delete them, as well as navigate to a single recipe page.

## Getting Started
### To get started with the project, clone the repository and install the dependencies:

- Copy code
```
git clone https://github.com/svitjojo/list-of-beer-recipes.git
```
- Go into folder
```
cd recipe-list-app
```
- Install packages
```
npm install
```

### To run the app in development mode:

```
npm start
```
This will start the development server and open the app in your default browser. The app will be available at http://localhost:3000.

### To build the app for production:

```
npm run build
```
This will create a build directory with the optimized production build.

## Features
- Renders a list of recipes fetched from the Punk API.
- Uses lazy loading to render only a subset of the recipes at a time, for improved performance.
- Allows the user to select and delete multiple recipes at once.
- Implements client-side routing for single recipe pages.
- Supports browser history navigation with the back button.

## Project Structure
### The project is organized into several directories:

- src contains the source code for the app.
- components contains the React components used in the app.
- reducers contains the Redux reducers used in the app.
- actions contains the Redux actions used in the app.
- api contains the code for fetching data from the Punk API.
- public contains static assets used in the app, such as the index.html file and the app icon.

## Technologies Used
- React
- Redux
- Redux-thunk
- React Router
- Bootstrap
