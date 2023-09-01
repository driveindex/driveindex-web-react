import React, {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import {Modal} from "@hi-ui/hiui";


const ClientCreationDialog: FC<{
    visible: boolean,
    requestClose: () => void,
}> = (props) => {
    const { t } = useTranslation()
    const [ type, setType ] = useState("OneDrive")
    return (
        <Modal
            visible={props.visible}
            title={t("profile_drive_add_client")}
            onCancel={() => props.requestClose()}
            closeable={false}>

        </Modal>
    )
}

const ClientCreationContent: Map<string, FC> = new Map<string, React.FC<any>>([
    ["OneDrive", (props) => {
        return (
            <>
            </>
        )
    }],
])

export default ClientCreationDialog