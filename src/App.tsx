import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { NotFound } from './pages/error/NotFound';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';

function App() {
  return (
    <>
      <Notifications position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
