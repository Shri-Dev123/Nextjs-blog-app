import '@/styles/globals.css'

export  function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
import '../styles/globals.css';
import Header from '../components/Header';
import Layout from '../components/Layout';
import  AuthProvider  from '../context/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Header />
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
