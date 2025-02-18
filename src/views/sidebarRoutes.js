import { allRoutes } from './routes'; // Import all routes
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {allRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
}

export default App;