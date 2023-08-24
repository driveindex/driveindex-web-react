import {TFunction} from "i18next";
import {BreadcrumbDataItem} from "@hi-ui/breadcrumb/lib/types/types";

export default (t: TFunction<"translation", undefined>, pathStr: string) => {
    const names = getAbsolutePath(pathStr)
    let currentPath = "/"
    const data: (BreadcrumbDataItem & { link: string })[] = [{
        title: t("home_file_root"),
        link: "/home?path=%2F",
    }]
    for (const name of names) {
        if (currentPath !== "/") {
            currentPath += "/"
        }
        currentPath += name
        data.push({
            title: name,
            link: "/home?path=" + encodeURIComponent(currentPath),
        })
    }
    return data
}

function getAbsolutePath(path: string): string[] {
    const names: string[] = []
    for (const item of path.split("/")) {
        if (item == "..") {
            names.pop()
        } else if (item == ".") {
        } else if (!/^\s*$/.test(item)) {
            names.push(item)
        }
    }
    return names
}
