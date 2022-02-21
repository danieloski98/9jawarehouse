import { Select, Input } from '@chakra-ui/react'
import React from 'react'

export default function Categories() {
    return (
        <div className='w-full py-10 px-10' >
            <div className='w-full flex items-center' > 
                <div className=''>
                    <p style={{fontSize: '20px'}} className='font-Graphik-Medium'>Categories</p>
                    <p style={{color: '#8A8A8A'}} className='text-sm font-Graphik-Regular' >Manage all categories on 9jawarehouse</p>
                </div>
                <div className='ml-auto'>
                    <button style={{backgroundColor: '#1A8F85'}} className='px-4 py-3 font-Graphik-Regular text-sm text-white flex items-center rounded-md ml-4' >+ New category</button>
                </div>
            </div> 
            <div className='w-full flex flex-col justify-center' > 
                <div className=' mx-auto grid grid-cols-2 gap-8 my-8' >
                    <div style={{width: '387px', height: '62px'}} className=' bg-white border border-[#70707038] px-6 rounded flex items-center' >
                        <p className='text-sm font-Graphik-Medium' >Category Name</p>
                        <div className='ml-auto flex items-center' >
                            <svg className='mx-3 cursor-pointer' id="Iconly_Bold_Edit" data-name="Iconly/Bold/Edit" xmlns="http://www.w3.org/2000/svg" width="12.218" height="13.913" viewBox="0 0 12.218 13.913">
                                <g id="Edit" transform="translate(0)">
                                    <path id="Edit-2" data-name="Edit" d="M11.793,4.406,4.959,13.244a1.637,1.637,0,0,1-1.271.635l-2.724.033a.311.311,0,0,1-.305-.242L.04,10.986a1.659,1.659,0,0,1,.314-1.4L5.2,3.32a.243.243,0,0,1,.33-.042L7.568,4.9a.658.658,0,0,0,.5.142.735.735,0,0,0,.636-.811.816.816,0,0,0-.256-.493L6.47,2.149a.294.294,0,0,1-.05-.409l.768-1a2.01,2.01,0,0,1,2.946-.2l1.147.911a2.384,2.384,0,0,1,.891,1.363,1.868,1.868,0,0,1-.38,1.589" fill="#200e32"/>
                                </g>
                            </svg>
                            <svg className='mx-3 cursor-pointer' id="Iconly_Bold_Delete" data-name="Iconly/Bold/Delete" xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15">
                                <g id="Delete">
                                    <path id="Delete-2" data-name="Delete" d="M3.991,14.971a2.233,2.233,0,0,1-2.28-2.12c-.244-2.135-.65-7.183-.658-7.234A.58.58,0,0,1,1.2,5.2a.56.56,0,0,1,.407-.176H12.4A.573.573,0,0,1,12.8,5.2a.546.546,0,0,1,.141.419c0,.051-.414,5.106-.651,7.234a2.236,2.236,0,0,1-2.33,2.12C8.956,14.993,7.972,15,7,15,5.975,15,4.968,14.993,3.991,14.971ZM.555,3.819A.557.557,0,0,1,0,3.268V2.983a.552.552,0,0,1,.555-.551H2.823a.989.989,0,0,0,.965-.761l.118-.512A1.536,1.536,0,0,1,5.394,0H8.606a1.536,1.536,0,0,1,1.48,1.123l.127.547a.988.988,0,0,0,.965.762h2.268A.552.552,0,0,1,14,2.983v.285a.557.557,0,0,1-.554.551Z" transform="translate(0)" fill="#200e32"/>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div style={{width: '387px', height: '62px'}} className=' bg-white border border-[#70707038] px-6 rounded flex items-center' >
                        <p className='text-sm font-Graphik-Medium' >Category Name</p>
                        <div className='ml-auto flex items-center' >
                            <svg className='mx-3 cursor-pointer' id="Iconly_Bold_Edit" data-name="Iconly/Bold/Edit" xmlns="http://www.w3.org/2000/svg" width="12.218" height="13.913" viewBox="0 0 12.218 13.913">
                                <g id="Edit" transform="translate(0)">
                                    <path id="Edit-2" data-name="Edit" d="M11.793,4.406,4.959,13.244a1.637,1.637,0,0,1-1.271.635l-2.724.033a.311.311,0,0,1-.305-.242L.04,10.986a1.659,1.659,0,0,1,.314-1.4L5.2,3.32a.243.243,0,0,1,.33-.042L7.568,4.9a.658.658,0,0,0,.5.142.735.735,0,0,0,.636-.811.816.816,0,0,0-.256-.493L6.47,2.149a.294.294,0,0,1-.05-.409l.768-1a2.01,2.01,0,0,1,2.946-.2l1.147.911a2.384,2.384,0,0,1,.891,1.363,1.868,1.868,0,0,1-.38,1.589" fill="#200e32"/>
                                </g>
                            </svg>
                            <svg className='mx-3 cursor-pointer' id="Iconly_Bold_Delete" data-name="Iconly/Bold/Delete" xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15">
                                <g id="Delete">
                                    <path id="Delete-2" data-name="Delete" d="M3.991,14.971a2.233,2.233,0,0,1-2.28-2.12c-.244-2.135-.65-7.183-.658-7.234A.58.58,0,0,1,1.2,5.2a.56.56,0,0,1,.407-.176H12.4A.573.573,0,0,1,12.8,5.2a.546.546,0,0,1,.141.419c0,.051-.414,5.106-.651,7.234a2.236,2.236,0,0,1-2.33,2.12C8.956,14.993,7.972,15,7,15,5.975,15,4.968,14.993,3.991,14.971ZM.555,3.819A.557.557,0,0,1,0,3.268V2.983a.552.552,0,0,1,.555-.551H2.823a.989.989,0,0,0,.965-.761l.118-.512A1.536,1.536,0,0,1,5.394,0H8.606a1.536,1.536,0,0,1,1.48,1.123l.127.547a.988.988,0,0,0,.965.762h2.268A.552.552,0,0,1,14,2.983v.285a.557.557,0,0,1-.554.551Z" transform="translate(0)" fill="#200e32"/>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div style={{width: '387px', height: '62px'}} className=' bg-white border border-[#70707038] px-6 rounded flex items-center' >
                        <p className='text-sm font-Graphik-Medium' >Category Name</p>
                        <div className='ml-auto flex items-center' >
                            <svg className='mx-3 cursor-pointer' id="Iconly_Bold_Edit" data-name="Iconly/Bold/Edit" xmlns="http://www.w3.org/2000/svg" width="12.218" height="13.913" viewBox="0 0 12.218 13.913">
                                <g id="Edit" transform="translate(0)">
                                    <path id="Edit-2" data-name="Edit" d="M11.793,4.406,4.959,13.244a1.637,1.637,0,0,1-1.271.635l-2.724.033a.311.311,0,0,1-.305-.242L.04,10.986a1.659,1.659,0,0,1,.314-1.4L5.2,3.32a.243.243,0,0,1,.33-.042L7.568,4.9a.658.658,0,0,0,.5.142.735.735,0,0,0,.636-.811.816.816,0,0,0-.256-.493L6.47,2.149a.294.294,0,0,1-.05-.409l.768-1a2.01,2.01,0,0,1,2.946-.2l1.147.911a2.384,2.384,0,0,1,.891,1.363,1.868,1.868,0,0,1-.38,1.589" fill="#200e32"/>
                                </g>
                            </svg>
                            <svg className='mx-3 cursor-pointer' id="Iconly_Bold_Delete" data-name="Iconly/Bold/Delete" xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15">
                                <g id="Delete">
                                    <path id="Delete-2" data-name="Delete" d="M3.991,14.971a2.233,2.233,0,0,1-2.28-2.12c-.244-2.135-.65-7.183-.658-7.234A.58.58,0,0,1,1.2,5.2a.56.56,0,0,1,.407-.176H12.4A.573.573,0,0,1,12.8,5.2a.546.546,0,0,1,.141.419c0,.051-.414,5.106-.651,7.234a2.236,2.236,0,0,1-2.33,2.12C8.956,14.993,7.972,15,7,15,5.975,15,4.968,14.993,3.991,14.971ZM.555,3.819A.557.557,0,0,1,0,3.268V2.983a.552.552,0,0,1,.555-.551H2.823a.989.989,0,0,0,.965-.761l.118-.512A1.536,1.536,0,0,1,5.394,0H8.606a1.536,1.536,0,0,1,1.48,1.123l.127.547a.988.988,0,0,0,.965.762h2.268A.552.552,0,0,1,14,2.983v.285a.557.557,0,0,1-.554.551Z" transform="translate(0)" fill="#200e32"/>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div style={{width: '387px', height: '62px'}} className=' bg-white border border-[#70707038] px-6 rounded flex items-center' >
                        <p className='text-sm font-Graphik-Medium' >Category Name</p>
                        <div className='ml-auto flex items-center' >
                            <svg className='mx-3 cursor-pointer' id="Iconly_Bold_Edit" data-name="Iconly/Bold/Edit" xmlns="http://www.w3.org/2000/svg" width="12.218" height="13.913" viewBox="0 0 12.218 13.913">
                                <g id="Edit" transform="translate(0)">
                                    <path id="Edit-2" data-name="Edit" d="M11.793,4.406,4.959,13.244a1.637,1.637,0,0,1-1.271.635l-2.724.033a.311.311,0,0,1-.305-.242L.04,10.986a1.659,1.659,0,0,1,.314-1.4L5.2,3.32a.243.243,0,0,1,.33-.042L7.568,4.9a.658.658,0,0,0,.5.142.735.735,0,0,0,.636-.811.816.816,0,0,0-.256-.493L6.47,2.149a.294.294,0,0,1-.05-.409l.768-1a2.01,2.01,0,0,1,2.946-.2l1.147.911a2.384,2.384,0,0,1,.891,1.363,1.868,1.868,0,0,1-.38,1.589" fill="#200e32"/>
                                </g>
                            </svg>
                            <svg className='mx-3 cursor-pointer' id="Iconly_Bold_Delete" data-name="Iconly/Bold/Delete" xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15">
                                <g id="Delete">
                                    <path id="Delete-2" data-name="Delete" d="M3.991,14.971a2.233,2.233,0,0,1-2.28-2.12c-.244-2.135-.65-7.183-.658-7.234A.58.58,0,0,1,1.2,5.2a.56.56,0,0,1,.407-.176H12.4A.573.573,0,0,1,12.8,5.2a.546.546,0,0,1,.141.419c0,.051-.414,5.106-.651,7.234a2.236,2.236,0,0,1-2.33,2.12C8.956,14.993,7.972,15,7,15,5.975,15,4.968,14.993,3.991,14.971ZM.555,3.819A.557.557,0,0,1,0,3.268V2.983a.552.552,0,0,1,.555-.551H2.823a.989.989,0,0,0,.965-.761l.118-.512A1.536,1.536,0,0,1,5.394,0H8.606a1.536,1.536,0,0,1,1.48,1.123l.127.547a.988.988,0,0,0,.965.762h2.268A.552.552,0,0,1,14,2.983v.285a.557.557,0,0,1-.554.551Z" transform="translate(0)" fill="#200e32"/>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
