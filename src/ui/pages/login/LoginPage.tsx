import {Dispatch, FC, SetStateAction, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Form, Card, FormItem, Input, FormSubmit, FormHelpers, Button, Alert} from "@hi-ui/hiui";
import logo from "../../../static/drawable/logo.svg"
import axios from "axios";
import {UserPref} from "../../../core/util/UserPref";
import {useNavigate} from "react-router-dom";
import {NavigateFunction} from "react-router/dist/lib/hooks";
import {TFunction} from "i18next";
import DriveIndexAPI from "../../../core/axios";

const LoginPage: FC = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const formRef = useRef<FormHelpers>(null)
    const [ loginDoing, setLoginDoing] = useState(false)
    const [ alert, setAlert ] = useState<string | null>(null)

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
        }}>
            <img
                src={logo}
                alt={"logo"}
                style={{
                    width: 70,
                    height: 70,
                    marginTop: 16,
                    marginBottom: 16,
                }}/>
            <div style={{
                fontSize: 20,
            }}>{t("login_title")}</div>
            {
                alert !== null && (
                    <Alert
                        title={<div>{alert}</div>}
                        closeable={true}
                        onClose={() => {setAlert(null)}}
                        style={{
                            width: 310,
                            marginTop: 20,
                        }}/>
                )
            }
            <Card
                style={{
                    width: 310,
                    marginTop: 24,
                }}>
                <Form
                    initialValues={{ username: UserPref.Username, password: process.env.REACT_APP_ADMIN_PASSWORD ?? "" }}
                    labelWidth={80}
                    rules={{
                        username: [
                            {
                                required: true,
                                type: "string",
                                message: t("login_username_empty"),
                            },
                        ],
                        password: [
                            {
                                required: true,
                                type: "string",
                                message: t("login_password_empty"),
                            },
                        ],
                    }}
                    innerRef={formRef}>
                    <FormItem
                        field={"username"} valueType={"string"}
                        label={t("login_username")} labelPlacement={"top"}
                        showColon={false}>
                        <Input />
                    </FormItem>
                    <FormItem
                        field={"password"} valueType={"string"}
                        label={t("login_password")} labelPlacement={"top"}
                        showColon={false}>
                        <Input type={"password"}/>
                    </FormItem>
                    <FormItem labelPlacement={"top"}>
                        <FormSubmit
                            type={"primary"}
                            onClick={(value, _) => {
                                if (value == null) {
                                    return
                                }
                                doLogin(
                                    value["username"], value["password"],
                                    setAlert, setLoginDoing,
                                    t, navigate
                                )
                            }}
                            style={{
                                width: "100%"
                            }}
                            loading={loginDoing}
                            disabled={loginDoing}>{
                            t("login_action")
                        }</FormSubmit>
                    </FormItem>
                </Form>
            </Card>
        </div>
    )
}

function doLogin(
    username: string, password: string,
    showAlert: Dispatch<SetStateAction<string | null>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    t: TFunction<"translation", undefined>,
    navigate: NavigateFunction,
) {
    if (username === '') {
        showAlert(t("login_username_empty"))
        return
    }
    if (password === '') {
        showAlert(t("login_password_empty"))
        return
    }
    setLoading(true)
    setTimeout(() => {
        DriveIndexAPI.post("/api/login", {
            username: username,
            password: password,
        }).then(value => {
            if (value.data["code"] != 200) {
                showAlert(t("login_failed") + value.data["message"])
                return
            }
            const data = value.data["data"]
            UserPref.Login = true
            UserPref.AccessToken = data["auth"]["token"]
            UserPref.Role = data["auth"]["role"]
            UserPref.Username = data["username"]
            UserPref.Nick = data["nick"]
            setLoading(false)
            navigate("/home")
        }).catch(error => {
            showAlert(t("login_failed") + error.message)
        }).finally(() => {
            setLoading(false)
        })
    }, 500)
}

export default LoginPage