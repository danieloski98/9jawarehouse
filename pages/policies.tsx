import React from 'react';
import Navbar from '../components/general/Navbar';
import ServiceNavbar from '../components/services/ServiceNav';
import { InputGroup, InputLeftElement, InputRightElement, Input } from '@chakra-ui/react'
import { FiSearch, FiMenu } from 'react-icons/fi'
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi'
import Footer from '../components/Home/Footer';

// images
import Image from 'next/image'
import Guy from '../public/images/guy4.png';
import Banner from '../public/images/banner.png';
import NormNavbar from '../components/general/NorNavbar';

export default function AboutUs() {
  return (
    <div className="w-full h-auto flex flex-col">

        <NormNavbar />

        <div className="w-full flex flex-col items-center mt-20 mb-12">
            <div className="xl:w-4/5 lg:w-4/5 md:w-full sm:w-full h-auto flex flex-col py-6 xl:px-0 lg:px-0 md:px-5 sm:px-5">

                <div className="w-full flex flex-col mt-8">
                    <p className="text-4xl font-Circular-std-medium text-themeGreen">9jawarehouse Privacy Policy</p>
                    <p className='mt-10 text-lg font-Cerebri-sans-book'>
                    Below is the privacy policy of 9jaWarehouse Enterprise. 9jaWarehouse Enterprise encourages both registered members and visitors to our website and any 9jaWarehouse affiliated entities to read our privacy policies carefully to better understand and be informed about sharing any personal information with 9jaWarehouse Enterprise. This policy applies to all 9jaWarehouse website and affiliated social media entities. 9jaWarehouse Enterprise strongly respects and values our members and visitors. We adhere to the strict regulations and policies as described in this privacy policy when handling and dealing with information and data. 9jaWarehouse is fully aware of the value and relevance of internet privacy. Below highlights the content of the privacy policy adhered to by 9jaWarehouse website and all its affiliated entities.
                    </p>

                    <ol className=' list-decimal list-outside mt-12'>

                    <li>
                          <b className=' font-Circular-std-book text-lg'>Consent / approval:</b>
                          <ul className=' pl-10 pt-5'>
                            <li className='text-md font-Cerebri-sans-book'>
                            By using the 9jaWarehouse Enterprise website(www.9jawarehouse.com) and any of 9jaWarehouse affiliated entities you have agreed to consent to the privacy policy, and you have as well granted legal consent to all items as detailed and defined in this privacy policy. If you have not agreed to or at any point disagree with any of the policies while using the website or any other affiliated entities, log out of the website and/or affiliated entities immediately or close out from the page as applicable.
                            </li>
                          </ul>
                      </li>

                      <li className='mt-10'>
                          <b className=' font-Circular-std-book text-lg'>Personal Information and Identification:</b>
                          <ul className='pl-10 pt-5'>
                            <li className='text-md font-Cerebri-sans-book'>
                            During the registration process to become a member of 9jaWarehouse Enterprise, 9jaWarehouse Enterprise will request means of identification like – email(s), phone number(s), home/business address, business registration number (CAC), photo, ID card etc. from you. Note that this information is requested to further identify and proof relationship between the type of business, the services rendered and the business owner. This will help mitigate against fraud, criminal activities, and scammers that might be harmful to 9jaWarehouse and any of its affiliated entities. 9jaWarehouse Enterprise makes use of the contact information you provided to us to communicate important messages on products and 9jaWarehouse Enterprise announcement to all registered members of 9jaWarehouse Enterprise. 9jaWarehouse Enterprise review the emails used to give business review to make sure the reviewers are real and not robots. This helps 9jaWarehouse eliminate as much as possible junk e-mails and e-mail bugs. Your business profile also helps us link you to product and services that might be in line with the businesses or opportunities you have interest in or like to reference.
                            </li>
                          </ul>
                      </li>


                      <li className='mt-10'>
                          <b className=' font-Circular-std-book text-lg'>How we Process and Store Personal Date:</b>
                          <p className='mt-5'>The followings list out how we handle and store personal data on 9jaWarehouse Enterprise.</p>
                          <ul className=' list-decimal list-outside pl-10 pt-5'>
                            <li className='text-md font-Cerebri-sans-book'>
                            All data collected during opening of an account or registering any business are collected and processed through our system in a legitimate and legal manner. By providing this information, you have consented to the processing of these documents and information for accuracy and legitimacy.
                            </li>

                            <li className='text-md font-Cerebri-sans-book'>
                            9jaWarehouse Enterprise does the very best in managing the personal data provided. The data you provided are only stored in our system free of any breach and/or viral attack, bug attack or any internet hazards for the duration as needed.
                            </li>

                             <li className='text-md font-Cerebri-sans-book'>
                             All data collected are in line with all governing laws and regulations for data protection in Nigeria.
                            </li>

                            <li className='text-md font-Cerebri-sans-book'>
                            In as much as we try to always protect personal data, there are situations that may necessitate the sharing of personal information. These include but not limited to request from the courts and/or any other legal body, law enforcement for the purpose of good faith and/or during any ongoing investigations that show violation of the terms and conditions of 9jaWarehouse Enterprise and poses harm to other members, users, and community.
                            </li>

                            <li className='text-md font-Cerebri-sans-book'>
                            9jaWarehouse Enterprise will only hold on to personal information for as long as an account is active and for a period as needed after account is closed or becomes inactive.
                            </li>

                          </ul>
                      </li>


                      <li className='text-md font-Cerebri-sans-book mt-10'>
                              <b className=' font-Circular-std-book text-lg'>Right to Privacy:</b>
                              <ol className="pl-10 mt-5">
                                <li>
                                Under some circumstances per the Nigeria Data Protection regulation and any other law as deem applicable, you can/may have objections to the processing of your personal information. At any point in time, you do no longer want to share personal information with 9jaWarehouse Enterprise, request that your personal information be deleted with immediate effect. This can be done by contacting the 9jaWarehouse customer care services via e-mail only. E-mails should be sent to support@9jawarehouse.com with description of action and the E-mail title should read “Request to delete personal information”. Such request will be processed between 24-48 business hours and a confirmation of deletion of personal information will be sent out to you. Such request will be processed per applicable laws and regulations. Should anymore information be required to complete the process, 9jwarehouse Enterprise will reach out to request additional information.
                                </li>

                                
                              </ol>
                            </li>

                            <li className='text-md font-Cerebri-sans-book mt-10'>
                              <b className=' font-Circular-std-book text-lg'>Third Party Websites / Other Websites:</b>
                              <ol className='pl-10 mt-5'>
                                <li>
                                9jaWarehouseEnterprisewebsitemaylinkyoutootherwebsitesthatmaycollectpersonal identification information about you – username, password, names etc. 9jaWarehouse Enterprise is not responsible for the privacy and contents of these third-party websites or any other websites that is not 9jaWarehouse website (www.9jaWarehouse.com).
                                </li>
                              </ol>
                            </li>


                            <li className='text-md font-Cerebri-sans-book mt-10'>
                              <b className=' font-Circular-std-book text-lg'>Security Precautions and Awareness:</b>
                              <ol className='mt-5 pl-10'>
                                <li>
                                Our website employs strict security measures and checks. The 9jwarehouse website is hosted on a secured server to ensure full protection of information, account access and any of our members information. All information provided to 9jaWarehouse Enterprise is kept under security guidelines and protected against any breach. But we are aware that the internet is not a perfectly safe space; because of this reason, 9jaWarehouse Enterprise cannot take responsibility for the illegal act of hacking and scamming as long as 9jaWarehouse Enterprise has taken the necessary precautions and steps to avoid such situations or occurrence. Be sure to know that we do our best to always protect your personal data. We encourage members to only access account through a secured environment and networks. 9jaWarehouse Enterprise is not responsible for securing your password and/or username and this information should not be disclosed at any point in time to any other parties. Report any suspicious breach to your account immediately by e- mailing the 9jwarehouse support at support@9jawarehouse.com
                                </li>
                              </ol>
                            </li>


                            <li className='text-md font-Cerebri-sans-book mt-10'>
                              <b className=' font-Circular-std-book text-lg'>Changes to Policy</b>
                              <ol className='pl-10 mt-5'>
                                <li>
                                9jaWarehouse Enterprise reserves the sole right to make changes and/or updates to this privacy policy with or without prior notifications. The most recent privacy policy will always be available on the website. We recommend that members and users of 9jaWarehouse website view the privacy policies regularly. The effectiveness of the privacy policy is from the date of being posted on our website and available to the public.
                                </li>
                              </ol>
                            </li>


                    </ol>

                </div>

            </div>
        </div>

        <Footer />
    </div>
  );
}
