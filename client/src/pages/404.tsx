import { Layout } from '@/components/layouts/Layout'
import { NextPage } from 'next'

interface Props {

}

const NotFoundPage: NextPage<Props> = () => {
    return (
        <Layout>
            <h2 className='text-center font-semibold text-3xl'>Данная ссылка не найдена</h2>
        </Layout>
    )
}

export default NotFoundPage
