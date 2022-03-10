import '../styles/globals.css'
import '../styles/github-markdown.css'
import type { AppProps } from 'next/app'
import NavBar from '@components/Navbar'
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
      <Footer/>
    </>
  )
}

export default MyApp