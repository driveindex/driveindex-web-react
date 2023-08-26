import React, {Context, createContext, FC, useContext, useState} from "react";
import {Loading} from "@hi-ui/hiui";

const LoadingContext: Context<{
    setLoading?: (loading: boolean) => void
}> = createContext({})


export const LoadingCover: FC<{ children: React.ReactNode[] | React.ReactNode }> = (props) => {
    const [ loading, setLoading ] = useState(false)
    return (
        <LoadingContext.Provider value={{setLoading: (loading) => setLoading(loading)}}>
            <Loading visible={loading}>
                {props.children}
            </Loading>
        </LoadingContext.Provider>
    )
}

export function useLoading() {
    const { setLoading } = useContext(LoadingContext)
    return setLoading!!
}