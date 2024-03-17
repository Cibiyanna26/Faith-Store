import successPurchaseImage from '../assets/jpg/success messaage.jpg'
import { Link } from 'react-router-dom';
const SuccessPurchase = () =>{
    return(
        <>
            <div className="h-[100vh] flex justify-center items-center bg-zinc-50">
                <div className='text-center flex flex-col gap-4'>
                    <div className=''>
                        <div className='w-[35rem] h-[35rem] rounded-xl'>
                            <img src={successPurchaseImage}></img>
                        </div>
                    </div>
                    <h1 className='text-2xl font-semibold'>Successful  ✅ !</h1>
                    <Link to="/purchase" className='text-xl text-gray-500 font-medium underline'>Your order placed Successfully</Link>
                </div>
            </div>

        </>
    )
}

export default SuccessPurchase;