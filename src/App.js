import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import Navbar from "./components/pages/Navbar";
import ListingPage from "./components/pages/ListingPage";
import AddListing from "./components/pages/AddListing";
import '@fontsource/firago/400.css';
import '@fontsource/firago/500.css';
import '@fontsource/firago/600.css';
import '@fontsource/firago/700.css';
import '@fontsource/firago/800.css';
import '@fontsource/firago/900.css';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact Component={HomePage} />
        <Route path="/listing/:id" element={<ListingPage />} />
        <Route path="/add-listing" Component={AddListing} />
      </Routes>
    </Router>
  );
}

export default App;
