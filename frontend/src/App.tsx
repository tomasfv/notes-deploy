import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NotesPage from './pages/NotesPage';
import CategoriesPage from './pages/CategoriesPage';
import ArchivedPage from './pages/ArchivedPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<NotesPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="archived" element={<ArchivedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
