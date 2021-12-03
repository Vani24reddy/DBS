import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Login from './components/login/login';
import Header from './components/Header';
import Footer from './components/Footer';
import Landingpage from './components/Landingpage';


function App() {
  return (
    <div className="App">
      <Router>
       <Header /> 
      <div className="container">
            <Switch>
              <Route exact path="/" component={Login}/>
              <Route  path="/Landingpage" component={Landingpage}/>
            <Route  path="/date" component={Date} />
                          {/* <Route exact path="/add-employee" component={AddEmployee}/>
              <Route path="/edit-employee/:id" component={AddEmployee} / */}
            </Switch>
      </div>
      <Footer />
      </Router>
    </div>
  );
}

export default App;