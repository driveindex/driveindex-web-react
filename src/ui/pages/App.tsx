import React, {FC} from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import HomePage from "./home/HomePage";
import ProfilePage from "./home/profile/ProfilePage";
import SharePage from "./share/SharePage";
import LoginPage from "./login/LoginPage";
import {LoginExpired} from "../../core/hooks/useLoginExpiredDialog";

const App: FC = () => {
    return (
        <BrowserRouter>
            <LoginExpired>
                <Routes>
                    <Route path={"/"}>
                        <Route index element={<Navigate to={"/home"} replace />} />
                        <Route path={"/home"} element={<HomePage />} />
                        <Route path={"/login"} element={<LoginPage />} />
                        <Route path={"/share"} element={<SharePage />} />
                        <Route path={"/profile"} element={<ProfilePage />}>

                        </Route>
                    </Route>
                </Routes>
            </LoginExpired>
        </BrowserRouter>
    )
}

export default App
