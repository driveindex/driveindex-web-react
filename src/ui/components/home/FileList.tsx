import React, {FC} from "react";
import {Grid, useMediaQuery, useTheme} from "@mui/material";
import {Card} from "@hi-ui/hiui";

export enum FileListSortBy {
    NAME, SIZE, CREATE_TIME, MODIFIED_TIME
}

export interface FileListProps  {
    list?: {}[]
}

export const FileList: FC<FileListProps & FileListHeaderProps & RealFileListProps> = (props) => {
    const realList = <RealList {...props} />

    return (
        <div
            style={{
                height: "100%",
                width: props.isLgUp ? 740 : "100%",
                borderRadius: props.isLgUp ? 10 : 0,
                backgroundColor: "#FFFFFF",
                paddingTop: 16,
                paddingBottom: 16,
            }}>{
            realList
        }</div>
    )
}

export interface BreadcrumbContainerProps {
    children?: React.ReactNode;
}

export const BreadcrumbContainer: FC<BreadcrumbContainerProps & RealFileListProps> = (props) => {
    return <div
        style={{
            width: props.isLgUp ? 700 : "100%",
            borderRadius: props.isLgUp ? 10 : 0,
            backgroundColor: "#FFFFFF",
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 6,
            paddingBottom: 6,
        }}>{
        props.children
    }</div>
}

interface RealFileListProps {
    isLgUp: boolean
}

const RealList: FC<RealFileListProps & FileListProps> = (props) => {
    return (
        <div>
            <FileListHeader {...props} />
        </div>
    )
}

interface FileListHeaderProps {
    sortBy?: FileListSortBy
    asc?: boolean
    onChangeSortBy?: (sortBy: FileListSortBy) => void
    onChangeAsc?: (asc: boolean) => void
}

const FileListHeader: FC<FileListHeaderProps & RealFileListProps> = (props) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
            }}>
            {
                props.isLgUp && (
                    <div style={{width: 60}} />
                )
            }
            <Grid container={true} columns={props.isLgUp ? 5 : 3}>
                <Grid item={true} xs={3}>
                    <div>test</div>
                </Grid>
                <Grid item={true} xs={1} sx={{ display: { lg: "block", sm: "none" } }}>
                    <div>test</div>
                </Grid>
                <Grid item={true} xs={1} sx={{ display: { lg: "block", sm: "none" } }}>
                    <div>test</div>
                </Grid>
            </Grid>
            {
                props.isLgUp || (
                    <div style={{width: 60}} />
                )
            }
        </div>
    )
}

