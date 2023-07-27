import { NextPage } from 'next'
import Login from '@/components/screens/Login/Login'
import { Layout } from '@/components/layouts/Layout'

const LoginPage: NextPage = () => {
    return (
        <Layout>
            <Login />
        </Layout>
    )
}

export default LoginPage
