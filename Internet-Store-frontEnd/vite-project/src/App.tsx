
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
import AdminProfile from './AdminPages/AdminProfile';

function App(){
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const accessToken = localStorage.getItem('accessToken');
    const isUser = localStorage.getItem('isUser') === 'true';
    return accessToken !== null && isUser;
  });
  
  const [isLoggedInAdmin, setIsLoggedInAdmin] = useState(() => {
    const accessToken = localStorage.getItem('accessToken');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    return accessToken !== null && isAdmin;
  });
  const handleLogoutUser = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };
  const handleLogoutAdmin = () => { // Функция для выхода администратора
    localStorage.removeItem('accessToken');
    setIsLoggedInAdmin(false);
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
        {isLoggedInAdmin && (
          <Route path="/profile-admin" element={<AdminProfile/>}/>
        )}
        
        
      </Routes>
    </Router>
  
    
  );
  
  
}

export default App;
