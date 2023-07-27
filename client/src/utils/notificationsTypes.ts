import toast from "react-hot-toast";

export const successNotify = (text: string) => toast.success(text, {
    style:{
        display: "flex",
        marginTop:"20px"
    }
});
export const errorNotify = (text: string) => toast.error(text, {
    style:{
        display: "flex",
        marginTop:"20px"
    }
});