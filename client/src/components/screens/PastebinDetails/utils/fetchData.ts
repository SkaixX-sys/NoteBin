import { Dispatch, SetStateAction } from "react";
import { getUserIp } from "./getUserIp";
import { incrementView } from "./incrementView";

export const fetchData = async (isAuth: Boolean, userIp: string, setUserIp: Dispatch<SetStateAction<string>>, userID: string, pasteId: string | string[]) => {
    if (isAuth) {
        await incrementView(null, userID, pasteId);
        console.log("авторизован");
    } else {
        const ip = await getUserIp();
        setUserIp(ip)
        console.log(userIp);

        await incrementView(ip, null, pasteId);
        console.log("НЕавторизован");
    }
};