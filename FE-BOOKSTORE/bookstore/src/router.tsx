import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import Basket from "./pages/Basket";
import BookDetail from "./pages/BookDetail";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Order from "./pages/Order";
import OrderList from "./pages/OrderList";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import Error from "./components/common/Error";

const routeList = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/books",
    element: <Books />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/reset",
    element: <ResetPassword />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/book/:bookId",
    element: <BookDetail />,
  },
  {
    path: "/basket",
    element: <Basket />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/orderlist",
    element: <OrderList />,
  },
];

export const router = createBrowserRouter(
  routeList.map((item) => {
    return {
      ...item,
      element: <Layout>{item.element}</Layout>,
      errorElement: <Error />,
    };
  })
);
