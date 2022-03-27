import React from 'react'
import {Input, Textarea, Select, Spinner} from '@chakra-ui/react'

interface IProps {
    docType: string;
    setDocType: Function;
    doc: string;
    pickDoc: Function;
    docName: string;
    cac: string;
    pickCac: Function
    cacName: string;
    submit: Function;
    loading: boolean;
}

export default function DocForm({docType, doc, pickDoc, setDocType, docName, cac, pickCac, cacName, loading, submit}: IProps) {
  return (
    <div className='w-full h-auto flex flex-col items-center'>

         <div className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full flex h-auto xl:items-end lg:items-end md:items-start sm:items-start mt-16 xl:flex-row lg:flex-row md:flex-col sm:flex-col">
                   <div className="flex-col w-full flex flex-1 mr-3" >
                       <label htmlFor="" className='mb-3 font-Circular-std-book text-black'>Select Identity Document</label>
                       <div className="w-full h-16">
                       <Select bg="whitesmoke" h="63px" value={docType} onChange={(e) => setDocType(e.target.value)} fontSize="sm" borderRadius={0} borderWidth="0px" className='font-Circular-std-book'>
                           <option value="Drivers License">Driver Lincense</option>
                           <option value="NIN">NIN</option>
                           <option value="company ID">Company ID</option>
                       </Select>
                       </div>
                   </div>
                   <div className="flex-1 h-16 w-2/4 flex flex-col">
                       {doc !== '' && (
                           <div className="flex w-full items-center">
                               <div onClick={() => pickDoc()} className="w-full h-16 xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4 bg-yellow-100 text-yellow-500 cursor-pointer flex items-center justify-center px-3 overflow-hidden">
                                    {docName}
                                </div>
                                <p onClick={() => pickDoc()} className='ml-2 font-Circular-std-book cursor-pointer text-themeGreen'>Change</p>
                           </div>
                       )}
                       {
                           doc === '' && (
                            <button onClick={() => pickDoc()} className="w-full h-16 xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4 bg-green-100 text-green-500 cursor-pointer flex items-center justify-center">
                                Tap To Upload Document
                            </button>
                           )
                       }
                   </div>
               </div>

               <div className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full flex h-auto xl:items-end lg:items-end md:items-start sm:items-start xl:mt-16 lg:mt-16 md:mt-6 sm:mt-6 xl:flex-row lg:flex-row md:flex-col sm:flex-col">
                   <div className="flex-col w-2/4 flex flex-1 mr-3" >
                       <label htmlFor="" className='mb-3 font-Circular-std-book text-black'>CAC Document <span className='text-gray-400'>(optional)</span></label>
                       {cac !== '' && (
                           <div className="flex items-center">
                               <div onClick={() => pickCac()} className="w-full h-16 xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4 bg-yellow-100 text-yellow-500 cursor-pointer flex items-center justify-center overflow-hidden">
                                    {cacName}
                                </div>
                                <p onClick={() => pickCac()} className='ml-2 font-Circular-std-book cursor-pointer text-themeGreen'>Change</p>
                           </div>
                       )}
                       {
                           cac === '' && (
                            <button onClick={() => pickCac()} className="w-full h-16 xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4 bg-green-100 text-green-500 cursor-pointer flex items-center justify-center">
                                Tap To Upload Document
                            </button>
                           )
                       }
                   </div>
                   <div className="flex-1 h-full flex flex-col">
                       
                   </div>
               </div>

               <div className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full flex h-auto xl:items-end lg:items-end md:items-start sm:items-start xl:mt-16 lg:mt-16 md:mt-6 sm:mt-6 xl:flex-row lg:flex-row md:flex-col sm:flex-col mb-8">
                   <div className="flex-col flex flex-1 mr-3" >
                       {/* <label htmlFor="" className='mb-3 font-Circular-std-book text-black'>CAC Document (optional)</label>
                       <div className="w-full h-16 bg-green-100 text-green-500 cursor-pointer flex items-center justify-center">
                           Tap To Upload Document
                       </div> */}
                   </div>
                   <div className="flex-1 h-16 w-full flex flex-col">
                   <button onClick={() => submit()} className="w-full sm:w-full mt-0 xl:h-16 lg:h-16 md:h-12 sm:h-12 bg-themeGreen cursor-pointer flex justify-center items-center">
                        {!loading && <span className="ml-0 text-sm font-Cerebri-sans-book text-white">Submit</span>}
                        {loading && <Spinner color="white" size="sm" />}
                    </button>
                   </div>
               </div>
    </div>
  )
}