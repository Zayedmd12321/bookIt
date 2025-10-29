import { Routes, Route } from 'react-router-dom';

// Import your page components
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import ResultPage from './pages/ResultPage';

// Import your Layout component
import Layout from './components/Layout';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <SearchProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="details/:id" element={<DetailsPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="result" element={<ResultPage />} />
        </Route>
      </Routes>
    </SearchProvider>
  );
}

export default App;