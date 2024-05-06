// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs,
  addDoc,deleteDoc, doc, updateDoc,
  query,where,CollectionReference
 } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCOFpXdZX7bY2u_l7J8avsfsmB3gvBm4Wo",
  authDomain: "app-store-project-ecommerce.firebaseapp.com",
  projectId: "app-store-project-ecommerce",
  storageBucket: "app-store-project-ecommerce.appspot.com",
  messagingSenderId: "885088034564",
  appId: "1:885088034564:web:a33aa956853e515278ba51",
  measurementId: "G-MJHK4W30BD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

const colRef = collection(db,'Products');


export type {Product};

interface Product {
  productName: string;
  productImage: string;
  productPrice: number;
  productCategory: string;
  id: string;
}


function retrieveDocs(): Promise<Product[]>;
function retrieveDocs(condition: string): Promise<Product[]>;
function retrieveDocs(condition?: string): Promise<Product[]> {
    let objects: Product[] = [];
    let queryRef = condition ? query(colRef, where("productName", "==", condition)) : colRef;

    console.log(query);

    return getDocs(queryRef)
        .then((items) => {
            items.docs.forEach((doc) => {
                const data = doc.data() as Product;
                objects.push({ ...data, id: doc.id });
            })
            return objects;
        })
        .catch(err => {
            console.log(err.message);
            return [];
        });
}

function addApp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    

    console.log("hellooo");
    const addForm = document.querySelector(".addForm") as HTMLFormElement;
    const productImageInput = addForm.querySelector('#productImage') as HTMLInputElement;
    const productNameInput = addForm.querySelector('#productName') as HTMLInputElement;
    const productCategoryInput = addForm.querySelector('#productCategory') as HTMLInputElement;
    const productPriceInput = addForm.querySelector('#productPrice') as HTMLInputElement;

    const productPrice = parseFloat(productPriceInput.value);

    addDoc(colRef, {
        productImage: productImageInput.value,
        productName: productNameInput.value,
        productCategory: productCategoryInput.value,
        productPrice: productPrice
    })
      .then(() => {
        window.location.reload();
      })
}

function deleteApp(event: React.MouseEvent<HTMLButtonElement, MouseEvent>,id:string){
  event.preventDefault();
  const docRef = doc(db,"Products",id);
  deleteDoc(docRef)
    .then(() =>  {
      window.location.reload();
    })

}

function updateApp(event: React.MouseEvent<HTMLButtonElement,MouseEvent>,id:string) {
  event.preventDefault();
  const docRef = doc(db, "Products", id);
  const productContainer = document.querySelector(`.productContainer[data-id="${id}"]`);
  if (!productContainer) return;
  console.log("hello")
  const productNameInput = productContainer.querySelector('.nameInput') as HTMLInputElement;
  const productCategoryInput = productContainer.querySelector('.categoryInput') as HTMLInputElement;
  const productPriceInput = productContainer.querySelector('.priceInput') as HTMLInputElement;
  const productPrice = parseFloat(productPriceInput.value);

  if (productNameInput.value && productCategoryInput.value && !isNaN(productPrice)) {
    updateDoc(docRef, {
      productName: productNameInput.value,
      productCategory: productCategoryInput.value,
      productPrice: productPrice
    })
      .then(() => {
        console.log("Document successfully updated!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating document:", error);
      });
  } else {
    console.error("Error: Input fields cannot be empty and product price must be a valid number");
  }
}

export {app,auth,db,retrieveDocs,addApp,deleteApp,updateApp};
