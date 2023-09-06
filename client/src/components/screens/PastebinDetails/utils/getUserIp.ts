export const getUserIp = async () => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        console.log("IP получено");

        const data = await response.json();
        console.log("IP json получено");
        return data.ip
    } catch (error) {
        console.log(error);
    }
    throw new Error("Не удалось получить айпи");
}