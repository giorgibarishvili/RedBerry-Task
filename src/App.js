import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import Navbar from "./components/pages/Navbar";
import ListingPage from "./components/pages/ListingPage";
import AddListing from "./components/pages/AddListing";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact Component={HomePage} />
        <Route path="/listing" Component={ListingPage} />
        <Route path="/add-listing" Component={AddListing} />
      </Routes>
    </Router>
  );
}

export default App;
