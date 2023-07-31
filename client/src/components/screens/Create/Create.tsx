import { FC, FormEvent, useState } from "react"
import Input from './../../ui/input/Input';
import Textarea from "../../ui/textarea/Textarea";
import PastebinService from "@/service/pastebinService";
import { useMutation } from "react-query";
import { errorNotify, successNotify } from "@/utils/notificationsTypes";
import { useRouter } from "next/router";

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
    const [text, setText] = useState<string>("")
    const router = useRouter()


    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const dataToPostPasteJson = {
            "name": name,
            "category": category,
            "nameCreator": nameCreator,
            "text": text,
            "rating": 0,
            "views": 0,
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

    const mutation = useMutation(postPaste)

    return (
        <div className="p-3 flex justify-center">
            <form onSubmit={onSubmit} className="flex w-1/4 justify-center items-center shadow-lg">
                <fieldset className="border p-3 flex justify-center flex-col w-full gap-1">
                    <legend className="text-lg font-medium">Создайте пасту</legend>
                    <Input
                        type="text"
                        setState={setName}
                        state={name}
                        htmlFor="name"
                        labelChildren="Название:"
                    />

                    <Input
                        type="text"
                        setState={setCategory}
                        state={category}
                        htmlFor="category"
                        labelChildren="Категория:"
                    />

                    <Input
                        type="text"
                        setState={setNameCreator}
                        state={nameCreator}
                        htmlFor="nameCreator"
                        labelChildren="Как вас называть:"
                    />

                    <Textarea
                        setState={setText}
                        state={text}
                        htmlFor="text"
                        labelChildren="Текст:"
                    />

                    <input type="submit" className="cursor-pointer p-2 border rounded hover:shadow-md shadow-sm ease-in duration-150 text-gray-800 bg-gray-100 my-2 text-lg" />
                </fieldset>
            </form>
        </div>
    )
}