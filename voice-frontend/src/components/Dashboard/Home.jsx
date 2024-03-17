import { Link } from 'react-router-dom';
import vegeImage from '../../assets/jpg/home-page-image.jpg'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const HomeTop = () =>{
    return(
        <>
            <div className="h-[43rem] bg-home-page bg-cover">
                <div className="w-[90%] mx-auto h-full flex justify-end">
                    <div className='w-[30rem] text-white flex flex-col justify-center'>
                        <div className='flex flex-col gap-y-6 justify-center items-center'>
                            <h1 className='text-3xl/10 font-extrabold text-center'>Fill your Daily Need Here Happily !</h1>
                            <div>
                                <Link to={'/product'} className='flex flex-row gap-x-4 items-center px-8 py-3 rounded-2xl text-xl font-semibold bg-teal-600 shadow-md hover:shadow-none duration-200 ease-in'>
                                    <span>Look</span>
                                    <svg width="34" height="34" viewBox="0 0 74 74" fill="white" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="37" cy="37" r="35.5" stroke="white" stroke-width="3"></circle>
                                        <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const HomeLove = () =>{
    return(
        <>
            <div className='my-[2rem]'>
                <div className='flex flex-col gap-y-4 w-[90%] mx-auto p-4'>
                    <div className='text-center'>
                        <h1 className='text-3xl font-bold'>Love our categories</h1>
                    </div>
                    <div className='grid grid-cols-5 gap-x-4 p-4'>
                        <div className='p-2  rounded-full outline-dashed outline-2 outline-green-400 w-[15rem] h-[15rem] relative overflow-hidden flex justify-center items-center bg-green-500 border-2 border-white'>
                            <div className='p-2'>

                            </div>
                            <label className='text-white'>Healty Foods</label>

                        </div>
                        <div className='p-2  rounded-full outline-dashed outline-2 outline-green-400 w-[15rem] h-[15rem] relative overflow-hidden flex justify-center items-center bg-green-500 border-2 border-white'>
                            <div></div>
                            <p className='text-white'>Quality Products</p>
                        </div>
                        <div className='p-2  rounded-full outline-dashed outline-2 outline-green-400 w-[15rem] h-[15rem] relative overflow-hidden flex justify-center items-center bg-green-500 border-2 border-white'>
                            <div></div>
                            <p className='text-white'>Snacks and Fresh Fruits</p>
                        </div>
                        <div className='p-2  rounded-full outline-dashed outline-2 outline-green-400 w-[15rem] h-[15rem] relative overflow-hidden flex justify-center items-center bg-green-500 border-2 border-white'>
                            <div></div>
                            <p className='text-white'>Cold Drinks & juices</p>
                        </div>
                        <div className='p-2  rounded-full outline-dashed outline-2 outline-green-400 w-[15rem] h-[15rem] relative overflow-hidden flex justify-center items-center bg-green-500 border-2 border-white'>
                            <div></div>
                            <p className='text-white'>Hair Saloon</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


const Home = () => {
    const navigate = useNavigate()

    useEffect(()=>{
        checkUser()
    },[])

    async function checkUser(){
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/user`, {
                withCredentials: true,
            })
        } catch (err) {
            navigate('/unauth')
        }
    }
    return (
        <>  
            <HomeTop/>
            <HomeLove/>
        </>
    )
}


export default Home;