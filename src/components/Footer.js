import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from "gsap/ScrollSmoother";
import './Footer.css';

import iconInstagram from '../assets/img/icon/icon-instagram.svg';
import iconFacebook from '../assets/img/icon/icon-facebook.svg';
import iconSpotify from '../assets/img/icon/icon-spotify.svg';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);

    const handleSmoothScroll = (e, targetId) => {
        e.preventDefault(); 
        const smoother = ScrollSmoother.get(); 
        
        if (smoother) {
            smoother.scrollTo(targetId, true, "top top");
        }
    };

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 85%",
            }
        });

        tl.from(".footer-col", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out"
        })

        .from(".newsletter-wrapper", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4")

        .from(".footer-icons a", {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.2");
    }, { scope: footerRef });

    return (
        <footer className="footer" ref={footerRef}>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-links">
                        <div className="footer-col">
                            <h3>Explorar</h3>
                            <ul>
                                <li><a href="#catalog" onClick={(e) => handleSmoothScroll(e, '#catalog')}>Vinis & CDs</a></li>
                                <li><a href="#catalog" onClick={(e) => handleSmoothScroll(e, '#catalog')}>Vestuário</a></li>
                                <li><a href="#catalog" onClick={(e) => handleSmoothScroll(e, '#catalog')}>Colecionáveis</a></li>
                                <li><a href="#favorito" onClick={(e) => handleSmoothScroll(e, '#favorito')}>Favoritos</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h3>Ajuda</h3>
                            <ul>
                                <li><a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>Central de Atendimento</a></li>
                                <li><a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>Trocas e Devoluções</a></li>
                                <li><a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>Prazos de Entrega</a></li>
                                <li><a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>Tabela de Medidas</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h3>Sobre</h3>
                            <ul>
                                <li><a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>Nossa História</a></li>
                                <li><a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>Política de Privacidade</a></li>
                                <li><a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>Termos de Uso</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="newsletter-wrapper">
                        <div className="newsletter-box">
                            <h2 className="cta-title">ALL YOU NEED IS LOVE... <br/>E UM DESCONTO EXCLUSIVO NA PRIMEIRA COMPRA!</h2>
                            <form className="email-form">
                                <input 
                                    type="email" 
                                    placeholder="E-mail" 
                                    className="email-input"
                                    required
                                />
                                <button type="submit" className="btn-subscribe">Inscrever-se</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="footer-icons">
                    <a href="https://www.instagram.com/thebeatles/" target="_blank" rel="noopener noreferrer"><img src={iconInstagram} alt="Ícone Instagram"/></a>
                    <a href="https://www.facebook.com/thebeatles/" target="_blank" rel="noopener noreferrer"><img src={iconFacebook} alt="Ícone Facebook"/></a>
                    <a href="https://open.spotify.com/intl-pt/artist/3WrFJ7ztbogyGnTHbHJFl2" target="_blank" rel="noopener noreferrer"><img src={iconSpotify} alt="Ícone Spotify"/></a>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">© 2026 The Fab Store. Todos os direitos reservados.</p>
                    <p>Desenvolvido por <a className="rgsampaio" href="https://rgsampaio.github.io/portfolio/" target="_blank" rel="noopener noreferrer">Ricardo Sampaio</a>.</p>
                </div>
            </div>
        </footer>
    );
}