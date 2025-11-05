import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Places } from './pages/Places';
import './App.css'
import { Routes,Route} from 'react-router-dom';

function App() {

  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<Places/>} />
        </Routes>
      
    </>
  )
}

export default App
