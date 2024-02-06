import React, { useState } from 'react'
import eye from './../assets/eye.png'
import closedEye from './../assets/closedEye.png'
export default function Input({ value, valid, error, type, items, placeholder, setValue, info }) {
    const [show , setShow] = useState(false)
    switch (type) {
        case 'text':
            return (
                <>
                    <input key={info} onChange={(event) => { setValue(event.target.value, info) }} placeholder={placeholder} style={{ borderColor: valid ? '#ffffff' : 'red', color: valid ? 'black' : 'red' }} className=' relative w-[350px] h-[40px] flex  justify-center items-center border border-1 bg-white my-2 rounded-[5px] overflow-hiddenr text-right px-3' />
                    {
                        !error == "" && <h1 className='w-full text-red-500 text-right'>{error}</h1>
                    }
                </>

            )
        case 'password':
            return (
                <>
                    <div key={info} style={{ borderColor: valid ? '#ffffff' : 'red' }} className=' relative w-[350px] h-[40px] flex  justify-center items-center border border-1 bg-white my-2 rounded-[5px] overflow-hidden'>
                        <img onClick={() => setShow(prev => !prev)} className='absolute left-2 w-7' src={show ? closedEye : eye} />
                        <input onChange={(event) => setValue(event.target.value, info)} style={{ color: valid ? 'black' : 'red' }} type={show ? 'input' : type} placeholder={placeholder} className='w-full h-full bg-white placeholder-gray-500 text-right px-3' />
                    </div>
                    {
                        !error == "" && <h1 className='w-full text-red-500 text-right'>{error}</h1>
                    }
                </>
            )
        case 'number':
            return (
                <>
                    <input key={info} onChange={(event) => setValue(event.target.value, info)} type={type} placeholder={placeholder} style={{ borderColor: valid ? '#ffffff' : 'red', color: valid ? 'black' : 'red' }} className=' relative text-black w-[350px] h-[40px] flex  justify-center items-center border border-1 bg-white my-2 rounded-[5px] overflow-hidden text-right px-3' />
                    {
                        !error == "" && <h1 className='w-full text-red-500 text-right'>{error}</h1>
                    }
                </>


            )
        case 'list':
            return (
                <>
                    <select key={info} onChange={(event) => setValue(event.target.value, info)} type={type} placeholder={placeholder} style={{ borderColor: valid ? '#ffffff' : 'red', color: valid ? 'black' : 'red' }} className=' relative text-black w-[350px] h-[40px] flex  justify-center items-center border border-1 bg-white my-2 rounded-[5px] overflow-hidden text-right px-3'>
                        <option value="" disabled selected className='text-gray-600'>{placeholder}</option>
                        {
                            items.map((item, index) => <option key={index} value={item}>{item}</option>)
                        }
                    </select>
                    {
                        !error == "" && <h1 className='w-full text-red-500 text-right'>{error}</h1>
                    }
                </>
            )
        case 'list2':
            return (
                <>
                    <select key={info} onChange={(event) => setValue(event.target.value, info)} type={type} placeholder={placeholder} style={{ borderColor: valid ? '#ffffff' : 'red', color: valid ? 'black' : 'red' }} className=' relative text-black w-[350px] h-[40px] flex  justify-center items-center border border-1 bg-white my-2 rounded-[5px] overflow-hidden text-right px-3'>
                        <option value="" disabled selected className='text-gray-600'>{placeholder}</option>
                        {
                            items.map((item, index) => <option key={index} value={item.value}>{item.title}</option>)
                        }
                    </select>
                    {
                        !error == "" && <h1 className='w-full text-red-500 text-right'>{error}</h1>
                    }
                </>
            )
        default:
            break;
    }

}
