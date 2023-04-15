import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomePage } from './pages/HomePage';
import { RecipePage } from './pages/RecipePage';

function App() {
	return (
		<>
			<Routes>
				<Route path='/'>
					<Route index element={<HomePage />} />
					<Route path=":recipeId" element={<RecipePage />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
