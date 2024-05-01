// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCOFpXdZX7bY2u_l7J8avsfsmB3gvBm4Wo",
  authDomain: "app-store-project-ecommerce.firebaseapp.com",
  projectId: "app-store-project-ecommerce",
  storageBucket: "app-store-project-ecommerce.appspot.com",
  messagingSenderId: "885088034564",
  appId: "1:885088034564:web:a33aa956853e515278ba51",
  measurementId: "G-MJHK4W30BD"
};

// Initialize Firebase
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
  id: string; // Include id field
}




function retrieveDocs(){
  let objects: Product[] = [];
    return getDocs(colRef)
    .then((items) => {
      items.docs.forEach((doc) => {
        const data = doc.data() as Product;
        objects.push({...data, id: doc.id});
      })
      return objects;
    })
    .catch(err => {
      console.log(err.message);
      return [];
    })
  }


export {app,auth,db,retrieveDocs};
