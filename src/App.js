import './App.css';
import { Header } from './components/Header';
import { Calendar } from './components/Calendar';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Calendar />
      </div>
    </>
  );
}

export default App;
