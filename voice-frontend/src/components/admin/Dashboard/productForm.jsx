import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "../../../utils/service";

const ProductForm = (props) => {
    const { categories, subCategories } = props;
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [item,setItem] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [filteredSub,setFilteredSub] = useState([])

    useEffect(()=>{
        if(category !== ''){
            const newarray =  subCategories.filter((sub)=>{
                return sub.categoryName === category
            })
            setFilteredSub(newarray)
        }else{
            setFilteredSub([])
        }
    },[category])

    const token = getCookie('token')
    async function handleNewItem(e){
        e.preventDefault()
        if (!category || !subCategory || !item || !description || !price || !quantity){
            alert('enter all field to create new product')
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/product/items`, { 
                categoryName: category, 
                subCategory ,
                item,
                price,
                quantity,
                description
            }, 
            {
                withCredentials: true,
                headers: {
                    common: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            })
            setCategory('')
            setSubCategory('')
            alert('Successfully added')
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <>
            <div className="mx-auto shadow-lg rounded-xl bg-gray-50 p-4 flex flex-col gap-y-4">
                <h1 className="text-xl font-semibold font-mono">Add New Product</h1>
                <div>
                    <form className="grid grid-cols-2 gap-8" onSubmit={handleNewItem}>
                        <div>
                            <select onChange={(e) => setCategory(e.target.value)} className="bg-transparent text-gray-600 p-4 bg-zinc-100 w-full rounded-xl outline-none border-2 focus:border-gray-200" >
                                <option value="">Select Category</option>
                                {
                                    categories.map((cat) => {
                                        return (
                                            <>
                                                <option value={cat.categoryName} >{cat.categoryName}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <select onChange={(e) => setSubCategory(e.target.value)} className="bg-transparent  text-gray-600 p-4 bg-zinc-100 rounded-xl outline-none border-2 focus:border-gray-200" >
                                <option value="">Select Sub Category</option>
                                {
                                    filteredSub.map((subcat) => {
                                        return (
                                            <>
                                                <option value={subcat.subCategory} >{subcat.subCategory}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="">
                            <input 
                                className="bg-transparent p-3 text-gray-600 bg-zinc-100 rounded-xl outline-none border-2 focus:border-gray-200" 
                                placeholder="New Item Name" 
                                value={item}
                                onChange={(e)=>setItem(e.target.value)}
                                ></input>
                        </div>
                        <div className="">
                            <input 
                                className="bg-transparent p-3 text-gray-600  bg-zinc-100 rounded-xl outline-none border-2 focus:border-gray-200" 
                                placeholder="Price" 
                                value={price}
                                onChange={(e)=>setPrice(e.target.value)}></input>
                        </div>
                        <div className="col-span-2">
                            <input 
                                className="bg-transparent p-3 text-gray-600 bg-zinc-100 rounded-xl outline-none border-2 focus:border-gray-200" 
                                placeholder="Quantity" 
                                value={quantity}
                                onChange={(e)=>setQuantity(e.target.value)}></input>
                        </div>
                        <div className="col-span-2 ">
                            <input 
                                className="bg-transparent w-full p-3 text-gray-600  bg-zinc-100 rounded-xl outline-none border-2 focus:border-gray-200" 
                                placeholder="Description" 
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}></input>
                        </div>
                        <div className="col-span-2 text-right">
                            <button className="bg-blue-500 px-3 py-2 rounded-xl text-white font-mono">Add</button>
                        </div>
                    </form>
                </div>
                

            </div>
        </>
    )
}
export default ProductForm;