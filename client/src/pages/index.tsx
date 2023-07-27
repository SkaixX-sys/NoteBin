
import { NextPage } from 'next';
import { Home } from './../components/screens/Home/Home';
import { Layout } from '@/components/layouts/Layout';

const HomePage:NextPage = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  )
}
export default HomePage
