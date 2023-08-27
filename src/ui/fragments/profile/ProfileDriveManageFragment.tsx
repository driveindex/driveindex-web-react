import React, {FC, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Breadcrumb, Card, message, Row, Scrollbar} from "@hi-ui/hiui";
import {LoadingCover, useLoading} from "../../../core/hooks/useLoading";
import {BreadcrumbDataItem} from "@hi-ui/breadcrumb/lib/types/types";
import {DriveIndexAPI} from "../../../core/axios";
import {AxiosResponse} from "axios";
import {checkLoginStatus, useLoginExpiredDialog} from "../../../core/hooks/useLoginExpiredDialog";
import {useLocation, useNavigate} from "react-router-dom";


type ClientBreadcrumbDataItem = BreadcrumbDataItem & {
    targetClient?: string
}

const ProfileDriveManageFragment: FC = () => {
    const { t } = useTranslation()

    const { state } = useLocation()

    return (
        <>
            <h2>{t("profile_drive_title")}</h2>
            <p>{t("profile_drive_text")}</p>
            <Row>

            </Row>
            <LoadingCover>
                <DriveList state={state} />
            </LoadingCover>
        </>
    )
}

interface DriveListProps {
    state: {
        id: string,
        name: string,
    } | null
}
const DriveList: FC<DriveListProps> = (props) => {
    const { t } = useTranslation()

    const [ clientList, setClientList ] = useState<any[]>([])

    const navigate = useNavigate()
    const { setLoading } = useLoading()
    const showLoginExpiredDialog = useLoginExpiredDialog()

    const [
        breadcrumbData,
        setBreadcrumbData
    ] = useState<ClientBreadcrumbDataItem[]>()
    useEffect(() => {
        const base: ClientBreadcrumbDataItem[] = [
            {
                title: t("profile_drive_breadcrumb"),
            }
        ]
        if (props.state !== null) {
            base.push({
                title: props.state.name
            })
        }
        setBreadcrumbData(base)

        setLoading(true)
        setTimeout(() => {
            let request: Promise<AxiosResponse<any, any>>
            if (props.state === null) {
                request = DriveIndexAPI.get("/api/user/client")
            } else {
                request = DriveIndexAPI.get("/api/user/account?client_id="+props.state.id)
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
                } else {
                    setClientList(resp.data["data"])
                }
            }).finally(() => {
                setLoading(false)
            })
        }, 200)
    }, [props.state])

    return (
        <div
            className={"hi-v4-card hi-v4-card--bordered"}
            style={{
                maxWidth: 640,
                height: 400,
            }}>
            <div
                className={"hi-v4-card__header hi-v4-card__header--divider"}
                style={{
                    marginBottom: 0,
                }}>
                <div className={"hi-v4-card__title"}>
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
                        }}/>
                </div>
            </div>
            <Scrollbar>
                <div
                    style={{
                        padding: "16px 0"
                    }}>{
                    clientList.map((item) => {
                        return (
                            <div onClick={() => {
                                if (props.state !== null) {
                                    return
                                }
                                navigate("/profile/drive", {
                                    state: {
                                        id: item.id,
                                        name: item.name,
                                    }
                                })
                            }}>{item["name"] ?? item["userPrincipalName"]}</div>
                        )
                    })
                }</div>
            </Scrollbar>
        </div>
    )
}

export default ProfileDriveManageFragment