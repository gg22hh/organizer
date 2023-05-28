import './App.css';
import { Header } from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main'
import { Auth } from './pages/Auth';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/organizer" element={<Main />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
