import Paste from "@/components/interfaces/Paste.interface";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { fetchTenPastesByPopularity } from "./utils/fetchTenPastesByPopularity";
import { AxiosResponse } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const Sidebar: FC = () => {
    const [pastes, setPastes] = useState<Paste[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchTenPastesByPopularity();
                setPastes(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData()
    }, [])

    const url = process.env.SITE_URL

    return (
        <aside className="bg-gray-100 w-64 px-4 py-8 absolute top-1/4 left-[100%] hidden -translate-y-[40%]">
            <h2 className="text-1xl font-semibold mb-4">Популярные пасты</h2>
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="w-3/5">Название</td>
                        <td className="w-1/5"><FontAwesomeIcon icon={faEye} /></td>
                        {/* <td className="w-1/5"><FontAwesomeIcon icon={faThumbsUp} /></td> */}
                    </tr>
                </thead>
            </table>
            {pastes && pastes.map((paste: Paste) => {
                return (
                    <Link href={`/pastebins/${paste._id}`} key={paste._id} className="text-blue-500 hover:underline">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="w-3/5">{paste.name}</td>
                                    <td className="w-1/5">{paste.views}</td>
                                    {/* <td className="w-1/5">{paste.rating}</td> */}
                                </tr>
                            </tbody>
                        </table>
                    </Link>
                )
            })}
        </aside>
    );
};

export default Sidebar;
