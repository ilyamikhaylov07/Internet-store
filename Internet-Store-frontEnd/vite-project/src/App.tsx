
import 'bootstrap/dist/css/bootstrap.min.css';
import MainBar from './NavBar';
import Registration from './Registration';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './Home';
import CatalogPage from './Catalog';
import { useEffect, useState } from 'react';
import Profile from './Profile';
function App(){
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('accessToken') !== null);

  const handleLogoutUser = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };
  return (
    
      <Router>
      <MainBar isLoggedIn={isLoggedIn} handleLogoutUser={handleLogoutUser}/>
      <Routes>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/login" element={<Registration setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/catalog" element={<CatalogPage/>}/>
        <Route path="/profile" element={<Profile/>}/>
        {/* Добавьте здесь другие маршруты, если необходимо */}
      </Routes>
    </Router>
  
    
  );
  
  
}

export default App;
