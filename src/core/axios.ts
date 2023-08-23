import axios from "axios";

const isDev = (process.env.NODE_ENV == "development")

const DriveIndexAPI =  axios.create({
    baseURL: isDev ? "https://drivetest.sgpublic.xyz" : undefined,
    validateStatus: (status) => status != 404
})

export default DriveIndexAPI