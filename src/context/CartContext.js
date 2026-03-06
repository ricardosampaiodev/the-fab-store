import React, { createContext, useState, useEffect } from 'react';

//Nuvem
export const CartContext = createContext();

//Provedor
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const itensSalvos = localStorage.getItem('@TheFabStore:cart');
        if (itensSalvos) {
            return JSON.parse(itensSalvos);
        }
        return [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false); //Controla se a Sidebar está visível
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('@TheFabStore:cart', JSON.stringify(cartItems));
    }, [cartItems]);

    //Função para adicionar ao carrinho
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            //Verifica se o produto já está no carrinho
            const itemExists = prevItems.find((item) => item.id === product.id);
            
            if (itemExists) {
                //Se existe, apenas soma +1 na quantidade
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            //Se for novo, adiciona com quantidade 1
            return [...prevItems, { ...product, quantity: 1 }];
        });
        
        setIsCartOpen(true);//Abre a barra lateral automaticamente na hora da compra!
    };

    //Função para remover item do carrinho
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            cartTotal,
            cartCount,
            isCartOpen,
            setIsCartOpen,
            isCheckoutModalOpen,
            setIsCheckoutModalOpen
        }}>
            {children}
        </CartContext.Provider>
    );
}