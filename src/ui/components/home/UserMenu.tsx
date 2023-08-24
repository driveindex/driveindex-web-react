import {Button} from "@hi-ui/hiui";
import React, {FC} from "react";
import {NavigateFunction} from "react-router/dist/lib/hooks";
import {UserPref} from "../../../core/util/UserPref";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useQuery} from "../../../core/util/useQuery";

const UserMenu: FC = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <div>
            <Button
                type="default" appearance="link"
                style={{ width: 80 }}
                onClick={() => goToProfile(navigate)}>{
                t("home_go_to_profile")
            }</Button>
            <div style={{ height: 1, width: "100%", backgroundColor: "lightgray", marginTop: 10, marginBottom: 10 }} />
            <Button
                type="danger" appearance="link"
                style={{ width: 80 }}
                onClick={() => doLogout(navigate)}>{
                t("home_logout")
            }</Button>
        </div>
    )
}

export default UserMenu

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