import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';



function MainLayout(){
    
    const location = useLocation();
    const isAdminPage = location.pathname === '/admin';
    
    return(
        <>
            <Header isAdminPage={isAdminPage} />
            <Outlet/>
            <Footer/>
        </>

    )
}

export default MainLayout;