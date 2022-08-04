import '@styles/globals.css';
import 'antd/dist/antd.css';
import Layout from '@components/layout';
// import 'antd/dist/antd.dark.css';
// import 'antd/dist/antd.compact.css';
function MyApp({ Component, pageProps }) {

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
