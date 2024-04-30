import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/organisms/Header";
import Router from "./routes/router";
import AuthProvider from "./store/authentication/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
