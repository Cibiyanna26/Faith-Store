import { useState } from "react";
import axios from 'axios'
const CategoryForm = () => {
    const [categoryName,setCategoryName] = useState('')
    async function handleAddCategory(e) {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/product/category`, {categoryName},{
                withCredentials: true,
            })
        } catch (err) { 
            console.log(err)
        }
    }
    return (
        <>  
            <div className="w-[30rem] mx-auto shadow-lg rounded-xl bg-gray-50 p-4 flex flex-col gap-y-4">
                <h1 className="text-xl font-semibold font-mono">Add New Category</h1>
                <form className="flex flex-col gap-y-4" onSubmit={handleAddCategory}>
                    <div>
                        <input className="bg-transparent w-[20rem] text-gray-600 p-4 bg-zinc-100 rounded-xl outline-none border-2 focus:border-gray-200" value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} placeholder="enter new category" ></input>
                    </div>
                    <div className="text-right">
                        <button className="bg-blue-500 px-3 py-2 rounded-xl text-white font-mono">Add</button>
                    </div>
                </form>
          
            </div>
        </>
    )
}

export default CategoryForm;