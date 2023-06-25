import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "./components/mainPage";
import { StorePage } from "./components/storePage";
import { AccountPage } from "./components/accountPage";
import { PastOrdersPage } from "./components/pastOrdersPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<><MainPage /></>} />
          <Route path="/store" element={<><StorePage /></>} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/past-orders" element={<PastOrdersPage />} />
          <Route path="*" element={<Navigate to={{pathname: "/"}} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
