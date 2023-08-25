import {FC} from "react";
import {CommonHeader} from "../../components/home/CommonHeader";
import {EmptyState} from "@hi-ui/hiui";
import {useTranslation} from "react-i18next";

const NotFoundPage: FC = () => {
    const { t } = useTranslation()
    return (
        <div>
            <CommonHeader isShowInProfile={false} showAvatar={false} />
            <EmptyState
                style={{
                    marginTop: 100,
                }}
                size={"lg"}
                title={t("not_found")} />
        </div>
    )
}

export default NotFoundPage