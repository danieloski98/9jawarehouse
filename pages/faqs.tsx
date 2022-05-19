import React from 'react';
import Navbar from '../components/general/Navbar';
import ServiceNavbar from '../components/services/ServiceNav';
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box } from '@chakra-ui/react'
import { FiSearch, FiMenu } from 'react-icons/fi'
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi'
import Footer from '../components/Home/Footer';
import NormNavbar from '../components/general/NorNavbar';


export default function Faqs() {
  const vals = [1,2,3,4,5,6];
  return (
    <div className="w-full h-auto flex flex-col">

        <NormNavbar />

        <div className="w-full flex flex-col items-center mt-20 mb-12">
            <div className="xl:w-4/5 lg:w-4/5 md:w-full sm:w-full h-auto flex flex-col py-6 xl:px-0 lg:px-0 md:px-5 sm:px-5">

                <div className="w-full flex flex-col mt-8">
                    <p className="text-4xl font-Circular-std-medium text-themeGreen">Frequently asked questions (FAQ)</p>
                    
                    <Accordion className="mt-12 mb-8 font-Cerebri-sans-book">
                        {
                            vals.map((item, index) => (
                                <AccordionItem key={index.toString()}>
                                    <AccordionButton>
                                        <Box flex="1" textAlign="left">
                                            <p className='font-Circular-std-medium'>Section {item}</p>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    <AccordionPanel>
                                        <p className="text-justify text-gray-500 font-Cerebri-sans-book">
                                          
                                        </p>
                                    </AccordionPanel>
                                </AccordionItem>
                            ))
                        }
                    </Accordion>

                </div>

            </div>
        </div>

        <Footer />
    </div>
  );
}
