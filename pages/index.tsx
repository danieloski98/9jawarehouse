import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// components
import Banner from '../components/Home/Banner';
import Stats from '../components/Home/Stats';
import Features from '../components/Home/Features';
import Reviews from '../components/Home/Reviews';
import Footer from '../components/Home/Footer';


const Home: NextPage = () => {
  return (
    <div className="w-full h-auto">
      <Banner />
      <Stats />
      <Features />
      <Reviews />
      <Footer />
    </div>
  )
}

export default Home
