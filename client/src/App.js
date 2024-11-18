import { Children } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Support from "./pages/Support/Support";
import Book from "./pages/Book/Book";
import Books from "./pages/Books/Books";
import BookSearch from "./pages/BookSearch/BookSearch"
import Contact from './components/Contact/Contact'
import "./app.scss"
import Categories from "./components/Categories/Categories";

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
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
      { path: "/books/category/:category", element: <Books /> },
      { path: "/book/:id", element: <Book /> },
      // { path: "/author/:authorName", element: <Author /> },
      // { path: "/publisher/:authorName", element: <Publisher /> },
      { path: "/search", element: <BookSearch /> },
      // { path: "/cart", element: <Cart /> },
      // { path: "/checkout", element: <Checkout /> },
      // { path: "/account", element: <Account /> },
      // { path: "/account/orders", element: <OrderHistory /> },
      // { path: "/wishlist", element: <Wishlist /> },
      // { path: "/deals", element: <Deals /> },
      // { path: "/support/:type", element: <Support /> },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
