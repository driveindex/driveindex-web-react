import React, {FC, useState} from "react";
import {CommonHeader} from "../../../components/home/CommonHeader";
import {useBreakpointDown} from "../../../../core/hooks/useViewport";
import {Outlet, useLocation, useNavigate} from "react-router-dom"

import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import {Menu, Scrollbar} from "@hi-ui/hiui";
import {MenuDataItem} from "@hi-ui/menu/lib/types/types";
import {useTranslation} from "react-i18next";

const ProfilePage: FC = () => {
    const showAsMobile = useBreakpointDown("sm")

    const [ drawer, openDrawer ] = useState(false)

    return (
        <div
            style={{
                backgroundColor: "white",
                height: "100%",
            }}>
            <div
                style={{
                    boxShadow: "0 4px 8px rgba(0,0,0,.05), inset 0 -1px 0 #ebedf0"
                }}>
                <CommonHeader
                    isShowInProfile={true}
                    showAsMobile={showAsMobile}
                    switchShowDrawer={() => {
                        openDrawer(!drawer)
                    }}/>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: "calc(100vh - 70px)"
                }}>
                {
                    showAsMobile ? (
                        <Drawer
                            open={drawer}
                            direction={"left"}
                            size={300}
                            onClose={() => openDrawer(false)}>
                            <ProfileDrawer />
                        </Drawer>
                    ) : (
                        <>
                            <div style={{
                                width: 300,
                                height: "100%",
                            }}>
                                <ProfileDrawer />
                            </div>
                        </>
                    )
                }
                <Scrollbar>
                    <div style={{
                        padding: 20,
                    }}>
                        <Outlet />
                    </div>
                </Scrollbar>
            </div>
        </div>
    )
}

const ProfileDrawer: FC = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const data: MenuDataItem[] = [
        {
            title: t("profile_common"),
            id: "/profile/common",
        },
        {
            title: t("profile_account"),
            id: "/profile/account",
        },
        {
            title: t("profile_drive"),
            id: "/profile/drive",
        },
        {
            title: t("profile_password"),
            id: "/profile/password",
        },
    ]
    return (
        <Menu
            data={data}
            placement={"vertical"}
            style={{
                width: "100%",
                height: "100%",
                marginTop: 10,
            }}
            activeId={useLocation().pathname}
            onClick={(id, item) => {
                navigate(id as string)
            }}/>
    )
}

export default ProfilePage