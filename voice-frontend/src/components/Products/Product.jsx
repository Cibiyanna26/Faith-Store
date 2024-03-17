import { useEffect, useState } from "react";
import axios from "axios";
import {useSelector,useDispatch} from 'react-redux'
import { addCardItems } from "../../redux/cartStore";

const TopFilter  =  (props) =>{
    const {category,setCategory,categories} = props;
    return(
        <>  
            <div className="sub-filter bg-[#EAEAEA]">
                <div className="flex flex-col gap-4 p-4 w-[80%] mx-auto">
                    <div>
                        <h1 className="text-3xl font-semibold font-mono">All Products</h1>
                    </div>
                    <div className="flex flex-row gap-x-6">
                        <div className={`py-2 px-3 rounded-xl font-semibold font-mono ${category === 'all' ? 'bg-gray-600 text-white' : ''}  duration-200 ease-in`}>
                            <button onClick={() => setCategory('all')} > All </button>
                        </div>
                        {
                            categories && categories.map((cate)=>{
                                return(
                                    <div className={`py-2 px-3 rounded-xl font-semibold font-mono ${category === cate.categoryName ? 'bg-gray-600 text-white' : ''} duration-200 ease-in`}>
                                        <button onClick={() => setCategory(cate.categoryName)} > {cate.categoryName} </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

const ProductCard = (props) =>{
    const {data} = props
    const dispatch = useDispatch();
    function addToCard(){
        dispatch(addCardItems(data))
    }
    return(
        <>
            <div className="flex flex-row gap-x-2 rounded-2xl shadow-xl h-[12rem] p-8 relative bg-gray-50">
                <div className="flex flex-col gap-y-4 flex-1">
                    <h1 className="text-lg font-bold">{data.item}</h1>
                    <p className="text-sm font-medium text-gray-500">{data.description}</p>
                    <label className="text-gray-700 text-md font-mono">Price : <span className="text-blue-600">${data.price}</span></label>
                </div>
                <div className="w-[7rem] relative">
                    <div><img></img></div>
                </div>
                <button className="absolute bottom-0 right-0 font-mono rounded-l-full rounded-t-full bg-gray-400 w-[3rem] h-[3rem] shadow-lg text-gray-200 text-xl" onClick={addToCard}>+</button>
            </div>
        </>
    )
}


const ProductBody = (props) =>{
    const { category, filteredItem, filteredSubCategory, setFilterSubCategory, miniCate, setMiniCate } = props;
    return(
        <>  
            
            <div className="w-[80%] mx-auto pt-4 flex flex-col gap-y-4 pb-8">
            {     category !== 'all' ?
                 <div>
                        <div className="flex flex-col gap-4 p-4">
                            <div className="flex flex-row gap-x-6">
                                <div className={`py-2 px-3 rounded-xl font-semibold font-mono duration-200 ease-in ${ miniCate === 'all' ? 'bg-yellow-500' : ''} shadow-lg`}>
                                    <button onClick={() => setMiniCate('all')}> Sub </button>
                                </div>
                                {
                                    filteredSubCategory && filteredSubCategory.map((subcate) => {
                                        return (
                                            <div className={`py-2 px-3 rounded-xl font-semibold font-mono duration-200 ease-in ${miniCate === subcate.subCategory ? 'bg-yellow-500' : ''} shadow-lg `}>
                                                <button onClick={()=>setMiniCate(subcate.subCategory)}> {subcate.subCategory} </button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                 </div>
                 :
                 <></>
              }
                <div className="displayproduct grid grid-cols-3 gap-12">
                    {
                        filteredItem && filteredItem.map((data)=>{
                            return(
                                <ProductCard data={data}/>
                            )
                        })
                    }
                </div>  
            </div>  
        </>
    )
}


const Product = () =>{
    const [category,setCategory] = useState('all')
    const [miniCate,setMiniCate] = useState('all')
    const [categories,setCategories] = useState([])
    const [subCategory,setSubCategory] = useState([])
    const [storeProducts, setStoreProducts] = useState([])
    const [filteredCategory,setFilteredCategory] = useState([])
    const [filteredSubCategory,setFilterSubCategory] = useState([])
    const [filteredItem, setFilterItem] = useState([])

    useEffect(()=>{
        fetchCategory()
        fetchSubCategory()
        fetchStoreProducts()
    },[])

    useEffect(()=>{
        filterNewSub()
        filterNewData()
    },[category])

    useEffect(() => {
        filterNewNestedSubItem()
    }, [miniCate])

    function filterNewNestedSubItem(){
        if(miniCate === 'all'){
            const newArray = storeProducts.filter((item) => {
                return item.categoryName === category 
            })
            setFilterItem(newArray)
            return;
        }
        const newArray = storeProducts.filter((item)=>{
            return item.categoryName === category && item.subCategory === miniCate
        })
        setFilterItem(newArray)
    }

    function filterNewSub(){
        setMiniCate('all')
        if (category === 'all') {
            setFilteredCategory(subCategory)
            return;
        }
        const newFilterSubData = subCategory.filter((sub)=>{
            return sub.categoryName === category
        })
        setFilterSubCategory(newFilterSubData)
       
    }
    function filterNewData(){
        setMiniCate('all')
        if(category === 'all'){
            setFilterItem(storeProducts)
            return;
        }
        const newFilteredData = storeProducts.filter((items)=>{
            return items.categoryName === category
        })
        setFilterItem(newFilteredData)
    }

    async function fetchCategory(){
        try{
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/product/category`)
            setCategories(res.data.data)
            setFilteredCategory(res.data.data)
        }catch(err){
            console.log(err)
        }
    }
    async function fetchSubCategory() {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/product/subcategory`)
            setSubCategory(res.data.data)
            setFilterSubCategory(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }
    async function fetchStoreProducts() {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/product/items`)
            setStoreProducts(res.data.data)
            setFilterItem(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    return(
        <>
        <div>   
            <TopFilter category={category} setCategory={setCategory} categories={categories}/>
            <ProductBody category={category} miniCate={miniCate} setMiniCate={setMiniCate}
                    filteredItem={filteredItem} filteredSubCategory={filteredSubCategory} setFilterSubCategory={setFilterSubCategory} />
        </div>
        </>
    )
}


export default Product;