import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Individual from './pages/Individual';
import Education from './pages/Education';
import Group from './pages/Group';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/individual" element={<Individual />} />
          <Route path="/group" element={<Group />} />
          <Route path="/education" element={<Education />} />
          <Route path="/settings" element={<Individual />} />
        </Route>
        <Route path="*" element={<Navigate to="/individual" />} />
      </Routes>
    </BrowserRouter>
  );
}
