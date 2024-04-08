import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationModal from './Registration';
import 'bootstrap/dist/css/bootstrap.min.css';


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Интернет-магазин</h1>
        </header>
        <main>
          <Switch>
            <Route path="/registration">
              <RegistrationModal />
            </Route>
            {/* Другие маршруты, если есть */}
          </Switch>
        </main>
        <footer>
          <p>Автор: Ваше Имя</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
