
import 'bootstrap/dist/css/bootstrap.min.css';
import MainBar from './NavBar';
import Registration from './Registration';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './Home';
import CatalogPage from './Catalog';
function App(){
  
  return (
    
      <Router>
      <MainBar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Registration />} />
        <Route path="/catalog" element={<CatalogPage/>}/>
        {/* Добавьте здесь другие маршруты, если необходимо */}
      </Routes>
    </Router>
  
    
  );
  
  
}

export default App;
