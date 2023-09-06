import { FC, FormEvent, KeyboardEvent, SetStateAction, useEffect, useState } from "react"
import Input from './../../ui/input/Input';
import Textarea from "../../ui/textarea/Textarea";
import PastebinService from "@/service/pastebinService";
import { useMutation } from "react-query";
import { errorNotify, successNotify } from "@/utils/notificationsTypes";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/user-store";
import { getUserIp } from "../PastebinDetails/utils/getUserIp";
import { getIP } from "./utils/getIP";
import { fetchCategories } from "./utils/fetchCategories";
import { AxiosResponse } from "axios";
import CategoryResponse from "@/service/categoryService/categoryResponse.interface";

interface postPasteData {
    name: string,
    category: string,
    nameCreator: string,
    text: string,
    rating: number,
    views: number
}

export const Create: FC = () => {
    const [name, setName] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [nameCreator, setNameCreator] = useState<string>("")
    const [tags, setTags] = useState<string>("")
    const [userIP, setUserIP] = useState<Promise<void> | null>()
    const [userID, setUserID] = useState<Promise<void> | null | string>()
    const [text, setText] = useState<string>("")

    const router = useRouter()
    const isAuth = useUserStore((item) => item.isAuth)
    const username = useUserStore((item) => item.username)
    const userid = useUserStore((item) => item.id)


    useEffect(() => {
        if (isAuth && username !== null) {
            setNameCreator(username)
        }
        if (isAuth !== null && userid && userIP && userID) {
            getIP(isAuth, setUserIP, setUserID, userid, userIP, userID)
        }
    }, [])



    const onSubmit = async (event: any) => {

        event.preventDefault()

        const dataToPostPasteJson = {
            "name": name,
            "category": category,
            "nameCreator": nameCreator,
            "text": text,
            "rating": 0,
            "views": 0,
            "userIP": userIP,
            "userID": userID
        }

        setName("")
        setCategory("")
        setNameCreator("")
        setText("")
        mutation.mutateAsync(dataToPostPasteJson)
    }

    const postPaste = async (postData: postPasteData) => {
        try {
            const { data } = await PastebinService.create(postData)
            successNotify("Паста создана")
            router.push(`/pastebins/${data._id}`)
            return data
        } catch (error) {
            errorNotify("Не удалось создать пасту")
            throw error

        }
    }

    function handleTextareaKeyPress(event: KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === 'Enter' && event.shiftKey) {
            setText(text + "\n");
            event.preventDefault();
        } else if (event.key === 'Enter') {
            onSubmit(event);
            event.preventDefault();
        }
    }

    const mutation = useMutation(postPaste)
    const categories: any = ["Программирование", "Еда"]

    return (
        <div className="p-3 flex justify-center">
            <form onSubmit={onSubmit} className="flex w-1/4 justify-center items-center">
                <fieldset className="border p-3 flex justify-center flex-col w-full gap-1">
                    <h2 className="text-xl font-medium">Создайте пост</h2>
                    <Input
                        type="text"
                        setState={setName}
                        state={name}
                        placeHolder="Название"
                    />

                    <select>
                        {categories.map((item: any) => {
                            <option>{item}</option>
                        })}
                    </select>
                    {!isAuth &&
                        <Input
                            type="text"
                            setState={setNameCreator}
                            state={nameCreator}
                            placeHolder="Как вас назвать?"
                        />
                    }
                    <Input
                        type="text"
                        setState={setTags}
                        state={tags}
                        placeHolder="Тэги"
                    />
                    <Textarea
                        setState={setText}
                        state={text}
                        htmlFor="text"
                        labelChildren="Текст:"
                        onKeyDown={handleTextareaKeyPress}
                    />

                    <input type="submit" className="mt-4 rounded-lg text-white py-2 px-4 bg-blue-400 hover:bg-blue-500 text-xl lg:text-[22px] xl:text-2xl" value={"Создать пост"} />
                </fieldset>
            </form>
        </div>
    )
}