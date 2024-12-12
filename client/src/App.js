import { Children, useState, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Navbarless from "./components/Navbar/Navbarless";
import Home from "./pages/Home/Home";
import Support from "./pages/Support/Support";
import Book from "./pages/Book/Book";
import BookSearch from "./pages/BookSearch/BookSearch"
import Contact from './components/Contact/Contact'
import Signup from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Publisher from "./pages/Publisher/Publisher";
import "./app.scss"
import { store, persistor } from "../../client/src/redux/store";
import User from "./pages/User/User";

const Layout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Get login state from Redux
  return (
    <div className="app">
      {isLoggedIn ? <Navbar /> : <Navbarless />}
      <Outlet />
      <Contact />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/book/:id", element: <Book /> },
      { path: "/user/:type", element: <User /> },
      { path: "/order/:type", element: <User /> },
      { path: "/search", element: <BookSearch /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/publisher", element: <Publisher /> },
      { path: "/support/:type", element: <Support /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;