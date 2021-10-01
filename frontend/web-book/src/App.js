import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Contacts from './Contacts/Contacts';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Contacts}></Route>
      </Switch>
    </Router>
  );
}

export default App;
