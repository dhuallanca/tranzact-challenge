import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Contacts from './Contacts/Contacts';
import ContactEdit from './Contacts/ContactEdit';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Container fluid="md">
      <Router>
        <Switch>
          <Route exact path="/" component={Contacts}></Route>
          <Route exact path="/Contact/:id" component={ContactEdit}></Route>
          <Route exact path="/Contact" component={ContactEdit}></Route>
        </Switch>
      </Router>
    </Container>

  );
}

export default App;
