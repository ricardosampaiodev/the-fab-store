import React, { useRef, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import './Header.css';

import iconMenu from '../assets/img/icon/icon-mobile-menu.svg';
import iconClose from '../assets/img/icon/icon-mobile-close.svg'; 
import iconLogin from '../assets/img/icon/icon-login.svg';
import iconCart from '../assets/img/icon/icon-cart.svg';

export default function Header() {
    const headerRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { setIsCartOpen, cartCount } = useContext(CartContext);

  //Impede o pulo brusco
    const handleNavClick = (e, targetId) => {
        e.preventDefault(); // 
    
        const smoother = ScrollSmoother.get(); 
    
        if (smoother) { smoother.scrollTo(targetId, true, "top top"); }

        setIsMenuOpen(false); 
    };

    return (
        <header id="header" ref={headerRef}>
            <nav className="container header-container">
                <a className="header-logo" href="#home" onClick={(e) => handleNavClick(e, '#home')}>
                    THE FAB STORE
                </a>

                <button className="btn-mobile" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <img src={isMenuOpen ? iconClose : iconMenu} alt="Alternar menu" />
                </button>

                <div className={`header-menu ${isMenuOpen ? 'show' : ''}`}>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <a href="#home" className="nav-link" onClick={(e) => handleNavClick(e, '#home')}>Início</a>
                        </li>
                        <li className="nav-item">
                            <a href="#catalog" className="nav-link" onClick={(e) => handleNavClick(e, '#catalog')}>Coleção</a>
                        </li>
                        <li className="nav-item">
                            <a href="#legado" className="nav-link" onClick={(e) => handleNavClick(e, '#legado')}>Legado</a>
                        </li>
                        <li className="nav-item">
                            <a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, '#contact')}>Contato</a>
                        </li>
                    </ul>
                    <div className="header-actions">
                        <button className="header-btn btn-login">
                            <img className="header-icon" src={iconLogin} alt="Login" aria-hidden="true"/>
                            <span>Entrar</span>
                        </button>
                        <button className="header-btn btn-cart" onClick={() => setIsCartOpen(true)}>
                            {cartCount > 0 && <div className="product-counter">{cartCount}</div>}
                            
                            <img className="header-icon" src={iconCart} alt="Carrinho" aria-hidden="true"/>
                            <span>Carrinho</span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}