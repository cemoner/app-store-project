import Products from '../components/Products';
import { useLocation } from 'react-router-dom';
import { addApp, deleteApp, updateApp } from '../firebase/firebase';

function SearchPage () {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query') || '';
    const isAdminPage = queryParams.get('isAdminPage') === 'true';
    return (
        <>
            <Products isAdminPage={isAdminPage} addApp={addApp} deleteApp={deleteApp} updateApp={updateApp} query={query}/>
        </>
    )
}


export default SearchPage;