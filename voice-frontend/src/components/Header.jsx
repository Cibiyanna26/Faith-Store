import { Link } from "react-router-dom";

const Header = () =>{
    return(
        <>
            <section className="header">
                <nav className="flex flex-row justify-between p-4 bg-[#FC8A06] text-white">
                    <div className="flex flex-row gap-4 items-center text-xl font-bold">
                        <svg width="40" height="40" viewBox="0 0 256 264" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2_15644)">
                                <path d="M128 0C57.2996 0 0 24.1549 0 53.8969C0.0268596 55.4195 0.181433 56.9371 0.462094 58.4339L23.0207 176.814C32.5373 227.316 76.6513 263.893 128.042 263.893C179.433 263.893 223.547 227.316 233.063 176.814L255.538 58.4339C255.816 56.951 255.971 55.4475 256 53.939C256 24.1549 198.7 0 128 0ZM128 196.054C91.0325 196.054 94.0991 110.146 52.6787 97.4598C49.234 96.4096 45.9573 95.2754 42.7647 94.0571C70.1608 84.5581 99.0071 79.9233 128 80.3623C156.993 79.9233 185.839 84.5581 213.235 94.0571C210.043 95.2333 206.766 96.4096 203.321 97.4598C161.901 110.062 165.01 196.054 128 196.054Z" fill="#2684FF" />
                                <path d="M42.7647 94.0991C70.1606 84.5992 99.007 79.9645 128 80.4043C156.993 79.9645 185.839 84.5992 213.235 94.0991C239.449 84.2271 256 69.9022 256 53.8969C256 24.1549 198.7 0 128 0C57.2996 0 0 24.1549 0 53.8969C0 69.8602 16.5094 84.2271 42.7647 94.0991Z" fill="url(#paint0_linear_2_15644)" />
                            </g>
                            <defs>
                                <linearGradient id="paint0_linear_2_15644" x1="128" y1="93.469" x2="128" y2="1.68034" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.18" stop-color="#0052CC" />
                                    <stop offset="1" stop-color="#2684FF" />
                                </linearGradient>
                                <clipPath id="clip0_2_15644">
                                    <rect width="256" height="264" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <label>Faith</label>
                    </div>
                    <div className="flex flex-row gap-x-4">
                        <div className="p-4 hover:bg-white rounded-3xl hover:text-black duration-200 ease-linear" ><Link to="/home">Home</Link></div>
                        <div className="p-4 hover:bg-white rounded-3xl hover:text-black duration-200 ease-linear"><Link to="/product">Products</Link></div>
                        <div className="p-4 hover:bg-white rounded-3xl hover:text-black duration-200 ease-linear"><Link to="">About</Link></div>
                        <div className="p-4 hover:bg-white rounded-3xl hover:text-black duration-200 ease-linear"><Link to="">Features</Link></div>
                    </div>
                    <div className="search">
                        <div className="flex">
                            <input type="text" className="w-[15rem] p-3 rounded-3xl bg-transparent border-2 border-yellow-300 shadow-md shadow-orange-500 outline-none placeholder:text-white" placeholder="Search Products"></input>
                        </div>
                    </div>
                </nav>
            </section>
        </>
    )
}

export default Header;