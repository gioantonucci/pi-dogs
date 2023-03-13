import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Home from "./components/home";
import PostDog from "./components/postDog";
import DogDetail from "./components/dogDetail";
import Err from "./components/errorNotFound";
import About from "./components/about";
import EditDog from "./components/editDog";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
    <Route exact path='/' component = {LandingPage}/>
    <Route exact path='/home' component = {Home}/>
    <Route exact path='/post' component = {PostDog}/>
    <Route exact path='/edit/:id' component = {EditDog}/>
    <Route exact path= '/home/:id' component = {DogDetail}/>
    <Route exact path='/about' component={About}/>
    <Route path= '*' component = {Err}/>
    </Switch>
    </div>
    </BrowserRouter>
 
   
  );
}

export default App;
