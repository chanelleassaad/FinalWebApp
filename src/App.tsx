import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/organisms/Header";
import Router from "./routes/router";
import AuthProvider from "./store/authentication/AuthProvider";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Header />
            <Router />
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </div>
  );
}

export default App;
