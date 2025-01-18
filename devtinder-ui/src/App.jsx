import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Feed from "./components/Feed";
import { Provider } from 'react-redux'
import store from "./redux/appStore";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Signup from "./components/Signup";
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
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/feed"
              element={<Feed />}
            />
             <Route
              path="/profile"
              element={<Profile />}
            />
             <Route
              path="/connections"
              element={<Connections />}
            />
             <Route
              path="/requests"
              element={<Requests />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
 
  );
}

export default App;
