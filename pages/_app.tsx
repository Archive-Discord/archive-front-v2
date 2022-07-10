import '../styles/globals.css'
import '../styles/github-markdown.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import NavBar from '@components/Navbar'
import { ToastContainer } from 'react-toastify';
import Footer from '@components/Footer'
import axios from 'axios'
import { EndPoints } from '@utils/Constants'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '@utils/gtag'

axios.defaults.baseURL = EndPoints.Archive.API;
axios.defaults.withCredentials = true;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <>
      <NavBar/>
        <Component {...pageProps} />
        <ToastContainer/>
      {!router.asPath.startsWith('/developers') && <Footer/>}
    </>
  )
}

export default MyApp