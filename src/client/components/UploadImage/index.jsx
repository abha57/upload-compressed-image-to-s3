import React, { useState, useRef } from 'react';

import Dropzone from 'components/Dropzone';
import { uploadImage } from 'services/uploadImage';
import { fileReader } from 'utils/filereader';

const UploadImage = (props) => {
    const onFileUpload = async (file) => {
        const { canvas: cv, srcEncoded } = await fileReader(file);
        const container = document.getElementById('canvas');
        container.appendChild(cv);
        const response = await uploadImage(file);
    }
    return (
        <>
            <Dropzone className={'dropzone'} onFileUpload={onFileUpload} />
            <div id='canvas'></div>
        </>
       
        
    )
};

export default UploadImage;