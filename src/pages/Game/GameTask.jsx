import React, { useRef, useState } from 'react'
import camera from './../../assets/camera.png'
import {motion} from 'framer-motion'
import Compressor from 'compressorjs';
import scout from '../../axios/scout';

export default function GameTask({ completed, task, taskPic , sendPic , id}) {

    const [image, setImage] = useState(null)
    const [error , setError] = useState(null)
    const hiddenFileInput = useRef(null);
    const allowedTypes = ["image/jpeg", "image/png"];
    const handleChange = (event) => {
        setError(null)
        if (!allowedTypes.includes(event.target.files[0]?.type)) {

            setError("تقبل الصور من لاحقة Jpeg أو Png فقط");
            return;
          }
        //   setImage(event.target.files[0])
        new Compressor(event.target.files[0], {
            quality: 0.4, // 0.6 can also be used, but its not recommended to go below.
            success: (compressedResult) => {
              // compressedResult has the compressed file.
              // Use the compressed file to upload the images to your server.        
              setImage(compressedResult)
            },
            error:() => {console.log(error);}
          });
    }
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    return (
        <>
        
        <motion.div layout className='relative w-full flex flex-row-reverse justify-evenly items-center bg-purple rounded-lg p-5  '
            style={image ? { flexDirection: 'column' } : { flexDirection: 'row-reverse' }}
        >
            <h1 key='task' className='relative w-full text-right text-white text-xl font-black'>{task}</h1>
            <input ref={hiddenFileInput} className='hidden' type='file' onChange={handleChange} />
            {
                completed ?
                    <h1 key='rate' className='relative w-full text-left text-white text-xl font-black'>...يتم التقييم</h1>

                    :
                    image ?
                        <div key='image'>
                            <img className='max-w-full rounded-lg py-5' src={URL.createObjectURL(image)} />
                            <div className='relative w-full flex flex-row justify-evenly items-center '>
                            <h1 onClick={() => setImage(null)} className='w-fit rounded-full px-7 py-3 bg-white text-purple'>الغاء</h1>
                            <h1 onClick={() => {
                                setImage(null)
                                sendPic(image , id)
                                }} className='w-fit rounded-full px-7 py-3 bg-white text-purple'>تأكيد</h1>
                                
                                </div>
                        </div>
                        :
                        <div key='camera' className='relative flex flex-col justify-center items-center'>
                            <div onClick={handleClick} className='relative w-fit bg-custom-white p-2 rounded-full '>
                                <img className='w-16 max-h-16' src={camera} />
                            </div>
                            <h1 className='relative text-white font-bold text-center'>تحميل صورة المهمة</h1>
                        </div>
            }
           

        </motion.div>
        {
                    error &&
                    <h1 className=' text-red-600 text-3xl font-black text-center py-20'>{error}</h1>

            }
        </>
    )
}
