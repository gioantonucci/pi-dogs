import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Home from "./components/home";
import PostDog from "./components/postDog";
import DogDetail from "./components/dogDetail";

function App() {
  return (
    <>
      <div className="App">
        <Route path="/home/:id">
          <DogDetail />
        </Route>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/dog">
          <PostDog />
        </Route>
      </div>
    </>
  );
}

export default App;
