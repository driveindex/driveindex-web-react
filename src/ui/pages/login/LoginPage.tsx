import {FC, useRef} from "react";
import {useTranslation} from "react-i18next";
import {Form, Card, FormItem, Input, FormSubmit, FormHelpers, Button} from "@hi-ui/hiui";

const LoginPage: FC = () => {
    const { t } = useTranslation()

    const formRef = useRef<FormHelpers>(null)

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: 'center'
        }}>
            <Card
                title={t("login_title")}
                style={{
                    width: 500,
                }}>
                <Form
                    initialValues={{ username: `${localStorage["username"] ?? ""}`, password: "" }}
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
                    <FormItem
                        labelPlacement={"top"}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}>
                        <FormSubmit
                            type={"primary"}
                            onClick={(value, _) => {
                                if (value == null) {
                                    return
                                }
                                console.log("Get form value:", value)
                            }}
                            style={{
                                width: 180,
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