import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserPref} from "../../../core/prefs/UserPref";
import {useTranslation} from "react-i18next";
import {Breadcrumb, Button, message, Scrollbar} from "@hi-ui/hiui";
import {PlusOutlined, LinkOutlined} from "@hi-ui/icons"
import {BreadcrumbContainer, FileList} from "../../components/home/FileList";
import {useQuery} from "../../../core/hooks/useQuery";
import useBreadcrumb from "../../../core/hooks/useBreadcrumb";
import {useBreakpointDown, useBreakpointUp} from "../../../core/hooks/useViewport";
import {DriveIndexAPI} from "../../../core/axios";
import {checkLoginStatus, useLoginExpiredDialog} from "../../../core/hooks/useLoginExpiredDialog";
import {TFunction} from "i18next";
import {CommonHeader} from "../../components/home/CommonHeader";

const HomePage: FC = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!UserPref.Login) {
            navigate("/login")
        }
    }, [navigate]);
    const { t } = useTranslation()

    const query = useQuery()
    const path = query.get("path")

    const showLoginExpiredDialog = useLoginExpiredDialog()
    const [ fileList, setFileList ] = useState<{}[] | undefined>(undefined)
    useEffect(() => {
        if (path == null) {
            navigate("/home?path=%2F")
        } else {
            getFileListByPath(path, setFileList, showLoginExpiredDialog, t)
        }
    }, [path])

    const isMdUp = useBreakpointUp("md")
    const showAsMobile = useBreakpointDown("sm")
    const contentWidth = isMdUp ? 740 : "100%"

    const breadcrumbData = useBreadcrumb(t, path)

    const breadcrumb = (
        <Breadcrumb
            data={breadcrumbData}
            onClick={(e, i, index) => {
                navigate(breadcrumbData[index].link)
            }}
            style={{
                marginLeft: 20,
                marginRight: 20,
            }} />
    )

    return (
        <>
            <CommonHeader isShowInProfile={false} />
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                }}>
                <div style={{width: contentWidth}}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: isMdUp ? 0 : 20,
                            paddingRight: isMdUp ? 0 : 20,
                        }}>
                        <Button type={"primary"} icon={<PlusOutlined />} size={"lg"}>{t("home_file_create_dir")}</Button>
                        <Button type={"secondary"} icon={<LinkOutlined />} size={"lg"}>{t("home_file_create_link")}</Button>
                    </div>
                    {
                        showAsMobile || (
                            <BreadcrumbContainer marginTop={20} isMdUp={isMdUp}>
                                {breadcrumb}
                            </BreadcrumbContainer>
                        )
                    }
                    <Scrollbar
                        style={{
                            marginTop: 20,
                            display: "flex",
                            height: "calc(100vh - 194px)"
                        }}>
                        <FileList
                            isMdUp={isMdUp}
                            showAsMobile={showAsMobile}
                            breadcrumb={breadcrumb}
                            list={fileList}/>
                    </Scrollbar>
                </div>
            </div>
        </>
    )
}

function getFileListByPath(
    path: string,
    setFileList: Dispatch<SetStateAction<{}[] | undefined>>,
    showLoginExpiredDialog: () => void,
    t: TFunction<"translation", undefined>,
) {
    setFileList(undefined)
    DriveIndexAPI.get("/api/user/file/list?path=" + encodeURIComponent(path), {
        headers: {
            "Authorization": true
        }
    }).then((resp) => {
        if (!checkLoginStatus(resp, showLoginExpiredDialog)) {
            return
        }
        if (resp.data["code"] !== 200) {
            message.open({
                title: t("home_list_error") + resp.data["message"],
                type: "error",
            })
        } else {
            setFileList(resp.data["data"]["content"])
        }
    })
}

export default HomePage