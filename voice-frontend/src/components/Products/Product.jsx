import { useState } from "react";

const TopFilter  =  (props) =>{
    const {category,setCategory} = props;
    return(
        <>  
            <div className="sub-filter bg-[#EAEAEA]">
                <div className="flex flex-row justify-between p-4 w-[80%] mx-auto">
                    <div>
                        <h1 className="text-xl font-semibold font-mono">All Products</h1>
                    </div>
                    <div className="flex flex-row gap-x-6">
                        <div className={`py-2 px-3 rounded-xl font-semibold font-mono ${category === 0 ? 'bg-gray-600 text-white' : ''} duration-200 ease-in`}>
                            <button onClick={()=>setCategory(0)} > All </button>
                        </div>
                        <div className={`py-2 px-3 rounded-xl font-semibold font-mono ${category === 1 ? 'bg-gray-600 text-white' : ''} duration-200 ease-in`}>
                                <button onClick={()=>setCategory(1)} > Food </button>
                        </div>
                        <div className={`py-2 px-3 rounded-xl font-semibold font-mono ${category === 2 ? 'bg-gray-600 text-white' : ''} duration-200 ease-in`}>
                            <button onClick={()=>setCategory(2)} > Saloon </button>  
                        </div>
                        <div className={`py-2 px-3 rounded-xl font-semibold font-mono ${category === 3 ? 'bg-gray-600 text-white' : ''} duration-200 ease-in`}>
                            <button onClick={()=>setCategory(3)} >stationary </button> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const Product = () =>{
    const [category,setCategory] = useState(0)

    return(
        <>
        <div>   
            <TopFilter category={category} setCategory={setCategory}/>
        </div>
        </>
    )
}


export default Product;