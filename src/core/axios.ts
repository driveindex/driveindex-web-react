import axios, {AxiosResponse} from "axios";
import {UserPref} from "./prefs/UserPref";
import {useContext} from "react";

const isDev = (process.env.NODE_ENV == "development")

export const DriveIndexAPI =  axios.create({
    baseURL: isDev ? "https://drivetest.sgpublic.xyz" : undefined,
    validateStatus: (status) => status !== 404
})

DriveIndexAPI.interceptors.request.use(
    (req) => {
        if (req.url !== "/api/login") {
            req.headers["Authorization"] = "Bearer " + UserPref.AccessToken
        }
        return req
    }
)