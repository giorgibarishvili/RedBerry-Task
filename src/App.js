import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import Navbar from "./components/pages/Navbar";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact Component={HomePage} />
        {/* <Route path="/About" Component={About} /> */}
        {/* <Route path="/Projects" Component={Projects} /> */}
      </Routes>
      {/* <AnimatedRoutes /> */}
      {/* <Footer /> */}
      {/* <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      /> */}
    </Router>
  );
}

export default App;
