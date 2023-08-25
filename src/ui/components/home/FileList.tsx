import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {Col, EmptyState, Grid, Loading, Row} from "@hi-ui/hiui";

export enum FileListSortBy {
    NAME, SIZE, CREATE_TIME, MODIFIED_TIME
}

export interface FileListProps  {
    list?: {}[]
    loading?: boolean
}

export const FileList: FC<FileListProps & FileListHeaderProps & RealFileListProps> = (props) => {
    const realList = <RealList {...props} />
    return (
        <div
            style={{
                borderRadius: props.isMdUp ? 10 : 0,
                backgroundColor: "#FFFFFF",
                paddingTop: 16,
                paddingBottom: 16,
                marginBottom: 20,
            }}>{
            realList
        }</div>
    )
}

export interface BreadcrumbContainerProps {
    children?: React.ReactNode
    marginTop?: number
}

export const BreadcrumbContainer: FC<BreadcrumbContainerProps & RealFileListProps> = (props) => {
    return <div
        style={{
            borderRadius: props.isMdUp ? 10 : 0,
            backgroundColor: "#FFFFFF",
            paddingTop: 6,
            paddingBottom: 6,
            marginTop: props.marginTop ?? 0
        }}>{
        props.children
    }</div>
}

interface RealFileListProps {
    isMdUp: boolean
    showAsMobile?: boolean
}

const RealList: FC<RealFileListProps & FileListProps> = (props) => {
    const { t } = useTranslation()
    let list: {}[] | undefined
    if (props.list !== undefined && props.list.length > 0) {
        list = props.list
    } else {
        list = undefined
    }
    return (
        <div>
            <FileListHeader {...props} />
            <Loading
                visible={props.loading}
                style={{
                    height: 200,
                }}
                content={t("loading")} />
            {
                !props.loading && (list !== undefined ? list.map(() =>
                    <FileListItem
                        isMdUp={props.isMdUp} />
                ) : <EmptyState />)
            }
        </div>
    )
}

interface FileListHeaderProps {
    sortBy?: FileListSortBy
    asc?: boolean
    onChangeSortBy?: (sortBy: FileListSortBy) => void
    onChangeAsc?: (asc: boolean) => void

    breadcrumb?: React.ReactNode
}

const FileListHeader: FC<FileListHeaderProps & RealFileListProps> = (props) => {
    const { t } = useTranslation()
    return (
        <>
            {
                props.showAsMobile && (
                    props.breadcrumb
                )
            }
            {
                props.showAsMobile || (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}>
                        {
                            props.isMdUp && (
                                <div style={{width: 40}} />
                            )
                        }
                        <Row
                            style={{
                                width: "100%",
                                paddingLeft: 20,
                                paddingRight: 20,
                            }}
                            columns={props.isMdUp ? 7 : 4}>
                            <Col span={4}>
                                <div>{t("home_file_list_head_name")}</div>
                            </Col>
                            <Col span={2} style={{ display: props.isMdUp ? "block" : "none" }}>
                                <div>{t("home_file_list_head_modify")}</div>
                            </Col>
                            <Col span={1} style={{ display: props.isMdUp ? "block" : "none" }}>
                                <div>{t("home_file_list_head_size")}</div>
                            </Col>
                        </Row>
                        {
                            props.isMdUp || (
                                <div style={{width: 40}} />
                            )
                        }
                    </div>
                )
            }
        </>
    )
}

interface FileListItemProps {

}

export const FileListItem: FC<FileListItemProps & RealFileListProps> = (props) => {
    const { t } = useTranslation()
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
            }}>
            {
                props.isMdUp && (
                    <div style={{width: 40}} />
                )
            }
            <Row
                style={{
                    width: "100%",
                    paddingLeft: 20,
                    paddingRight: 20,
                }}
                columns={props.showAsMobile ? 4 : props.isMdUp ? 7 : 6}>
                <Col span={4}>
                    <div>{t("home_file_list_head_name")}</div>
                </Col>
                <Col span={2} style={{ display: props.showAsMobile ? "none" : "block" }}>
                    <div>{t("home_file_list_head_modify")}</div>
                </Col>
                <Col span={1} style={{ display: props.isMdUp ? "block" : "none" }}>
                    <div>{t("home_file_list_head_size")}</div>
                </Col>
            </Row>
            {
                props.isMdUp || (
                    <div style={{width: 40}} />
                )
            }
        </div>
    )
}
