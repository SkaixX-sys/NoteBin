import { Dispatch, SetStateAction } from "react";
import { getUserIp } from "../../PastebinDetails/utils/getUserIp";
import getIPI from "../interfaces/getIPI.interface";

export async function getIP(isAuth: boolean, setUserIP: Dispatch<SetStateAction<Promise<void> | undefined | null>>, setUserID: Dispatch<SetStateAction<Promise<void> | undefined | null | string>>, userid: string, userIP: Promise<void>, userID: Promise<void> | string) {
    if (isAuth) {
        setUserIP(null)
        setUserID(userid)
        console.log(userIP, userID);

    } else {
        const userip = await getUserIp();
        setUserIP(userip)
        setUserID(null)
        console.log(userIP, userID);

    }
}