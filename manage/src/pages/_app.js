import '@styles/globals.css';
import 'antd/dist/antd.css';
import Layout from '@components/layout';
import DataProvider from 'src/store';
function MyApp({ Component, pageProps }) {

  return (
    <DataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  )
}

export default MyApp
