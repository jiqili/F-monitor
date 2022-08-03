import '@styles/globals.css';
import 'antd/dist/antd.css';
import Layout from '@components/layout';
import MenuProview from '@components/context/menucontext';
// import 'antd/dist/antd.dark.css';
// import 'antd/dist/antd.compact.css';
function MyApp({ Component, pageProps }) {

  return (
    <MenuProview>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MenuProview>
  )
}

export default MyApp
