import { useNavigate } from 'react-router-dom'
import dullImage from '../../assets/jpg/login-dull.jpg'
import goodImage from '../../assets/jpg/login-bright.jpg'
import goodImageno from '../../assets/png/login-bright-nobg.png'
import dullImageno from '../../assets/png/login-dull-nodb.png'
import { setCookie } from '../../utils/service.js' 
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(0)

    const Login = async (e) => {
        e.preventDefault()
        try {
            setLoading(1)
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/admin/login`,
                {
                    username,
                    password
                },
                {
                    withCredentials: true,
                }
            )
            setLoading(0)
            toast.success("Admin Succesfully LoggedIn !");
            setCookie('token', res.data.accessToken, 160)
            navigate('/admin/dashboard')
        } catch (err) {
            toast.error(err.response.data.message)
            setLoading(0)
        }
    }

    const navigate = useNavigate()
    const navigateToRegister = () => {
        navigate('/admin/register')
    }
    return (
        <>
            <div className="h-[100vh]">
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                <div className="grid grid-cols-2 h-full">

                    <div className="relative flex items-center z-30" >
                        <div className="w-[33rem] h-[33rem] bg-[#FC8A06] opacity-70 absolute transform rotate-12 z-10"></div>
                        <div className="w-[33rem] h-[33rem] bg-[#FC8A06] opacity-50 absolute transform rotate-45 z-30"></div>
                        <div className='w-[25rem] h-[25rem] absolute z-20 top-[9rem] left-[4rem]'>
                            <img src={dullImageno}></img>
                        </div>
                        <div className='w-[25rem] h-[25rem] z-40 absolute top-[8rem] right-[6rem]'>
                            <img src={goodImageno}></img>
                        </div>
                    </div>
                    <div className="ml-10 w-[30rem]">
                        <div className="flex flex-co  items-center h-full">
                            <div className="flex flex-col gap-y-8 w-full">
                                <div className="flex flex-col">
                                    <h1 className="mb-4 text-3xl  font-bold">Admin Login ! </h1>
                                    <label className="text-gray-500">Enter your Credentials to access your account</label>
                                </div>

                                <form className="flex flex-col gap-y-4" onSubmit={Login}>
                                    <div className="flex flex-col gap-2">
                                        <label for="username" className="text-md font-medium">Username</label>
                                        <input
                                            type="text"
                                            id="username"
                                            className="rounded-xl text-base/7 w-[25rem] shadow-md bg-gray-100 focus:outline-none  foucs:bg-gray-200 p-2 duration-200 ease-in-out"
                                            placeholder="Enter your name"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}></input>
                                    </div>

                                    <div className="flex flex-col gap-2" >
                                        <label for="password" className="text-md font-medium">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            className="rounded-xl text-base/7 w-[25rem] shadow-md bg-gray-100 focus:outline-none foucs:bg-gray-200 p-2 duration-200 ease-in-out"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}></input>
                                    </div>
                                    <div className="flex flex-row items-center gap-1">
                                        <input type="checkbox"></input>
                                        <label>I agree to the <span className="underline">terms & policy</span></label>
                                    </div>
                                    {
                                        (loading === 0) ?
                                            <>
                                                <button className="bg-[#FD9824] w-[25rem] p-2 rounded-xl text-white shadow-md shadow-[#FD9824] hover:opacity-90 duration-200 ease-in-out" aria-label="click to login">Login</button>

                                            </> :
                                            (loading === 1) ?
                                                <>
                                                    <button class="buttonload bg-[#FD9824] w-[25rem] p-2 rounded-xl text-white shadow-md shadow-[#FD9824] hover:opacity-90 duration-200 ease-in-out" aria-label="loading">
                                                        <i class="fa fa-circle-o-notch fa-spin"></i>
                                                    </button>
                                                </> :
                                                <>
                                                </>
                                    }
                                </form>
                                <div className="w-full">
                                    <div className="grid grid-cols-9 w-[25rem]">
                                        <div className="col-span-4 flex items-center">
                                            <div className=" bg-gray-300 h-[1px] w-full"></div>
                                        </div>
                                        <div className="text-center">
                                            <label className="text-gray-600">or</label>
                                        </div>
                                        <div className="col-span-4 flex items-center">
                                            <div className=" bg-gray-300 h-[1px] w-full "></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <div className="w-[25rem] text-center">
                                        <button className="px-4 py-2 rounded-xl bg-gray-300 shadow-md text-gray-600 hover:bg-gray-400 hover:text-gray-100 duration-300 ease-out" onClick={()=>navigate('/login')}>Student Login</button>
                                    </div>
                                    <div className="w-[25rem] text-center">
                                        <label>Don't have a account ? <button className="text-blue-600 underline" aria-label="navigate to signup page" onClick={navigateToRegister}>Signup</button></label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLogin;

