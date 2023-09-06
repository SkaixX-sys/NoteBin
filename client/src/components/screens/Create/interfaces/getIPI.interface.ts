import { Dispatch, SetStateAction } from "react";

export default interface getIPI {
    isAuth: boolean,
    setUserIP: Dispatch<SetStateAction<Promise<void> | undefined | null>>,
    setUserID: Dispatch<SetStateAction<Promise<void> | undefined | null | string>>,
    userid: string,
    userIP: Promise<void>,
    userID: Promise<void>
}