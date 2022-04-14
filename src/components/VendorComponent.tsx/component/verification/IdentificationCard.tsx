import React from 'react'
import Viewer from 'react-viewer';

export default function IdentificationCard({img}: {img: string}) {
    const [ visible, setVisible ] = React.useState(false);

    return (
        <>

            <Viewer
                visible={visible}
                onClose={() => { setVisible(false); } }
                images={[{src: img, alt: ''}]}
            />

            <div className='w-full flex' >
            <div style={{ height: '279px', background: '#F6F6F6 0% 0% no-repeat padding-box', border: '1px solid #ECECEC'}} className='flex justify-center items-center w-full' >
                <div style={{width: '663px', height: '244px', borderRadius: '5px'}} className=' bg-gray-300 overflow-hidden rounded-md' >
                    {img !== '' && <img src={img} alt="img" className='w-full h-full cursor-pointer object-contain' onClick={() => {setVisible(true)}} />}
                    {img === '' && (
                        <div className='w-full h-full flex justify-center items-center'>
                            <p>No Document Uploaded</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}
