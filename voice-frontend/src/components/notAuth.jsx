import forbiddenImage from '../assets/jpg/forbidden-403.jpg'
import { Link } from 'react-router-dom';
const NotAuth = () => {
    return (
        <>
            <div className="h-[100vh] flex justify-center items-center bg-zinc-50">
                <div className='text-center flex flex-col gap-4'>
                    <div className=''>
                        <div className='w-[35rem] h-[35rem] rounded-xl'>
                            <img src={forbiddenImage}></img>
                        </div>
                    </div>
                    <h1 className='text-2xl font-semibold'>UnAuthorized  404 ❌ !</h1>
                    <div  className='text-xl text-gray-500 font-medium flex flex-row gap-4 rounded-xl justify-center'>
                       <div>
                            <label>User <Link to="/login" className='underline text-blue-500'> login</Link> &  <Link to="/home" className='underline text-blue-500'>Dashboard</Link></label>
                       </div>
                    </div>
                    <div className='text-xl text-gray-500 font-medium flex flex-row gap-4 rounded-xl justify-center'>
                        <div>
                            <label>Admin <Link to="/admin/login" className='underline text-blue-500'> login</Link> &  <Link to="/admin/home" className='underline text-blue-500'>Dashboard</Link></label>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default NotAuth