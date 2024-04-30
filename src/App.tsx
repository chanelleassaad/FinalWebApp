import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/organisms/Header";
import Router from "./routes/router";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
