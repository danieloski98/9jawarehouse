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

export default function Terms() {
  return (
    <div className="w-full h-auto flex flex-col">

        <NormNavbar />

        <div className="w-full flex flex-col items-center mt-20 mb-12">
            <div className="xl:w-4/5 lg:w-4/5 md:w-full sm:w-full h-auto flex flex-col py-6 xl:px-0 lg:px-0 md:px-5 sm:px-5">

                <div className="w-full flex flex-col mt-8">
                    <p className="text-4xl font-Circular-std-medium text-themeGreen">9jawarehouse Terms and Conditions</p>

                   {/* main list */}

                    <ol className=' list-decimal list-outside mt-12'>

                      <li>
                          <b className=' font-Circular-std-book text-lg'>Document Description and application</b>
                          <ul className=' list-decimal list-outside pl-10 pt-5'>
                            <li className='text-md font-Cerebri-sans-book'>
                            9jaWarehouse Enterprise terms and conditions document are written under the governing laws of the National Information technology Development Agency Act, 2007 and all other applicable laws and regulations for electronic records and documentation. This document highlights all the terms and conditions guiding the use of 9jaWarehouse Enterprise website (www.9jwarehouse.com) and shall be reserved in digital electronic format without the application and requirements if any signature.
                            </li>

                            <li className='text-md font-Cerebri-sans-book'>
                            By any use of the 9jWareware Enterprise website, you are agreeing and consenting to all the terms, conditions and policies highlighted in this document.
                            </li>

                           <li className='text-md font-Cerebri-sans-book'>
                           9jaWarehouse Enterprise reserve the sole right to modify, change and adjust these terms and conditions. We encourage users and members to review the terms and conditions regularly. The latest copy of the terms and conditions will always be posted on the website at every given time.
                           </li>
                          </ul>
                      </li>

                      <li className='mt-5'>
                          <b className=' font-Circular-std-book text-lg'>Membership Applications, Requirements and Website Usage</b>
                          <ul className=' list-decimal list-outside pl-10 pt-5'>
                            <li className='text-md font-Cerebri-sans-book'>
                            You must be at least 18 years old at the time of using this website. By using this website, you are certifying that you are 18 years or older. 9jaWarehouse Enterprise will not be held liable for misrepresentation of age.
                            </li>

                            <li className='text-md font-Cerebri-sans-book'>
                            By using the 9jaWarehouse Enterprise website, you are agreeing to all the Nigerian governing laws and
                            regulations.
                            </li>

                           <li className='text-md font-Cerebri-sans-book'>
                           9Anyone under the age of 18 years who needs to use the 9jaWarehouse Enterprise website, needs to do so
                                under the guardian of an adult who is over 18 years or older.
                           </li>

                           <li className='text-md font-Cerebri-sans-book'>
                           Anyone who has misrepresented their age will have accounts deactivated and governing laws and regulation
                            or disciplinary actions which can include loss of membership without any refund will be applied accordingly.
                            </li>

                            <li className='text-md font-Cerebri-sans-book'>
                            As a registered member on 9jaWarehouse Enterprise, you shall be responsible for maintaining and securing your login details (username, password, and email). At any point that it is determined that any information you provided is incorrect, falsified, or untrue, such account will be suspended indefinitely and reported to law enforcement accordingly and will not be allowed access to the 9jaWarehouse Enterprise website now
                            or in the nearest future.
                            </li>
                          </ul>
                      </li>

                      <li className='mt-5'>
                          <b className=' font-Circular-std-book text-lg'>Subscription, Payment, and Charge</b>
                          <ul className=' list-decimal list-outside pl-10 pt-5'>
                            <li className='text-md font-Cerebri-sans-book'>
                            9jaWarehouse Enterprise does not charge users for using or browsing the website.
                            </li>

                            <li className='text-md font-Cerebri-sans-book'>
                            9jaWarehouse Enterprise does have subscriptions for users that are interested to become a registered member of 9jaWarehouse Enterprise. These subscriptions are listed on the subscription page on
                            9jaWarehouse Enterprise website.
                            </li>

                           <li className='text-md font-Cerebri-sans-book'>
                           Any changes to the subscription package shall be communicated to active members via e-mail only prior to
                          implementation of the new subscription.
                           </li>

                           <li className='text-md font-Cerebri-sans-book'>
                           9jaWarehouse Enterprise reserve the right to change and update the subscription cost for membership at
                            any point in time.
                            </li>

                            <li className='text-md font-Cerebri-sans-book'>
                            All subscription shall be made through the payment gateway on 9jaWarehouse Enterprise website in
                            Nigerian Naira.
                            </li>

                            <li className='text-md font-Cerebri-sans-book'>
                            Breach of any of 9jaWarehouse Enterprise policies, terms and conditions will automatically lead to forfeiture
                            of any current subscription without refund and all accounts linked to the breach shall be deactivated from
                            the 9jaWarehouse Enterprise website and no refunds will be made to such members.
                            </li>
                          </ul>
                      </li>

                      <li className='mt-5'>
                          <b className=' font-Circular-std-book text-lg'>Utilization of Website</b>
                          <ul className=' list-decimal list-outside pl-10 pt-5'>
                            <li className='text-md font-Cerebri-sans-book'>
                            By using 9jaWarehouse Enterprise website, you are agreeing, consenting, and governed by the following binding principles. These principles apply to the 9jaWarehouse Enterprise property, website, and any other social media pages.

                            <ol  className=' list-decimal list-outside pl-10 pt-5'>
                              <li className='text-md font-Cerebri-sans-book'>
                              you shall not display, uploaded, change, or modify, publish, transmit and share any connects of 9jawarehouse enterprise and its websites or affiliate entities without proper approved written consent from 9jaWarehouse Enterprise.
                              </li>

                              <li className='text-md font-Cerebri-sans-book'>
                              You shall not contribute to any topics, misrepresent, discuss in a harmful manner, abuse any contents, information, or properties of 9jaWarehouse Enterprise and any property as applicable.
                              </li>

                              <li className='text-md font-Cerebri-sans-book'>
                              You shall not upload any explicit contents, pornographic or provoking pictures or videos or make provocative remarks or discuss any topic that can trigger the community or another members or users in your discussion, reviews, or any other submissions to 9jaWarehouse Enterprise. All concerns should be sent to 9jaWarehouse Enterprise support team via the support e-mail.
                              </li>

                              <li className='text-md font-Cerebri-sans-book'>
                              You shall desist from using junk emails to either leave reviews, open accounts, or create spam on the 9jaWarehouse Enterprise website.
                              </li>

                              <li className='text-md font-Cerebri-sans-book'>
                              You shall not attempt to break or have access to unauthorized pages on the 9jaWarehouse Enterprise website.
                              </li>

                              <li className='text-md font-Cerebri-sans-book'>
                              ou shall not link to 9jwarehouse a third part website that contains explicit pornographic contents or anything that is provoking to the community, users, and members.
                              </li>

                              <li className='text-md font-Cerebri-sans-book'>
                              You shall not use 9jaWarehouse Enterprise contents for any form of advertisement or promotion without written consent of 9jaWarehouse Enterprise.
                              </li>

                              <li className='text-md font-Cerebri-sans-book'>
                              You shall not use any form of impersonation; provision of false personal information and misleading information is subject to legal consequences.
                              </li>

                              <li className='text-md font-Cerebri-sans-book'>
                              Any use of any devices that can impact the functions of the 9jaWarehouse Enterprise or any of 9jaWarehouse Enterprise property is prohibited and subject to legal consequences.
                              </li>


                            </ol>

                            <li className='text-md font-Cerebri-sans-book'>
                              You – refers to members or users who uses any 9jaWarehouse Enterprise properties.
                            </li>


                            </li>

                          </ul>
                      </li>


                      <li className='mt-5'>
                          <b className=' font-Circular-std-book text-lg'>User Guide</b>
                          <ul className=' list-decimal list-outside pl-10 pt-5'>
                            <li className='text-md font-Cerebri-sans-book'>
                            9jaWarehouse Enterprise only provides to its user profiles of registered vendor who 9jaWarehouse Enterprise has access based on the information provided to be able to render the services and skills listed on their profile.
                            </li>

                            <li className='text-md font-Cerebri-sans-book'>
                            9jaWarehouse Enterprise still advise users of the 9jaWarehouse Enterprise website and any of 9jaWarehouse property to make careful observations, take precautions and make conscious evaluation before any transactions with any vendors on 9jaWarehouse Enterprise. 9jaWarehouse Enterprise does not involve and would not be liable for any monetary transactions between a user and a 9jaWarehouse business member. 9jaWarehouse Enterprise will do its best to protect its users but we encourage users to employ precautions during any business engagement any member of 9jaWarehouse Enterprise.
                            </li>

                           <li className='text-md font-Cerebri-sans-book'>
                           Though 9jaWarehouse Enterprise prides itself in stringent screening of members on a regular basis, 9jwarehouse will not be liable for any damages like fraud or fraudulent activities between a user and a 9jwarehouse registered member. 9jwaWarehouse Enterprise will provide all information of the business or entities involved and any other support to law enforcement to apprehend or facilitate in legal investigation such matters. 9jWarehouse Enterprise will not cover any cost, expenses or damages needed to cover any investigations or legal, proceedings.
                           </li>

                          </ul>
                      </li>


                      <li className='mt-5'>
                          <b className=' font-Circular-std-book text-lg'>Third Party Links, and other Businesses</b>
                          <ul className=' list-decimal list-outside pl-10 pt-5'>
                            <li className='text-md font-Cerebri-sans-book'>
                            9jaWarehouse Enterprise is not responsible for the content of any unaffiliated website that maybe linked to or from the 9jaWarehouse Enterprise website. These links have been provided only for the convenience of the users this website and you can access at your own risk. Any website accessed from the 9jaWarehouse website is independent from 9jaWarehouse and 9jaWarehouse Enterprise has no control over the contents of these websites. Also, a link to any of these external websites does not mean that 9jaWarehouse Enterprise endorsed or approved or accept any responsibilities for the contents or use of the website by any of our users. At no point in time now and in the future, shall a third-party services, material or products be deemed to have been approved or endorsed by 9jaWarehouse enterprise.

                            </li>

                          </ul>
                      </li>


                      <li className='mt-5'>
                          <b className=' font-Circular-std-book text-lg'>Users Accounts</b>
                          <ul className=' list-decimal list-outside pl-10 pt-5'>
                            <li className='text-md font-Cerebri-sans-book'>
                            As a user of 9jaWarehouse Enterprise website, you may be asked to register with 9jaWarehouse Enterprise and to provide some private information. You are responsible for ensuring the accuracy of these information. You are also responsible for maintaining the safety of these information. You are also responsible for the activities under your account, username, and password.
                            </li>

                            <li className='text-md font-Cerebri-sans-book'>
                            At any point in time there is any issue regarding the security of your account on the 9jaWarehouse Enterprise website, inform us of this immediately so we can resolve accordingly.
                            </li>

                            <li className='text-md font-Cerebri-sans-book'>
                            9jaWarehouse Enterprise solely reserve all rights to terminate accounts, edit and/or remove contents and cancel any order on its website that is not in line with the 9jaWarehouse Enterprise policies, that defames the company, uploading of explicit pictures, use of 9jaWarehouse Enterprise name without proper approval, breach of terms and condition and destruction to any 9jaWarehouse Enterprise properties or intellectuals.
                            </li>

                          </ul>
                      </li>

                      <li className='mt-5'>
                          <b className=' font-Circular-std-book text-lg'>Cancellation and Termination</b>
                          <ul className=' list-decimal list-outside pl-10 pt-5'>
                            <li className='text-md font-Cerebri-sans-book'>
                            You may cancel your account and terminate the terms of services at any time by contacting 9jaWarehouse Enterprise support and then follow the instructions that will be sent. Upon termination, the following activities will occur:

                            <ol  className=' list-decimal list-outside pl-10 pt-5'>
                              <li className='text-md font-Cerebri-sans-book'>
                              Consumers will not be able to access the account.
                              </li>

                              <li className='text-md font-Cerebri-sans-book'>
                              Any associated website or listing on 9jaWarehouse will be taken offline.
                              </li>

                              <li className='text-md font-Cerebri-sans-book'>
                              Any outstanding balance owed to 9jaWarehouse will need to be paid in full.
                              </li>

                              <li className='text-md font-Cerebri-sans-book'>
                              Any associated website or listing domain will become inactive.
                              </li>

                            </ol>

                            <li className='text-md font-Cerebri-sans-book'>
                            At any time, there is a concern of fraud, such user account will be suspended pending further investigation and resolution of such activities. Any user that is reported to post explicit content will be subject to termination of account and no refund will be made to such business.
                            </li>


                            </li>

                          </ul>
                      </li>


                      <li className='mt-5'>
                          <b className=' font-Circular-std-book text-lg'>Subscription</b>
                          <ul className=' list-decimal list-outside pl-10 pt-5'>
                            <li className='text-md font-Cerebri-sans-book'>
                            9jaWarehouse Enterprise solely has the right to change the price of subscription. Users will be notified 30 days prior in an electronic communication prior to implementation of the change.
                            </li>

                          </ul>
                      </li>


                      <li className='mt-5'>
                          <b className=' font-Circular-std-book text-lg'>Applicable Law</b>
                          <ul className=' list-decimal list-outside pl-10 pt-5'>
                            <li className='text-md font-Cerebri-sans-book'>
                            By visiting this website, you agree that the laws in Nigeria without regard to principles of conflict laws, will govern these terms and conditions.
                            </li>
                          </ul>
                      </li>


                      <li className='mt-5'>
                          <b className=' font-Circular-std-book text-lg'>Dispute Resolution</b>
                          <ul className=' list-decimal list-outside pl-10 pt-5'>
                            <li className='text-md font-Cerebri-sans-book'>
                            Any disputes related to visiting this website shall be arbitrated by the state or federal government of Nigeria court and you consent to exclusive jurisdiction in Benin City, Nigeria.
                            </li>
                          </ul>
                      </li>


                      <li className='mt-5'>
                          <b className=' font-Circular-std-book text-lg'>Indemnification</b>
                          <ul className=' list-decimal list-outside pl-10 pt-5'>
                            <li className='text-md font-Cerebri-sans-book'>
                            By using this website, you agree to indemnify 9jaWarehouse and hold 9jaWarehouse harmless against legal claims and demands that may arise from your use or misuse of our services. 9jaWarehouse Enterprise reserve the right to select its own legal counsel.
                            </li>
                          </ul>
                      </li>

                      <li className='mt-5'>
                          <b className=' font-Circular-std-book text-lg'>Limitation on Liability</b>
                          <ul className=' list-decimal list-outside pl-10 pt-5'>
                            <li className='text-md font-Cerebri-sans-book'>
                            9jaWarehouse Enterprise is not liable for any damages that may occur to you because of misusing the 9jaWarehouse Enterprise website.
                            </li>

                            <li className='text-md font-Cerebri-sans-book'>
                            9jaWarehouse Enterprise solely reserve the right to edit, modify and change the agreement of this website at any time. Electronic communication will be sent to user regarding any changes to the agreement.
                            </li>
                          </ul>
                      </li>

                      <li className='mt-5'>
                          <b className=' font-Circular-std-book text-lg'>Applicable Law</b>
                          <ul className=' list-decimal list-outside pl-10 pt-5'>
                            <li className='text-md font-Cerebri-sans-book'>
                            This agreement shall be governed by and interpreted in accordance with the Laws for the Federal Republic of Nigeria. The place of jurisdiction shall exclusively be in Benin City, Nigeria.
                            </li>
                          </ul>
                      </li>

                      <li className='mt-5'>
                          <b className=' font-Circular-std-book text-lg'>Copyrights, Trademark & Restrictions</b>
                          <ul className=' list-decimal list-outside pl-10 pt-5'>
                            <li className='text-md font-Cerebri-sans-book'>
                            The material included herein, including site design, text, graphics, and the agreements are copyrights of 9jaWarehouse ALL RIGHT RESERVED.
                            </li>
                          </ul>
                      </li>

                    </ol>
                </div>

            </div>
        </div>

        <Footer />
    </div>
  );
}
