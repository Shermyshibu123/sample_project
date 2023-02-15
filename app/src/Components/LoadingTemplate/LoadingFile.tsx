import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../lotties/loading.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
function LoadingFile() {
  return (
        <div className='position-absolute'>
        <Lottie
          options={defaultOptions}
          height={250}
          width={250}
        
        />
      </div>
  );
}
export default LoadingFile;
