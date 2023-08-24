import React, {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {UserPref} from "../../../core/util/UserPref";
import logo from "../../../static/drawable/logo.svg"
import {useTranslation} from "react-i18next";
import {Avatar, Breadcrumb, Button, Popover} from "@hi-ui/hiui";
import {PlusOutlined, LinkOutlined} from "@hi-ui/icons"
import {useMediaQuery, useTheme} from "@mui/material";
import UserMenu from "../../components/home/UserMenu";
import {BreadcrumbContainer, FileList} from "../../components/home/FileList";
import {useQuery} from "../../../core/util/useQuery";
import useBreadcrumb from "../../../core/util/useBreadcrumb";

const HomePage: FC = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!UserPref.Login) {
            navigate("/login")
        }
    }, [navigate]);
    const { t } = useTranslation()

    const query = useQuery()
    if (query.get("path") == null) {
        navigate("/home?path=%2F")
    }
    const path = query.get("path") ?? "/"

    const theme = useTheme()
    const isLgUp = useMediaQuery(theme.breakpoints.up("lg"))
    const contentWidth = isLgUp ? 740 : "100%"

    const breadcrumb = useBreadcrumb(t, path)

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
                    <Popover placement={"bottom-end"} content={<UserMenu />}>
                        <Avatar initials={UserPref.Username.charAt(0).toUpperCase()} />
                    </Popover>
                </div>
            </div>
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
                        }}>
                        <Button type={"primary"} icon={<PlusOutlined />} size={"lg"}>{t("home_file_create_dir")}</Button>
                        <Button type={"secondary"} icon={<LinkOutlined />} size={"lg"}>{t("home_file_create_link")}</Button>
                    </div>
                    <div
                        style={{
                            marginTop: 20,
                        }}>
                        <BreadcrumbContainer isLgUp={isLgUp}>
                            <Breadcrumb
                                data={breadcrumb}
                                onClick={(e, i, index) => {
                                    navigate(breadcrumb[index].link)
                                }}/>
                        </BreadcrumbContainer>
                    </div>
                    <div
                        style={{
                            marginTop: 20,
                        }}>
                        <FileList isLgUp={isLgUp} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage