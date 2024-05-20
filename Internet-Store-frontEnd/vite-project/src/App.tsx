import 'bootstrap/dist/css/bootstrap.min.css';
import MainBar from './NavBar';
import Registration from './Registration';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Home';
import CatalogPage from './Catalog';
import { useEffect, useState } from 'react';
import Profile from './Profile';
import FilteredPage from './FilteredPage';
import AdminDashboard from './AdminDashboard';
import AdminProfile from './AdminPages/AdminProfile';
import ModelPage from './ModelPage';
import AdminAddNewModelPage from './AdminPages/AdminAddNewModel';
import Cart from './Cart';
import { useAppDispatch } from './redux/Hooks';
import { clearstorage } from './redux/IdModelSlice';
import AdminAddNewCategoryPage from './AdminPages/AdminAddNewCategory';
import FAQPage from './FAQ';
import AboutPage from './About';
import Order from './Order';
import GetOrdersPage from './AdminPages/GetOrders';
import Blog from './Blog';

function App() {
  const [selectedTab, setSelectedTab] = useState(null); // хук для выбранного состояния страницы админа
  const dispatch=useAppDispatch();
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => { // Объявляем хук
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
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    localStorage.setItem('isUser', 'false')
    dispatch(clearstorage())
  };

  const handleLogoutAdmin = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedInAdmin(false);
    localStorage.setItem('isAdmin', 'false')
    dispatch(clearstorage())
  };

  return (
    <Router>
      <MainBar
        isLoggedIn={isLoggedIn}
        handleLogoutUser={handleLogoutUser}
        isLoggedInAdmin={isLoggedInAdmin}
        handleLogoutAdmin={handleLogoutAdmin}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Registration setIsLoggedIn={setIsLoggedIn} setIsLoggedInAdmin={setIsLoggedInAdmin} />} /*Передаём этот хук в функции страницы регистрации*//>  
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="FAQ" element={<FAQPage/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/catalog/filtered?" element={<FilteredPage />} />
        <Route path="/about" element={<AboutPage/>}/>
        {isLoggedInAdmin && <Route path="/admin-dashboard/*" element={<AdminDashboard selectedTab={selectedTab} setSelectedTab={setSelectedTab} />} />}
        {isLoggedInAdmin && <Route path="/profile-admin" element={<AdminProfile />} />}
        {isLoggedInAdmin && <Route path="/admin-dashboard/add-product" element={<AdminAddNewModelPage />} />}
        {isLoggedInAdmin && <Route path="/admin-dashboard/add-category" element={<AdminAddNewCategoryPage />} />}
        {isLoggedInAdmin && <Route path="/admin-dashboard/get-orders" element={<GetOrdersPage/>} />}
        <Route path="/catalog/id?" element={<ModelPage />} />
        <Route path="/cart" element={<Cart/>}/>
        {isLoggedIn && <Route path="/cart/order?" element={<Order />} />}
        <Route path="/blog" element={<Blog/>} />
      </Routes>
    </Router>
  );
}

export default App;
