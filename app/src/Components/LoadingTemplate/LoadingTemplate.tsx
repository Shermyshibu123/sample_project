import React from 'react';
import './loading.less';
import LoadingFile from './LoadingFile';

function LoadingTemplate(props:any) {
    return(
        <>
        <div className="d-flex align-items-center justify-content-center h-100  no-data-bg" id={props?.id ? props?.id : 'loadingScreen'}>
               <div className="card w-100 h-100 bg-white d-flex flex-column content-wrapper align-items-center justify-content-center">
               <div className='text-center'>
               <div className='lottie-container  position-relative' >
                 <LoadingFile/>
                 <div className="loading-Percentage position-absolute">
                   <p className="mb-0">75%</p>
                 </div>
                </div>
                <p className="loading-text">Loading...</p>
               </div>
                 </div>
            </div>
            </>
        
    )
}
export default LoadingTemplate;