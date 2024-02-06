import React, { useContext, useState } from 'react'
import Input from '../../UI/Input'
import logo from './../../assets/logo.svg'
import { motion } from 'framer-motion'
import Spinner from '../../UI/Spinner'
import scout from '../../axios/scout'
import { AppContext } from '../../AppState'

export default function SignUp({ setSignUp }) {
  const {AppState , dispatch} = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [error , setError] = useState(null)
    const [info, setInfo] = useState(
        {
            userName: {
                value: '',
                placeholder: 'اسم المستخدم',
                valid: true,
                error: '',
                type: 'text',
                items: []

            },
            password: {
                value: '',
                placeholder: 'كلمة المرور',
                valid: true,
                error: '',
                type: 'password',
                items: []
            },
            age: {
                value: '',
                placeholder: 'العمر',
                valid: true,
                error: '',
                type: 'number',
                items: []
            },
            instrument: {
                value: '',
                placeholder: 'نوع الآلة',
                valid: true,
                error: '',
                type: 'list',
                items: [
                    'طنبور',
                    'طبل',
                    'صنج',
                    'ترومبيت',
                    'ترمبون',
                    'باريتون'
                ]
            },
            gender: {
                value: '',
                placeholder: 'الجنس',
                valid: true,
                error: '',
                type: 'list2',
                items: [
                    {
                        title: 'ذكر',
                        value: true
                    },
                    {
                        title: 'انثى',
                        value: false
                    }
                ]
            },
            group: {
                value: '',
                placeholder: 'اسم الفصيلة الكشفية',
                valid: true,
                error: '',
                type: 'list2',
                items: [
                    {
                        title:'باغيرا',
                        value:'باغيرا'
                    } ,
                    {
                        title:'جاغوار',
                        value:'جاغوار'
                    },
                    {
                        title:'شاهين',
                        value:'شاهين'
                    }
                ]
            },

        }
    )


    const checkValidation = () => {
        const newState = { ...info }
        let valid = true
        Object.keys(newState).map(item => {
            switch (item) {
                case 'userName':
                    const text = /^(?=.*?\p{Script_Extensions=Arabic})[- ().,\p{Script_Extensions=Arabic}]+$/u
                    if (newState[item].value.length < 5 && newState[item].value.length > 64) {
                        newState[item].valid = false
                        newState[item].error = 'اسم غير مقبول'
                        valid = false
                    }
                    else if (!text.test(newState[item].value)) {
                        newState[item].valid = false
                        newState[item].error = 'يجب ان يكون الاسم بالأحرف العربية فقط'
                        valid = false
                    }
                    else {
                        newState[item].valid = true
                        newState[item].error = ''
                    }

                    break;
                case 'group':
                    if (newState[item].value =="") {
                        newState[item].valid = false
                        newState[item].error = 'الرجاء تحديد الفصيلة'
                        valid = false
                    }
                    else {
                        newState[item].valid = true
                        newState[item].error = ''
                    }

                    break;
                case 'password':
                    if (newState[item].value.length < 8) {
                        newState[item].valid = false
                        newState[item].error = 'يجب ان تكون كلمة السر من 8 محارف على الأقل'
                        valid = false
                    }
                    else {
                        newState[item].valid = true
                        newState[item].error = ''
                    }
                    break;
                case 'age':
                    const numbers = /^[0-9]+$/
                    if (!numbers.test(newState[item].value)) {
                        newState[item].valid = false
                        newState[item].error = 'العمر بالأرقام فقط'
                        valid = false
                    }
                    else {
                        newState[item].valid = true
                        newState[item].error = ''
                    }
                    break;
                case 'instrument':
                    if (newState[item].value == '') {
                        newState[item].valid = false
                        newState[item].error = 'الرجاء اختيار آلة'
                        valid = false
                    }
                    else {
                        newState[item].valid = true
                        newState[item].error = ''
                    }
                    break;
                case 'gender':
                    if (newState[item].value == '') {
                        newState[item].valid = false
                        newState[item].error = 'الرجاء تحديد الجنس'
                        valid = false
                    }
                    else {
                        newState[item].valid = true
                        newState[item].error = ''
                    }
                default:
                    break;
            }
        })
        setInfo(newState)
        console.log(valid);
        return (
            valid
        )
    }

    const setValue = (text, section) => {
        let newState = { ...info }
        newState[section].value = text
        setInfo(newState)
    }
    const register = async () => {
        setLoading(true)
        setError(null)

        try {
            const information =
            {
                "userName": info.userName.value.trim(),
                "password": info.password.value.trim(),
                "gender": info.gender.value,
                "age": info.age.value,
                "instrument": info.instrument.value,
                "teamName": info.group.value
            }
            const res = await scout.post('/musician/v1/signUp', information)
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userName", res.data.musician.userName);
            localStorage.setItem("groupName", res.data.musician.teamName);
            localStorage.setItem("role", res.data.musician.role);
            localStorage.setItem("profilePic", res.data.musician.profilePic);
            dispatch({type:'set' , prop:'logedIn' , value:true})
            dispatch({type:'set' , prop:'userName' , value:res.data.musician.userName})
            dispatch({type:'set' , prop:'groupName' , value:res.data.musician.teamName})
            dispatch({type:'set' , prop:'role' , value:res.data.musician.role})
            dispatch({type:'set' , prop:'profilePic' , value:res.data.musician.profilePic})
            setLoading(false)
        }
        catch (error) {
            // console.log(error.response.data.statusCode);
            if(error.response.data.statusCode==409){
                setError('هذا المستخدم موجود ')
            }
            setLoading(false)

        }
    }
    const signup = () => {
        if (checkValidation()) {
            console.log('signUp');
            register()
        }
    }
    return (
        <motion.div key='signUp' initial={{ x: 1000 }} animate={{ x: 0 }} exit={{ x: -1000 }} className='absolute top-[300px] w-screen min-h-screen bg-custom-white pb-[65px] flex flex-col justify-start items-center'>
            <h1 onClick={() => setSignUp(null)} className='absolute -top-10 left-10 text-black font-black'>رجوع</h1>
            {/* <img src={logo} /> */}
            <div className='max-w-[400px] h-full flex flex-col justify-center items-center'>
                {Object.keys(info).map(item => <Input key={item} {...info[item]} info={item} setValue={setValue} />)}
            </div>
            <div onClick={() => signup()} className=' min-w-[300px] min-h-[40px] flex flex-col justify-center items-center py-10'>
                <h1 className='min-w-full min-h-full text-center text-white font-bold bg-purple rounded-[5px] cursor-pointer border border-1 border-black p-1 '>
                    انشاء حساب
                </h1>
            </div>
            {
                loading && <Spinner />
            }
            {
                error && <h1 className='text-red-600 text-xl font-black'>{error}</h1>
            }
        </motion.div >
    )
}
