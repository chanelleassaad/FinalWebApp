import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/organisms/Header";
import Router from "./routes/router";
import { Provider } from "react-redux";
import store from "./store/store";
import AuthProvider from "./store/authentication/AuthProvider";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <Header />
            <Router />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
