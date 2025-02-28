import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Feed from "./components/Feed";
import { Provider } from 'react-redux'
import store from "./redux/appStore";
import Profile from "./components/Profile";
function App() {
  return (

    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Body />}
          >
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/feed"
              element={<Feed />}
            />
             <Route
              path="/profile"
              element={<Profile />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
 
  );
}

export default App;
