import Hamburger from './Hamburger-Menu.tsx';
import { useState } from 'react';;
import { useNavigate } from 'react-router-dom';


interface ProductsProps {
    isAdminPage:boolean;
}

const toggleCart = () => {
    const cartView = document.querySelector('.cartView');
    if(cartView) {
        cartView.classList.toggle('closed');
    }
};

  function Header({isAdminPage}:ProductsProps){
    const [searchQuery, setSearchQuery] = useState('');
    const [query, setQuery] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setQuery(searchQuery)
        navigate(`/search?query=${encodeURIComponent(searchQuery)}&isAdminPage=${isAdminPage}`);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <> <header>
            <nav>
                <div className="svg-container logo">
                    <a href="#">
                        <svg min-width="20px" min-height="20px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_8317)"/>
                        <path d="M18.4468 8.65403C18.7494 8.12586 18.5685 7.45126 18.0428 7.14727C17.5171 6.84328 16.8456 7.02502 16.543 7.55318L16.0153 8.47442L15.4875 7.55318C15.1849 7.02502 14.5134 6.84328 13.9877 7.14727C13.462 7.45126 13.2811 8.12586 13.5837 8.65403L14.748 10.6864L11.0652 17.1149H8.09831C7.49173 17.1149 7 17.6089 7 18.2183C7 18.8277 7.49173 19.3217 8.09831 19.3217H18.4324C18.523 19.0825 18.6184 18.6721 18.5169 18.2949C18.3644 17.7279 17.8 17.1149 16.8542 17.1149H13.5997L18.4468 8.65403Z" fill="white"/>
                        <path d="M11.6364 20.5419C11.449 20.3328 11.0292 19.9987 10.661 19.8888C10.0997 19.7211 9.67413 19.8263 9.45942 19.9179L8.64132 21.346C8.33874 21.8741 8.51963 22.5487 9.04535 22.8527C9.57107 23.1567 10.2425 22.975 10.5451 22.4468L11.6364 20.5419Z" fill="white"/>
                        <path d="M22.2295 19.3217H23.9017C24.5083 19.3217 25 18.8277 25 18.2183C25 17.6089 24.5083 17.1149 23.9017 17.1149H20.9653L17.6575 11.3411C17.4118 11.5757 16.9407 12.175 16.8695 12.8545C16.778 13.728 16.9152 14.4636 17.3271 15.1839C18.7118 17.6056 20.0987 20.0262 21.4854 22.4468C21.788 22.975 22.4594 23.1567 22.9852 22.8527C23.5109 22.5487 23.6918 21.8741 23.3892 21.346L22.2295 19.3217Z" fill="white"/>
                        <defs>
                        <linearGradient id="paint0_linear_87_8317" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#2AC9FA"/>
                        <stop offset="1" stopColor="#1F65EB"/>
                        </linearGradient>
                        </defs>
                        </svg>
                    </a>
                </div>
                <ul className="navigation-list">
                    {isAdminPage ? (
                             <li className="nav-item"><a href="/admin">Home</a></li>
                        ) : (
                            <li className="nav-item"><a href="/">Home</a></li>
                        )}
                    <li className="nav-item"><a href="">About</a></li>
                    <li className="nav-item"><a href="">Contact</a></li>
                </ul>
                <div className="svg-container hamburger-menu-icon">
                    <svg min-width="20px" min-height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 18L20 18" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 12L20 12" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 6L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
                <div className="buttons">
                               <button className='svg-container shopping-cart' onClick={toggleCart}>
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_901_3095)">
                                        <path d="M10 24L9 20L8 16L7 12L6 8H31L29 22C28.86 23.04 28.12 24 27 24H10Z" fill="#FFC44D"/>
                                        <path d="M23 27C24.1 27 25 27.9 25 29C25 30.1 24.1 31 23 31C21.9 31 21 30.1 21 29C21 27.9 21.9 27 23 27ZM11 27C12.1 27 13 27.9 13 29C13 30.1 12.1 31 11 31C9.9 31 9 30.1 9 29C9 27.9 9.9 27 11 27Z" fill="#668077"/>
                                        <path d="M8 16H2M9 20H3M7 12H1M26 16H11M25 20H12M27 12H10M10 24H27C28.125 24 28.862 23.038 29 22L31 8H6L4 1H1M13 29C13 27.896 12.104 27 11 27C9.896 27 9 27.896 9 29C9 30.104 9.896 31 11 31C12.104 31 13 30.104 13 29ZM25 29C25 27.896 24.104 27 23 27C21.896 27 21 27.896 21 29C21 30.104 21.896 31 23 31C24.104 31 25 30.104 25 29Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_901_3095">
                                        <rect width="32" height="32" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                    <div className="cartView closed">
                                    </div>
                               </button>
                    <div className="search-button">
                        <form action="#" className="searchForm" onSubmit={handleSearch}>
                            <input type="text" name="search" id="Search" placeholder="Search" onChange={handleChange}></input>
                            <button type="submit" className="submitButton search">Search</button>
                        </form>
                    </div>
                        {isAdminPage ? (
                             <button className="login">
                                <a href="/">Sign Out</a>
                            </button>
                        ) : (
                            <button className="login">
                                <a href="/login">Login</a>
                            </button>
                        )}
                </div>
            </nav>
            <Hamburger/>
        </header>
        </>     
    )
}
export default Header