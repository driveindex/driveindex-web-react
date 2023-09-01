import React, {FC, HTMLAttributes, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {
    Avatar,
    Breadcrumb,
    Button,
    Card,
    List,
    ListDataItem,
    ListItem,
    message, Modal,
    Row,
    Scrollbar
} from "@hi-ui/hiui";
import {LoadingCover, useLoading} from "../../../../core/hooks/useLoading";
import {BreadcrumbDataItem} from "@hi-ui/breadcrumb/lib/types/types";
import {DriveIndexAPI} from "../../../../core/axios";
import {AxiosResponse} from "axios";
import {checkLoginStatus, useLoginExpiredDialog} from "../../../../core/hooks/useLoginExpiredDialog";
import {useLocation, useNavigate} from "react-router-dom";
import "./ProfileDriveManageFragment.css"
import {PlusOutlined, DeleteOutlined, BarsOutlined} from "@hi-ui/icons"
import Ic_OneDrive from "../../../../static/drawable/drive/onedrive.svg"
import Ic_Unknown from "../../../../static/drawable/drive/unknown.svg"
import RespLayoutProps from "../../../../core/props/RespLayoutProps";
import {useBreakpointDown, useBreakpointUp} from "../../../../core/hooks/useViewport";
import {asInitials} from "../../../../core/util/_String";
import ClientCreationDialog from "../../../components/profile/drive/ClientCreationDialog";


type ClientBreadcrumbDataItem = BreadcrumbDataItem & {
    targetClient?: string
}

const ProfileDriveManageFragment: FC = () => {
    const { t } = useTranslation()

    const { state } = useLocation()

    const isMdUp = useBreakpointUp("md")
    const showAsMobile = useBreakpointDown("sm")

    return (
        <div
            className={"dirveindex-profile-drive"}
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%"
            }}>
            <h2>{t("profile_drive_title")}</h2>
            <p>{t("profile_drive_text")}</p>
            <LoadingCover>
                <DriveList client={state} isMdUp={isMdUp} showAsMobile={showAsMobile} />
            </LoadingCover>
        </div>
    )
}

interface ClientState {
    id: string,
    name: string,
    type: string,
}

interface DriveListProps {
    client: ClientState | null
}
const DriveList: FC<DriveListProps & RespLayoutProps> = (props) => {
    const { t } = useTranslation()

    const [ clientCreating, showClientCreating ] = useState(false)
    const [ clientList, setClientList ] = useState<any[]>([])
    const [ accountCreating, showAccountCreating ] = useState(false)
    const [ accountList, setAccountList ] = useState<any[]>([])

    const navigate = useNavigate()
    const { setLoading } = useLoading()
    const showLoginExpiredDialog = useLoginExpiredDialog()

    const [
        breadcrumbData,
        setBreadcrumbData
    ] = useState<ClientBreadcrumbDataItem[]>()
    const refreshContent = () => {
        setLoading(true)
        setTimeout(() => {
            let request: Promise<AxiosResponse<any, any>>
            if (props.client === null) {
                request = DriveIndexAPI.get("/api/user/client")
            } else {
                request = DriveIndexAPI.get("/api/user/account?client_id="+props.client.id)
            }
            request.then((resp) => {
                if (!checkLoginStatus(resp, showLoginExpiredDialog)) {
                    return
                }
                if (resp.data["code"] !== 200) {
                    message.open({
                        title: t("profile_drive_failed") + resp.data["message"],
                        type: "error",
                    })
                    return;
                }
                if (props.client === null) {
                    setClientList(resp.data["data"])
                    setAccountList([])
                } else {
                    setAccountList(resp.data["data"])
                }
            }).finally(() => {
                setLoading(false)
            })
        }, 200)
    }
    useEffect(() => {
        const base: ClientBreadcrumbDataItem[] = [
            {
                title: t("profile_drive_breadcrumb"),
            }
        ]
        if (props.client !== null) {
            base.push({
                title: props.client.name
            })
        }
        setBreadcrumbData(base)
        refreshContent()
    }, [props.client])

    return (
        <>
            <Card
                title={
                    <Row style={{padding: "0 6px"}}>
                        <Breadcrumb
                            data={breadcrumbData}
                            onClick={(e, i, index) => {
                                if (index === 0) {
                                    navigate("/profile/drive", {
                                        state: null
                                    })
                                }
                            }}
                            size={"md"}
                            style={{
                                marginBottom: 0,
                                display: "flex",
                                flex: 1,
                            }}/>
                        <Button
                            type={"primary"}
                            icon={<PlusOutlined />}
                            onClick={() => {
                                if (props.client === null) {
                                    showClientCreating(true)
                                } else {
                                    showAccountCreating(true)
                                }
                            }}>{
                            props.client === null ? t("profile_drive_add_client") : t("profile_drive_add_account")
                        }</Button>
                    </Row>
                }
                style={{
                    height: "100%",
                }}
                showHeaderDivider={true}>
                <Scrollbar>
                    <List
                        style={{
                            padding: "0 16px",
                        }}
                        bordered={false}
                        data={(props.client === null ? clientList : accountList).map((item) => {
                            const options: Intl.DateTimeFormatOptions = {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit"
                            }

                            if (props.client === null) {
                                let icon: string
                                const type = item["type"]
                                if (type === "OneDrive") {
                                    icon = Ic_OneDrive
                                } else {
                                    icon = Ic_Unknown
                                }
                                return {
                                    title: item["name"],
                                    description: t("profile_drive_last_modify") + Intl.DateTimeFormat(
                                        navigator.language, options
                                    ).format(item["modify_at"]),
                                    avatar: icon,
                                    action: (
                                        <BarsOutlined size={22} />
                                    ),
                                    onClick: () => {
                                        navigate("/profile/drive", {
                                            state: item as ClientState
                                        })
                                    },
                                } as ListDataItem
                            } else {
                                return {
                                    title: item["display_name"] + " (" + item["user_principal_name"] + ")",
                                    description: t("profile_drive_last_modify") + Intl.DateTimeFormat(
                                        navigator.language, options
                                    ).format(item["modify_at"]),
                                    action: (
                                        <BarsOutlined size={22} />
                                    ),
                                    avatar: asInitials(item["display_name"]),
                                }
                            }
                        })}
                        render={(dataItem: ListDataItem & {
                            onClick?: () => void,
                            avatarContent?: string
                        }) => {
                            console.log("renderDataItem: {}", dataItem)
                            return props.client === null ? (
                                <ClientItem {...dataItem} />
                            ) : (
                                <AccountItem {...dataItem} />
                            )
                        }}
                        emptyContent={t("not_found")}
                    />
                </Scrollbar>
            </Card>
            <ClientCreationDialog visible={clientCreating} requestClose={() => showClientCreating(false)} />
        </>
    )
}

const ClientItem: FC<ListDataItem & {
    onClick?: () => void
}> = (props) => {
    const [ isShowDesktopAction, setShowDesktopAction ] = useState(false)
    useEffect(() => {
        console.log("isShowDesktopAction: {}", isShowDesktopAction)
    }, [isShowDesktopAction]);
    return (
        <div
            onClick={() => {
                console.log("client item clicked!")
                props.onClick!()
            }}>
            <List.Item {...props}/>
        </div>
    )
}

const AccountItem: FC<ListDataItem & {
    avatarContent?: string
}> = (props) => {
    return (
        <div
            className={"dirveindex-profile-drive-account"}
            style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
            }}>
            <Avatar
                size={54}
                style={{
                    marginRight: 16,
                }}
                initials={asInitials(props.avatar)} />
            <ListItem
                title={props.title}
                description={props.description}
                action={props.action}/>
        </div>
    )
}

export default ProfileDriveManageFragment