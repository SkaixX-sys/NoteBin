import { Layout } from "@/components/layouts/Layout";
import { Create } from "../components/screens/Create/Create";
import { NextPage } from "next";


const CreatePage: NextPage = () => {
    return (
        <Layout>
            <Create />
        </Layout>
    )
}
export default CreatePage
