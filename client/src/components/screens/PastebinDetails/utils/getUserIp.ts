export const getUserIp = async () => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip
    } catch (error) {
        console.log(error);
    }
    throw new Error("Не удалось получить комментарии");
}