import React, { useContext, useState } from 'react'
import Input from '../../UI/Input'
import { motion } from 'framer-motion'
import Spinner from '../../UI/Spinner'
import scout from '../../axios/scout'
import { AppContext } from '../../AppState'

export default function signIn({ setSignUp, setLogedIn }) {
    const { AppState, dispatch } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
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
            role: {
                value: '',
                placeholder: 'الوظيفة',
                valid: true,
                error: '',
                type: 'list2',
                items: [
                    {
                        title: 'قائد فصيلة',
                        value: 'teamleader'
                    },
                    {
                        title: 'شيف',
                        value: 'chef'
                    },
                    {
                        title: 'عازف',
                        value: 'musician'
                    }
                ]
            }
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

                    break;
                case 'password':
                    if (newState[item].value.length < 8) {
                        newState[item].valid = false
                        newState[item].error = 'يجب ان تكون كلمة السر من 8 محارف على الأقل'
                        valid = false
                    }
                    else{
                        newState[item].valid = true
                        newState[item].error = ''
                    }
                    break;
                case 'role':
                    if (newState[item].value == "") {
                        newState[item].valid = false
                        newState[item].error = 'الرجاء اختيار وظيفة'
                        valid = false
                    }
                    else{
                        newState[item].valid = true
                        newState[item].error = ''
                    }
                    break;
                default:
                    break;
            }
        })
        setInfo(newState)
        return (
            valid
        )
    }

    const setValue = (text, section) => {
        let newState = { ...info }
        newState[section].value = text
        setInfo(newState)
    }
    const LogIn = async () => {
        setLoading(true)
        setError(null)
        try {
            const information =
            {
                "userName": info.userName.value.trim(),
                "password": info.password.value.trim()
            }
            const res = await scout.post(`/${info.role.value}/v1/login`, information)
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userName", res.data[info.role.value].userName);
            localStorage.setItem("groupName", res.data[info.role.value].teamName);
            localStorage.setItem("role", res.data[info.role.value].role);
            localStorage.setItem("profilePic", res.data[info.role.value].profilePic);
            dispatch({ type: 'set', prop: 'logedIn', value: true })
            dispatch({ type: 'set', prop: 'userName', value: res.data[info.role.value].userName })
            dispatch({ type: 'set', prop: 'groupName', value: res.data[info.role.value].teamName })
            dispatch({ type: 'set', prop: 'role', value: res.data[info.role.value].role })
            dispatch({ type: 'set', prop: 'profilePic', value: res.data[info.role.value].profilePic })

            setLoading(false)
        }
        catch (error) {
            console.log(error);
            if (error.response?.data?.statusCode == 400) {
                setError('اسم المستخدم او كلمة المرور خطأ')
            }
            else {
                setError('هل أنت متأكد من وظيفتك..؟؟')
            }
            setLoading(false)

        }
    }

    const signin = async () => {
        if (checkValidation()) {
            LogIn()
        }
    }
    return (
        <motion.div key='signIn' initial={{ x: 1000 }} animate={{ x: 0 }} exit={{ x: -1000 }} className='absolute top-[300px] w-screen min-h-screen bg-custom-white pb-[65px] flex flex-col justify-start items-center'>
            <h1 onClick={() => setSignUp(null)} className='absolute -top-10 left-10 text-black font-black'>رجوع</h1>
            {/* <img src={logo} /> */}
            <div className='max-w-[400px] h-full flex flex-col justify-center items-center'>
                {Object.keys(info).map(item => <Input key={item} {...info[item]} info={item} setValue={setValue} />)}
            </div>
            <div onClick={() => signin()} className=' min-w-[300px] min-h-[40px] flex flex-col justify-center items-center py-10'>
                <h1 className='min-w-full min-h-full text-center text-white font-bold bg-purple rounded-[5px] cursor-pointer border border-1 border-black p-1 '>
                    تسجيل دخول
                </h1>
            </div>
            {
                loading && <Spinner />
            }
            {
                error && <h1 className='text-red-600 text-xl font-black'>{error}</h1>
            }
        </motion.div>
    )
}
