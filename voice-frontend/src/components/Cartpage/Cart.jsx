import React, { useEffect, useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import { deleteCardItems, removeAllCartItems } from "../../redux/cartStore";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { getCookie } from "../../utils/service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CartCard = (props) =>{
    const {cart} = props;
    const dispatch = useDispatch()
    const handleCartRemove = () =>{
        toast.success("Items removed from the cart")
        dispatch(deleteCardItems({item:cart.item,categoryName:cart.categoryName,subCategory:cart.subCategory}))
    }
    
    return(
        <>
            <div className="w-[40rem] relative flex flex-col gap-y-4 rounded-xl bg-gray-50 p-4 shadow-md hover:shadow-none duration-200 ease-in border-2 border-zinc-200">
                <h1 className="text-xl font-semibold font-mono">{cart.item}</h1>
                <p className="text-gray-500 font-mono">{cart.description}</p>   
                <label className="font-medium font-mono">price : <span className="text-blue-500">{cart.price}</span></label>
                <button className="rounded-full w-[2.5rem] h-[2.5rem] text-white bg-red-500 absolute top-3 right-3" onClick={()=>handleCartRemove()}>x</button>
            </div>
        </>
    )
}


const Cart = () =>{
    const cartStore = useSelector((store)=>store.cartStore)
    const {cartItems} = cartStore;
    const [price,setPrice] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        checkUser()
    }, [])
    const token = getCookie('token')
    async function checkUser() {
       
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/user`, {
                withCredentials: true,
                headers: {
                    common: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            })
        } catch (err) {
            navigate('/unauth')
        }
    }
    useEffect(()=>{
        calciPrice()
    },[cartItems])

    function calciPrice() {
        var total = 0;
        for(let x of cartItems){
            total += x.price;
        }
        setPrice(total)
    }

    async function successMessage(e){
        e.preventDefault()
        try{
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/purchase`, { total: price, items: cartItems },{
                withCredentials: true,
                headers: {
                    common: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            })
            toast.success('Successfully Purchased');
            dispatch(removeAllCartItems());
            navigate('/purchase-success');  
        }catch(err){
            toast.error(err.response.data.message);
        }
     
    }


    return(
        <>
            <section className="">
                <ToastContainer />
                <div className="w-[80%] mx-auto p-4">
                    <h1 className="text-2xl font-bold text-center">Shopping Cart</h1>
                </div>
                <div className="p-4 w-[80%] mx-auto flex flex-row gap-x-4">
                    <div className="payment w-full">
                        <div className="w-[25rem] bg-zinc-200 rounded-xl shadow-md h-full  p-4 relative">
                            <div className="h-[25rem] w-full bg-white rounded-xl shadow-xl absolute -right-10 top-11 p-4">
                                <div className="flex flex-row justify-between items-center p-2">
                                    <h1 className="font-semibold text-lg text-blue-900">Confirm Payment</h1>
                                    <div>
                                        <svg width="40" height="40" viewBox="0 0 256 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_2_15399)">
                                                <path d="M132.397 26.4282C132.251 37.9437 142.66 44.3702 150.501 48.1908C158.557 52.1112 161.263 54.625 161.232 58.1303C161.17 63.496 154.805 65.8637 148.848 65.9559C138.455 66.1174 132.412 63.1501 127.608 60.9054L123.864 78.4246C128.684 80.6462 137.609 82.5834 146.864 82.668C168.589 82.668 182.802 71.9443 182.879 55.3168C182.964 34.2154 153.691 33.0469 153.891 23.6147C153.96 20.7551 156.689 17.7032 162.669 16.9268C165.629 16.5348 173.8 16.235 183.064 20.5014L186.7 3.55104C181.718 1.73685 175.315 -0.000457764 167.343 -0.000457764C146.895 -0.000457764 132.512 10.8693 132.397 26.4282ZM221.638 1.46011C217.671 1.46011 214.328 3.77397 212.836 7.32547L181.803 81.4226H203.512L207.832 69.4844H234.36L236.867 81.4226H256L239.303 1.46011H221.638ZM224.675 23.0612L230.94 53.0875H213.782L224.675 23.0612ZM106.076 1.46011L88.9643 81.4226H109.651L126.755 1.46011H106.076ZM75.4732 1.46011L53.9413 55.8857L45.2316 9.60857C44.2092 4.44276 40.1734 1.46011 35.6918 1.46011H0.491982L0 3.78165C7.22599 5.34985 15.436 7.87895 20.4096 10.5849C23.4537 12.2376 24.3224 13.6828 25.3217 17.611L41.8185 81.4226H63.681L97.1973 1.46011H75.4732Z" fill="url(#paint0_linear_2_15399)" />
                                            </g>
                                            <defs>
                                                <linearGradient id="paint0_linear_2_15399" x1="117.694" y1="84.3264" x2="120.087" y2="-0.575346" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#222357" />
                                                    <stop offset="1" stop-color="#254AA5" />
                                                </linearGradient>
                                                <clipPath id="clip0_2_15399">
                                                    <rect width="256" height="83" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <form className="grid grid-cols-2 gap-5">
                                        <div className="relative col-span-2 shadow-sm p-4 rounded-xl border-2 border-zinc-200 z-20">
                                            <label for="" className="absolute text-sm font-medium left-4 -top-2.5 z-30 bg-white px-2">DD-MM-YY</label>
                                            <input type="text" className="w-[15rem] text-zinc-600  outline-none text-lg " placeholder="Enter your date"></input>
                                        </div>
                                        <div className="relative col-span-2 shadow-sm p-4 rounded-xl border-2 border-zinc-200 z-20">
                                            <label for="" className="absolute text-sm font-medium left-4 -top-2.5 z-30 bg-white px-2">CARD NUMBER</label>
                                            <input type="text" className="w-[15rem] text-zinc-600  outline-none text-lg " placeholder="Enter Card Number"></input>
                                        </div>
                                        <div className="relative  shadow-sm p-4 rounded-xl border-2 border-zinc-200 z-20">
                                            <label for="" className="absolute text-sm font-medium left-4 -top-2.5 z-30 bg-white px-2">EXP DATE</label>
                                            <input type="text" className="w-full text-zinc-600  outline-none text-lg " placeholder="Enter Exp Date"></input>
                                        </div>
                                        <div className="relative  shadow-sm p-4 rounded-xl border-2 border-zinc-200 z-20">
                                            <label for="" className="absolute text-sm font-medium left-4 -top-2.5 z-30 bg-white px-2">CVV</label>
                                            <input type="text" className="w-full  text-zinc-600  outline-none text-lg " placeholder="Enter cvv"></input>
                                        </div>
                                        <div className="col-span-2">
                                            <button className="w-full bg-[#FC8A06] text-white text-center p-4  rounded-xl" onClick={(e)=>successMessage(e)}>Pay</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4">
                        <div className="flex flex-row justify-between p-4 rounded-xl shadow-md items-center bg-gray-50 border-2 border-yellow-500">
                            <label className="text-lg font-medium ">Your Order Summary</label>
                            <label className="bg-[#FC8A06] rounded-xl px-3 py-2 text-white"><span>{cartItems.length}</span> items</label>
                        </div>
                        <div className="h-[19rem] flex flex-col gap-4 overflow-y-auto no-scrollbar">
                            {
                               cartItems && cartItems.map((cart)=>{
                                return(
                                    <>  
                                        <CartCard cart={cart}/>
                                    </>
                                )
                               })
                            }
                        </div>
                        <div className="total-amount h-[5rem] rounded-xl bg-[#fc8906d4] text-white cursor-pointer">
                            <button className="w-[80%] mx-auto h-full flex justify-center items-center">
                                <label className="text-lg font-medium cursor-pointer">Total Amount : $<span>{price}</span> </label>
                            </button>
                        </div>  
                     
                    </div>
                </div>
            </section>
            
        </>
    )
}

export default Cart;