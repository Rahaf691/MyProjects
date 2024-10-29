import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import CartPage from "../pages/CartPage";
import HomePage from "../pages/HomePage";
import Product from "../pages/Product";
import AddProduct from "../pages/AddProduct";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useTranslation } from "react-i18next";



export const routes = [
    {
        path: "/",
        element: <HomePage />,
        name: "Home",
    },

    { path: "/cart", element: <CartPage />, name: "Cart" },
    { path: "/product/:id", element: <Product /> },
    {
        path: '/addProduct',
        element: <AddProduct />,
        name: 'add Product'
    },
    {
        path: '/login',
        element: <Login />,
        name: 'Login'
    },
];


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: routes.map((route) => ({
            path: route.path,
            element: route.element,
        })),

    },
]);
