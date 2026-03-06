import React, { useContext, useEffect } from 'react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { CartContext } from '../context/CartContext'; 
import iconClose from '../assets/img/icon/icon-mobile-close.svg';
import SidebarProduct from './SidebarProduct';
import './SidebarCart.css';

export default function SidebarCart() {
    const { cartItems, cartTotal, isCartOpen, setIsCartOpen, setIsCheckoutModalOpen } = useContext(CartContext);

    useEffect(() => {
        const smoother = ScrollSmoother.get();
        if (smoother) {
            if (isCartOpen) {
                // Congela o site no fundo e libera o touch nativo
                smoother.paused(true); 
            } else {
                // Devolve o controle para o GSAP quando fechar
                smoother.paused(false); 
            }
        }
    }, [isCartOpen]);

    return (
        <aside className={`sidebar-cart ${isCartOpen ? 'open' : ''}`}>
            <div className="top">
                <h3>Seu carrinho</h3>
                <button onClick={() => setIsCartOpen(false)}>
                    <img className="btn-icon" src={iconClose} alt="Ícone fechar"/>
                </button>
            </div>

            <div className="sidebar-products-list">
                {cartItems.length === 0 ? (
                    <p className="empty-cart">Seu carrinho está vazio.</p>
                ) : (
                    cartItems.map((item) => (
                        <SidebarProduct key={item.id} item={item} />
                    ))
                )}
            </div>

            <div className="total-container">
                <p>Total: {cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <button 
                    className="btn-checkout"
                    onClick={() => {
                        if(cartItems.length > 0) setIsCheckoutModalOpen(true);
                    }}
                >
                    Finalizar Compra
                </button>
            </div>
        </aside>
    )
}