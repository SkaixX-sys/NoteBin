import { NextPage } from 'next'
import PastebinDetails from './../../components/screens/PastebinDetails/PastebinDetails';
import { Layout } from '@/components/layouts/Layout';

const PastebinPage: NextPage = () => {
    return (
        <Layout>
            <PastebinDetails />
        </Layout>
    )
}

export default PastebinPage
