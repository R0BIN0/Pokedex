import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import PokemonDetails from './pages/PokemonDetails/PokemonDetails';



function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/pokemon/:id" exact component={PokemonDetails}/>
      </Switch>
    </Router>
  );
}

export default App;
