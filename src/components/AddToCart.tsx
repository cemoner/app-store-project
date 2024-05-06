import React from 'react';
import { useState } from 'react';

interface AddToCartProps {
    addToCart: (item: any) => void; 
    item: any;
}

const getImageUrl = (imagePath: string) => {
    const relativePath = imagePath.replace('gs://app-store-project-ecommerce.appspot.com/', '');

    return `https://firebasestorage.googleapis.com/v0/b/app-store-project-ecommerce.appspot.com/o/${encodeURIComponent(relativePath)}?alt=media`;
};

const AddToCart: React.FC<AddToCartProps> = ({ addToCart, item }) => {
    
    const [cartItems, setCartItems] = useState<any[]>([]);
    const handleAddToCart = () => {
        if (cartItems.some(cartItem => cartItem.id === item.id)) {
            alert("Item is already in the cart");
            return;
        }
        else {
            const cartView = document.querySelector(".cartView") as HTMLElement;
            setCartItems([...cartItems, item]);
            addToCart(item);
            if (cartView) {
                cartView.style.padding = "3em";
                if(cartView.classList.contains("closed")){
                    cartView.classList.remove("closed");
                }
    
                const cartItemElement = document.createElement('div');
                cartItemElement.className = "cartContainer";
                cartItemElement.innerHTML = `
                    <img class="productImage" src="${getImageUrl(item.productImage)}" alt="${item.productName}" />
                    <h2 class="productName">${item.productName}</h2>
                    <p class="productCategory">Category: ${item.productCategory}</p>
                    <p class="productPrice">Price: $${item.productPrice}</p>
                    <button class="cartRemove svg-container">
                        <?xml version="1.0" encoding="iso-8859-1"?>
                        <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                        <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                            viewBox="0 0 523.266 523.266"
                            xml:space="preserve">
                        <g>
                            <g>
                                <rect x="72.528" width="378.191" height="77.476"/>
                                <path d="M450.738,100.154H72.543v423.112h378.192V100.154H450.738z M178.453,465.487h-30.6V157.933h30.6V465.487z
                                    M276.942,465.487h-30.6V157.933h30.6V465.487z M375.425,465.487h-30.601V157.933h30.601V465.487z"/>
                            </g>
                        </g>
                        </svg>
                    </button>
                `;
                const cartRemoveButton = cartItemElement.querySelector('.cartRemove');
                if (cartRemoveButton) {
                    cartRemoveButton.addEventListener('click', () => {
                        setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
                        cartItemElement.remove();
                        if(cartView.innerHTML.trim() === "") {
                            cartView.classList.add("closed");
                        }
                    });
                }

                cartView.appendChild(cartItemElement);
            }
        }
    };

    return (
        <div>
             <button className="addToCart" onClick={handleAddToCart}>Add To Cart</button>
        </div>
       
    );
};

export default AddToCart;