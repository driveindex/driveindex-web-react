import React, {FC, lazy, Suspense} from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {LoginExpired} from "../../core/hooks/useLoginExpiredDialog";
import {Loading} from "@hi-ui/hiui";

const NotFoundPage = lazy(() => import("./404/NotFoundPage"))
const HomePage = lazy(() => import("./home/HomePage"))
const LoginPage = lazy(() => import("./login/LoginPage"))
const SharePage = lazy(() => import("./share/SharePage"))

const ProfilePage = lazy(() => import("./home/profile/ProfilePage"))
const ProfileCommonFragment = lazy(() => import("../fragments/profile/ProfileCommonFragment"))
const ProfileAccountFragment = lazy(() => import("../fragments/profile/ProfileAccountFragment"))
const ProfileDrawManageFragment = lazy(() => import("../fragments/profile/ProfileDriveManageFragment"))
const ProfilePasswordFragment = lazy(() => import("../fragments/profile/ProfilePasswordFragment"))

const App: FC = () => {
    const Fallback: FC = () => {
        return (
            <Loading style={{height: 300}} />
        )
    }
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
                            <Route index element={<Navigate to={"/profile/common"} replace />} />
                            <Route path={"/profile/common"} element={
                                <Suspense fallback={<Fallback />}>
                                    <ProfileCommonFragment />
                                </Suspense>
                            } />
                            <Route path={"/profile/account"} element={
                                <Suspense fallback={<Fallback />}>
                                    <ProfileAccountFragment />
                                </Suspense>
                            } />
                            <Route path={"/profile/drive"} element={
                                <Suspense fallback={<Fallback />}>
                                    <ProfileDrawManageFragment />
                                </Suspense>
                            } />
                            <Route path={"/profile/drive"} element={
                                <Suspense fallback={<Fallback />}>
                                    <ProfileDrawManageFragment />
                                </Suspense>
                            } />
                            <Route path={"/profile/password"} element={
                                <Suspense fallback={<Fallback />}>
                                    <ProfilePasswordFragment />
                                </Suspense>
                            } />
                        </Route>
                    </Route>
                    <Route path={"*"} element={<NotFoundPage />} />
                </Routes>
            </LoginExpired>
        </BrowserRouter>
    )
}

export default App
