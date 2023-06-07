import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "./components/mainPage";
import { StorePage } from "./components/storePage";
import { AccountPage } from "./components/commons/accountPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<><MainPage /></>} />
          <Route path="/home" element={<><MainPage /></>} />
          <Route path="/store" element={<><StorePage /></>} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
