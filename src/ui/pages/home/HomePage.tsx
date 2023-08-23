import {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {UserPref} from "../../../core/util/UserPref";
import logo from "../../../static/drawable/logo.svg"
import {useTranslation} from "react-i18next";
import {Avatar, Button, Popover} from "@hi-ui/hiui";
import {NavigateFunction} from "react-router/dist/lib/hooks";

const HomePage: FC = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!UserPref.Login) {
            navigate("/login")
        }
    }, [navigate]);
    const { t } = useTranslation()

    const userMenu = (
        <div>
            <Button
                type="default" appearance="link"
                style={{ width: 80 }}
                onClick={() => goToProfile(navigate)}>{
                t("home_go_to_profile")
            }</Button>
            <div style={{ height: 1, width: "100%", backgroundColor: "gray", marginTop: 10, marginBottom: 10 }} />
            <Button
                type="danger" appearance="link"
                style={{ width: 80 }}
                onClick={() => doLogout(navigate)}>{
                t("home_logout")
            }</Button>
        </div>
    )

    return (
        <>
            <div style={{
                display: "flex",
                alignItems: "center",
                height: 64,
                paddingLeft: 24,
                paddingRight: 24,
            }}>
                <img style={{ width: 34, height: 34 }} src={logo}/>
                <div style={{ marginLeft: 10, color: "#1f2733" }}><strong>{t("title")}</strong></div>
                <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                    <Popover placement={"bottom-end"} content={userMenu}>
                        <Avatar initials={UserPref.Username.charAt(0).toUpperCase()} />
                    </Popover>
                </div>
            </div>
        </>
    )
}

function doLogout(navigate: NavigateFunction) {
    UserPref.Role = ""
    UserPref.AccessToken = ""
    UserPref.Nick = ""
    UserPref.Login = false
    navigate("/login")
}

function goToProfile(navigate: NavigateFunction) {
    navigate("/profile")
}

export default HomePage