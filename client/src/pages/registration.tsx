import { NextPage } from 'next'
import Registration from '@/components/screens/Registration/Registration'
import { Layout } from '@/components/layouts/Layout'

const RegistrationPage: NextPage = () => {
    return (
        <Layout>
            <Registration />
        </Layout>
    )
}

export default RegistrationPage
