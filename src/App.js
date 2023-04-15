import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RecipePage } from './pages/RecipePage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
	return (
		<Routes>
			<Route path='/'>
				<Route index element={<HomePage />} />
				<Route path=":recipeId" element={<RecipePage />} />
			</Route>
		</Routes>
	);
}

export default App;
