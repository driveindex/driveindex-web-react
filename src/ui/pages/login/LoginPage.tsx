import {FC, useRef} from "react";
import {useTranslation} from "react-i18next";
import {Form, Card, FormItem, Input, FormSubmit, FormHelpers} from "@hi-ui/hiui";
import logo from "../../../static/drawable/logo.svg"
import {UserPref} from "../../../core/util/UserPref";

const LoginPage: FC = () => {
    const { t } = useTranslation()

    const formRef = useRef<FormHelpers>(null)

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
            <Card
                style={{
                    width: 310,
                    marginTop: 24,
                }}>
                <Form
                    initialValues={{ username: UserPref.Username, password: "" }}
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
                                console.log("Get form value:", value)
                            }}
                            style={{
                                width: "100%"
                            }}>{
                            t("login_action")
                        }</FormSubmit>
                    </FormItem>
                </Form>
            </Card>
        </div>
    )
}

export default LoginPage