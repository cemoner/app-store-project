import { retrieveDocs } from "../firebase/firebase";
import { useEffect, useState } from 'react';
import { Product } from '../firebase/firebase'



function Products (){
    const [docs, setDocs] = useState<Product[]>([]); // Specify the type of docs as Product[]

    useEffect(() => {
        // Fetch documents when the component mounts
        const fetchData = async () => {
            try {
                const data = await retrieveDocs();
                setDocs(data);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };

        fetchData();
    }, []);
    const getImageUrl = (imagePath: string) => {
        // Remove the Firebase Storage bucket URL from the imagePath
        const relativePath = imagePath.replace('gs://app-store-project-ecommerce.appspot.com/', '');
    
        // Construct the full image URL by concatenating the Firebase Storage URL with the relative image path
        return `https://firebasestorage.googleapis.com/v0/b/app-store-project-ecommerce.appspot.com/o/${encodeURIComponent(relativePath)}?alt=media`;
    };
    console.log(docs);
    return(
        <>
            <main className="productsMain">
                {docs.map((doc) => (
                     <div className="productContainer" key={doc.id}>
                        <img className="productImage" src={getImageUrl(doc.productImage)} alt={doc.productName} />
                        <h2 className="productName">{doc.productName}</h2>
                        <p className="productCategory">Category: {doc.productCategory}</p>
                        <p className="productPrice">Price: ${doc.productPrice}</p>
                    </div>
                ))}
            </main>
        </>
    )
}

export default Products;