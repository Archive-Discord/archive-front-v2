import '../styles/globals.css'
import '../styles/github-markdown.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import NavBar from '@components/Navbar'
import { ToastContainer } from 'react-toastify';
import Footer from '@components/Footer'
import axios from 'axios'
import { EndPoints } from '@utils/Constants'

axios.defaults.baseURL = EndPoints.Archive.API;
axios.defaults.withCredentials = true;

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NavBar/>
        <Component {...pageProps} />
        <ToastContainer/>
      <Footer/>
    </>
  )
}

export default MyApp