import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { removeAllCartItems } from '../../redux/cartStore';
import { useNavigate } from 'react-router-dom';
function getDateandDay(time){
    const timestamp = new Date(time);

    const date = timestamp.getDate();

    const month = timestamp.getMonth() + 1; 


    const year = timestamp.getFullYear().toString().slice(-2); 

    const formattedDate = String(date).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');

    const formattedDateString = `${formattedDate}-${formattedMonth}-${year}`;

    return {date:formattedDateString}

}

const PurchaseCart = (props) =>{
    const {pur} = props;
    const {date} = getDateandDay(pur.createdAt)
    return(
        <>  
            <div className='rounded-xl bg-gray-100 min-h-[10rem] opacity-70 shadow-md p-4 text-black'>
                <div>
                    <div>
                        <h1 className='text-right text-md'>{date}</h1>
                    </div>
                    <div className='flex flex-col gap-y-8'>
                        <label className='text-xl font-semibold'>The Quantity Purchased : <span>{pur.purchased_items.length}</span></label>
                        <label className='text-md font-medium'>Paid : <span className=''>${pur.total}</span></label>
                    </div>
                </div>  
            </div>
        </>
    )
}


const Purchase = () =>{
    const [purchased , setPurchased]= useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        checkUser()
        fetchPurchase()
    }, [])
    async function checkUser() {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/user`, {
                withCredentials: true,
            })
        } catch (err) {
            navigate('/unauth')
        }
    }
  

    async function fetchPurchase() {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchase`, {
                withCredentials: true,
            })
            setPurchased(res.data.data)
        } catch (err) {
            console.log(err)
        }

    }
    return(
        <>  
            <div className="bg-purchase-page bg-cover h-[42rem] flex flex-row justify-end">
                <div className='w-[40rem] text-white p-8'>
                    <div className='text-center'>
                        <h1 className='text-3xl font-bold'>Your Purchase</h1>
                    </div>
                    <div className='flex flex-col gap-y-4 mt-4 h-[33rem] p-2 overflow-y-auto no-scrollbar'>
                        {
                            purchased && purchased.map((pur)=>{
                                return(
                                    <>
                                         <PurchaseCart pur={pur}/>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>  
            </div>
        </>
    )
}


export default Purchase;