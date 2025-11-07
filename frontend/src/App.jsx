import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Places } from './pages/Places';
import { CabCalculatorPage } from './pages/CabBooking';
import { HiddenGems  } from './pages/HiddenGems';
import { Auth } from './pages/Auth';
import './App.css'
import { Routes,Route} from 'react-router-dom';
import { Toaster } from "sonner";


function App() {

  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<Places/>} />
          <Route path="/cab-booking" element={<CabCalculatorPage />} />
          <Route path="/hidden-gems" element={<HiddenGems />} />
          <Route path="/signin" element={<Auth />} />
        </Routes>
        <Toaster 
              position="bottom-center" 
              richColors 
              closeButton 
              duration={3000}
        />
      
    </>
  )
}

export default App
