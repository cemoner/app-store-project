import Products from '../components/Products';
import { addApp, deleteApp, updateApp } from '../firebase/firebase';

function AdminPage () {
    const query = null;
    return (
        <>
            <Products isAdminPage={true} addApp={addApp} deleteApp={deleteApp} updateApp={updateApp} query={query}/>
        </>
    )
}


export default AdminPage;