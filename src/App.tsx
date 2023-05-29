import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TopNavigator } from "./components/topNavigator";
import { MainPage } from "./components/mainPage";
import { StorePage } from "./components/storePage";
import { PAGE } from "./utils/constants";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<><TopNavigator page={PAGE.Home} /><MainPage /></>} />
          <Route path="/home" element={<><TopNavigator page={PAGE.Home} /><MainPage /></>} />
          <Route path="/store" element={<><TopNavigator page={PAGE.Store} /><StorePage /></>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
