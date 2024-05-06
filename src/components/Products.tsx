import { retrieveDocs } from "../firebase/firebase";
import { useEffect, useState } from 'react';
import { Product } from '../firebase/firebase';
import AddToCart from "./AddToCart";


interface ProductsProps {
    isAdminPage: boolean;
    addApp: (event: React.FormEvent<HTMLFormElement>) => void;
    deleteApp: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id:string) => void;
    updateApp: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id:string) => void;
    query?:string | null;
}




function Products ({isAdminPage, addApp, deleteApp,updateApp,query} : ProductsProps){
    const [docs, setDocs] = useState<Product[]>([]);
    const [cartItems, setCartItems] = useState<any[]>([]);


    useEffect(() => {
        // Fetch documents when the component mounts
        const fetchData = async () => {
            try {
                console.log(query)
                let data: Product[] = [];
                if (query) {
                    data = await retrieveDocs(query);
                } else {
                    data = await retrieveDocs();
                }
                setDocs(data);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };

        fetchData();
    }, [query]);

    const addToCart = (item: any) => {
        setCartItems(prevItems => [...prevItems, item]);
    };
    const getImageUrl = (imagePath: string) => {
        const relativePath = imagePath.replace('gs://app-store-project-ecommerce.appspot.com/', '');
    
        return `https://firebasestorage.googleapis.com/v0/b/app-store-project-ecommerce.appspot.com/o/${encodeURIComponent(relativePath)}?alt=media`;
    };
    return(
        <>
            <main className="productsMain">
                {isAdminPage && (
                    <>
                        <form className="addForm" onSubmit={addApp}>
                            <label htmlFor="productImage">Product Image:</label>
                            <input type="text" id="productImage" />
                            
                            <label htmlFor="productName">Product Name:</label>
                            <input type="text" id="productName" />
                            
                            <label htmlFor="productCategory">Product Category:</label>
                            <input type="text" id="productCategory" />
                            
                            <label htmlFor="productPrice">Product Price:</label>
                            <input type="number" id="productPrice" />

                            <button type="submit" className="submitButton">Submit</button>
                        </form>
                    </>
                )}
                <div className="products">
                    {docs.map((doc) => (
                     <div className="productContainer" key={doc.id} data-id={doc.id}>
                        <img className="productImage" src={getImageUrl(doc.productImage)} alt={doc.productName} />
                            <h2 className="productName">
                            {isAdminPage ? (
                                <input className="productInput nameInput" type="text" defaultValue={doc.productName} />
                            ) : (
                                <span>{doc.productName}</span>
                            )}
                        </h2>
                        <p className="productCategory">
                            {isAdminPage ? (
                                <input className="productInput categoryInput" type="text" defaultValue={doc.productCategory} />
                            ) : (
                                <span>{doc.productCategory}</span>
                            )}
                        </p>
                        <p className="productPrice">
                            {isAdminPage ? (
                                <input className="productInput priceInput" type="number" defaultValue={doc.productPrice} />
                            ) : (
                                <span>{doc.productPrice}$</span>
                            )}
                        </p>
                        {isAdminPage && (
                            <>
                                <button className="deleteButton" onClick={(event) => deleteApp(event, doc.id)}>Delete</button>
                                <button className="updateButton"  onClick={(event) => updateApp(event,doc.id)}>Update</button>
                            </>
                            )}
                        <AddToCart addToCart={addToCart} item={doc} />
                    </div>
                ))}
                </div>
                
            </main>
        </>
    )
}


export default Products;