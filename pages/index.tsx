import type { NextPage } from 'next'


// components
import Banner from '../components/Home/Banner';
import Stats from '../components/Home/Stats';
import Features from '../components/Home/Features';
import Reviews from '../components/Home/Reviews';
import Footer from '../components/Home/Footer';


const Home: NextPage = () => {
  return (
    <div className="w-auto h-auto overflow-hidden">

      <Banner />
      <Stats />
      <Features />
      {/* <Reviews /> */}
      <Footer />
    </div>
  )
}

export default Home
