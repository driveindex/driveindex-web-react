import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider} from "react-router-dom";
import HomePage from "./component/home/HomePage";
import Share from "./component/share/SharePage";
import SharePage from "./component/share/SharePage";
import UserPage from "./component/user/UserPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/share/:share" element={<SharePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/user" element={<UserPage />}>
                
            </Route>
        </>
    )
)


ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
