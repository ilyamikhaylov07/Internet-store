
import 'bootstrap/dist/css/bootstrap.min.css';
import MainBar from './NavBar';
import Registration from './Registration';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './Home';
import CatalogPage from './Catalog';
import { useEffect, useState } from 'react';
import Profile from './Profile';
import FilteredPage from './FilteredPage';
import AdminDashboard from './AdminDashboard';
function App(){
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('accessToken') !== null);
  const [isLoggedInAdmin, setIsLoggedInAdmin] = useState(localStorage.getItem('accessToken') !== null);

  const handleLogoutUser = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };
  const handleLogoutAdmin = () => { // Функция для выхода администратора
    localStorage.removeItem('accessToken');
    setIsLoggedInAdmin(false);
    location.reload();
  };
  
  return (
    
      <Router>
      <MainBar isLoggedIn={isLoggedIn} handleLogoutUser={handleLogoutUser} isLoggedInAdmin={isLoggedInAdmin} handleLogoutAdmin={handleLogoutAdmin}/>
      <Routes>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/login" element={<Registration setIsLoggedIn={setIsLoggedIn} setIsLoggedInAdmin={setIsLoggedInAdmin} />} />
        <Route path="/catalog" element={<CatalogPage/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/catalog/filtered?" element={<FilteredPage/>}/>
        {isLoggedInAdmin && (
          <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
        )}
      </Routes>
    </Router>
  
    
  );
  
  
}

export default App;
