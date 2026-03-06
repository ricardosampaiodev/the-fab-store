import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './SidebarProduct.css';

import iconRemove from '../assets/img/icon/icon-remove.svg';

export default function SidebarProduct({ item }) {
    const { removeFromCart } = useContext(CartContext);

    return (
        <div className="sidebar-product">
            <img src={item.image} alt={item.name} className="sidebar-img" />
            <div className="sidebar-info">
                <h4>{item.name}</h4>
                <p>Qtd: {item.quantity}</p>
                <p className="price">
                    {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
            </div>
            
            <button className="btn-remove" onClick={() => removeFromCart(item.id)}>
                <img src={iconRemove} alt="Remover item" />
            </button>
        </div>
    )
}