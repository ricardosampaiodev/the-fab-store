import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import iconCheck from '../assets/img/icon/icon-check.webm';
import './CheckoutModal.css';

export default function CheckoutModal() {
    const { isCheckoutModalOpen, setIsCheckoutModalOpen, clearCart, setIsCartOpen } = useContext(CartContext);

    //Se o modal não está aberto, não renderiza nada na tela
    if (!isCheckoutModalOpen) return null;

    const handleClose = () => {
        setIsCheckoutModalOpen(false);
        clearCart();
        setIsCartOpen(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <video 
                    src={iconCheck} 
                    className="modal-icon" 
                    autoPlay 
                    muted 
                    playsInline
                ></video>
                <h2>Compra Realizada!</h2>
                <p>Seu pedido foi recebido com sucesso pela nossa equipe.</p>
                <button className="btn-modal-close" onClick={handleClose}>
                    Continuar explorando
                </button>
            </div>
        </div>
    );
}