import {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {UserPref} from "../../../core/util/UserPref";

const HomePage: FC = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!UserPref.Login) {
            navigate("/login")
        }
    }, [navigate]);
    return (
        <>

        </>
    )
}

export default HomePage