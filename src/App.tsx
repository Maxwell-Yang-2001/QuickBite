import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { TopNavigator } from "./components.tsx/top-navigator";
import { MainPage } from "./pages/main-page";
import { StorePage } from "./pages/store-page";

const App = () => {
  let page = "main";
  return (
    <div className="App">
      <TopNavigator />
      {page === "main" ? <MainPage /> : <StorePage />}
    </div>
  );
};

export default App;
