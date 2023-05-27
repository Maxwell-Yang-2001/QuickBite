import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TopNavigator } from "./components/topNavigator";
import { MainPage } from "./components/mainPage";
import { StorePage } from "./components/storePage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <TopNavigator />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/store" element={<StorePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
