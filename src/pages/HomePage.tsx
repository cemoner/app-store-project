import Products from '../components/Products';

function HomePage () {
    return (
        <>
            <Products isAdminPage={false} addApp={() => {
                return 0;
            }} deleteApp={() => {
                return 0;
            }}
                updateApp={() => {
                    return 0;
                }} />
        </>
    )
}


export default HomePage;