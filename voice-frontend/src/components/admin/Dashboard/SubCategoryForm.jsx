
import { useEffect, useState } from "react"
import axios from "axios"
import { getCookie } from "../../../utils/service"
const SubCategoryForms = (props) => {
    const {categories} = props
    const [category,setCategory] = useState(null)
    const [subCategory,setSubCategory] = useState(null)
    const token = getCookie('token')
    async function handleSubCategory(){
        if(category === '' || subCategory === ''){
            alert('Enter all field')
            return;
        }
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/product/subcategory`, { categoryName: category,subCategory }, {
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
            <div className="w-[30rem] mx-auto shadow-lg rounded-xl bg-gray-50 p-4 flex flex-col gap-y-4">
                <h1 className="text-xl font-semibold font-mono">Add New Sub Category</h1>
                <div className="flex flex-col gap-y-4" >
                    <div>
                        <select onChange={(e) => setCategory(e.target.value)} className="bg-transparent w-[20rem] text-gray-600 p-4 bg-zinc-100 rounded-xl outline-none border-2 focus:border-gray-200" >
                            <option value="">Select Category</option>
                            {
                                categories.map((cat)=>{
                                    return(
                                        <>
                                            <option value={cat.categoryName} >{cat.categoryName}</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <input className="bg-transparent w-[20rem] text-gray-600 p-4 bg-zinc-100 rounded-xl outline-none border-2 focus:border-gray-200" 
                        placeholder="enter new category" 
                        value={subCategory} onChange={(e)=>setSubCategory(e.target.value)}></input>
                    </div>
                    <div className="text-right">
                        <button className="bg-blue-500 px-3 py-2 rounded-xl text-white font-mono" onClick={handleSubCategory}>Add</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SubCategoryForms;