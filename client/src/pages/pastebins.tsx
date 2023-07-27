import { Layout } from "@/components/layouts/Layout";
import Pastebins from "@/components/screens/Pastebins/Pastebins";
import { NextPage } from "next";


const PastebinsPage: NextPage = () => {
    return (
        <Layout>
            <Pastebins />
        </Layout>
    )
}
export default PastebinsPage
