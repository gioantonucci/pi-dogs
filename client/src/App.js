import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import LandingPage from "./components/landingPage"
import Home from './components/home';
import SearchBar from './components/searchBar';
import PostDog from './components/postDog';
import DogDetail from './components/dogDetail';


function App() {
  return (
    <>
    <BrowserRouter>
    <div className="App">
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path='/home'>
          <SearchBar />
          <Home />
        </Route>
        <Route path='/dog'>
          <PostDog />
        </Route>
        <Route path='/home/:id'>
          <DogDetail />
        </Route>
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;
