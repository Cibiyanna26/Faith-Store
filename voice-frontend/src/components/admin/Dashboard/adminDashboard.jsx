import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import CategoryForm from "./categoryForm"
import SubCategoryForms from "./SubCategoryForm"
import ProductForm from "./productForm"



const CategoryCard = (props) =>{
    const {cat} = props
    return(
        <>
            <div className='p-2  mx-auto rounded-full outline-dashed outline-2 outline-[#FC8A06] w-[12rem] h-[12rem] relative overflow-hidden flex justify-center items-center bg-[#FC8A06]  border-2 border-white shadow'>
                <div></div>
                <p className='text-white text-lg font-semibold'>{cat.categoryName}</p>
            </div>
        </>
    )
}

const SubCategoryCard = (props) => {
    const { subcat } = props
    return (
        <>
            <div className='p-2 mx-auto  rounded-xl outline-dashed outline-2 outline-green-500 w-[12rem] h-[12rem] relative overflow-hidden flex justify-center items-center bg-green-500  border-2 border-white shadow'>
                <div className="flex flex-col gap-y-8 text-center">
                    <h1 className="text-green-900 text-xl font-bold">{subcat.categoryName}</h1>
                    <p className='text-white text-lg font-semibold'>{subcat.subCategory}</p>
                </div>
                
            </div>
        </>
    )
}

const ProductCard = (props) => {
    const { data } = props
    const navigate =useNavigate()
    useEffect(() => {
        checkUser()
    }, [])

    async function checkUser() {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/admin`, {
                withCredentials: true,
            })
        } catch (err) {
            navigate('/unauth')
        }
    }
    return (
        <>
            <div className="flex flex-row gap-x-2 rounded-2xl shadow-xl h-[12rem] p-8 relative bg-gray-50">
                <div className="flex flex-col gap-y-4 flex-1">
                    <h1 className="text-lg font-bold">{data.item}</h1>
                    <p className="text-sm font-medium text-gray-500">{data.description}</p>
                    <label className="text-gray-700 text-md font-mono">Price : <span className="text-blue-600">${data.price}</span></label>
                </div>
                <button className="absolute bottom-0 right-0 font-mono rounded-l-full rounded-t-full bg-gray-400 w-[3rem] h-[3rem] shadow-lg text-gray-200 text-xl">{data.quantity}</button>
            </div>
        </>
    )
}



const AdminDashboard = () =>{
    const navigate = useNavigate()
    const [categories,setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [filterComponent, setFilteredComponent] = useState('categories')
    const [sideShow,setSideShow] = useState('available')
    const [filteredData,setFilteredData] = useState([])
    useEffect(() => {
        checkUser()
        fetchCategory()
        fetchSubCategory()
        fetchProducts()
    }, [])
    async function checkUser() {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/admin`, {
                withCredentials: true,
            })
        } catch (err) {
            navigate('/unauth')
        }
    }
    async function fetchCategory() {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/product/category`)
            setCategories(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }
    async function fetchSubCategory() {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/product/subcategory`)
            setSubCategories(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }
    async function fetchProducts() {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/product/items`)
            setAllProducts(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }
    return(
        <>
            <div className="h-[42rem]">
                <div className="w-[80rem] mx-auto p-4 h-full flex flex-row gap-8 ">
                    <div className="w-[20rem] h-[30rem] shadow-lg p-4 rounded-xl">
                        <h1 className="text-2xl font-bold p-4">Dashboard</h1>
                        <div className="flex flex-col gap-y-6 p-4">
                            <div>
                                <button className={`${filterComponent === 'categories' ? 'bg-gray-500 text-white ' : ''} rounded-xl px-3 py-2  shadow-md hover:shadow-sm duration-200 ease-in`} onClick={()=>
                                    {
                                    setSideShow('available')
                                        setFilteredComponent('categories')
                                        
                                    }}>Categories</button>
                            </div>
                            <div>
                                <button className={`${filterComponent === 'subcategories' ? 'bg-gray-500 text-white' : ''} rounded-xl px-3 py-2 shadow-md hover:shadow-sm duration-200 ease-in`} onClick={()=>{
                                    setSideShow('available')
                                        setFilteredComponent('subcategories')
                                    }}>Sub Categories</button>
                            </div>
                            <div>
                                <button className={`${filterComponent === 'products' ? 'bg-gray-500 text-white' : ''} rounded-xl px-3 py-2 shadow-md hover:shadow-sm duration-200 ease-in`} onClick={()=>{
                                        setSideShow('available')
                                    setFilteredComponent('products')
                                }}>Products</button>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 relative w-[50rem] mx-auto h-[40rem] shadow-lg rounded-xl ">
                        <div className=" flex flex-row gap-x-4">
                            <button className={`px-3 py-2 rounded-xl ${sideShow === 'available' ? 'bg-gray-500 text-white' : ''}  shadow-md hover:shadow-sm duration-200 ease-in`} onClick={()=>setSideShow('available')}>Available</button>
                            <button className={`px-3 py-2 rounded-xl ${sideShow === 'new' ? 'bg-gray-500 text-white' : ''} shadow-md hover:shadow-sm duration-200 ease-in`}  onClick={()=>setSideShow('new')}>Add New</button>
                        </div>
                        
                                {
                                    (sideShow  === 'available') ?
                                    <>  
                                    <div className="p-8 grid grid-cols-2 gap-8 h-[35rem] mt-4 overflow-y-auto no-scrollbar">
                                        {
                                            (filterComponent === 'categories') ?
                                                <>
                                                    {
                                                        categories && categories.map((cat) => {
                                                            return (
                                                                <>
                                                                    <CategoryCard cat={cat} />
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </> :
                                                (filterComponent === 'subcategories') ?
                                                    <>
                                                        {
                                                            subCategories && subCategories.map((subcat) => {
                                                                return (
                                                                    <>
                                                                        <SubCategoryCard subcat={subcat} />
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </> :
                                                    (filterComponent === 'products') ?
                                                        <>
                                                            {
                                                                allProducts && allProducts.map((product) => {
                                                                    return (
                                                                        <>
                                                                            <ProductCard data={product} />
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </> :
                                                        <></>
                                        }
                                    </div>
                                    </> :
                                    (sideShow === 'new') ?
                                    <>
                                       <div className="flex justify-center items-center w-full h-full">
                                            {
                                                (filterComponent === 'categories') ?
                                                    <>
                                                        <CategoryForm />
                                                    </> :
                                                    (filterComponent === 'subcategories') ?
                                                        <>
                                                            <SubCategoryForms categories={categories}/>
                                                        </> :
                                                        (filterComponent === 'products') ?
                                                            <>
                                                                <ProductForm categories={categories} subCategories={subCategories} />
                                                            </> :
                                                            <></>
                                            }
                                       </div>   
                                    </>
                                    :
                                    <>
                                    </>
                                }
                  
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;