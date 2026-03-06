import React, { useRef, useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext'
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import './Main.css';

import heroMobile from '../assets/img/hero-main-mobile.webp';
import heroDesktop from '../assets/img/hero-main-desktop.webp';
import iconArrow from '../assets/img/icon/icon-arrow.svg';
import iconStar from '../assets/img/icon/icon-star.svg';
import bgCardAbbeyRoad from '../assets/img/bg/bg-card-abbey-road.webp';
import bgCardLetItBe from '../assets/img/bg/bg-card-let-it-be.webp';
import bgCardRubberSoul from '../assets/img/bg/bg-card-rubber-soul-yellow-submarine.webp';
import favLongsleeve from '../assets/img/fav-longsleeve-abbey-road-blue.webp';
import favLetItBe from '../assets/img/fav-vinyl-let-it-be.webp';
import favRubberSoul from '../assets/img/fav-rubber-soul-yellow-submarine.webp';
import signJohn from '../assets/img/signature/john-sign.webp';
import signPaul from '../assets/img/signature/paul-sign.webp';
import signGeorge from '../assets/img/signature/george-sign.webp';
import signRingo from '../assets/img/signature/ringo-sign.webp';
import cta from '../assets/img/cta-beatles.webp';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Main() {
    const mainRef = useRef();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const { addToCart, setIsCheckoutModalOpen } = useContext(CartContext);

    // Impede o pulo brusco
    const handleSmoothScroll = (e, targetId) => {
        e.preventDefault(); 
    
        const smoother = ScrollSmoother.get(); 
    
        if (smoother) {
            smoother.scrollTo(targetId, true, "top top");
        }
    };

  //Fluxo direto de compra
    const handleBuyNow = (item) => {
        addToCart(item);
        setTimeout(() => {
            setIsCheckoutModalOpen(true);
        }, 500);
    };

    useEffect(() => {
        //Simulação do atraso de um serivdor real
        setTimeout(() => {
        fetch('/api/products.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar os produtos da loja.');
                }

                return response.json();
            })

            .then((data) => {
                setProducts(data); //Salva os produtos
                setLoading(false);

                setTimeout(() => {
                    ScrollTrigger.refresh();
                    console.log("GSAP atualizado após carregamento dos produtos");
            }, 100);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            
                setTimeout(() => ScrollTrigger.refresh(), 100);
            });
        }, 1000); 
    }, []);

    //Recalcular o GSAP ao filtrar dos produtos
    useEffect(() => {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
    }, [activeFilter]);

  useGSAP(() => {
    const tlLogo = gsap.timeline({
        scrollTrigger: {
            trigger: ".brand-reveal-section",
            start: "top top",
            end: "+=4000",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
        }
    });

    tlLogo.to(".text-1", { opacity: 0, duration: 1 }, "+=0.5")
          .fromTo(".text-2", { opacity: 0 }, { opacity: 1, duration: 1 })
          .to(".text-2", { opacity: 0, duration: 1 }, "+=1");

    tlLogo.addLabel("revelarMascara", "-=1.4");

    tlLogo.to({}, {
        duration: 0.1, 
        onStart: () => {
            const header = document.getElementById("header");
            if (header) header.classList.add("header-dark");
        },
        onReverseComplete: () => {
            const header = document.getElementById("header");
            if (header) header.classList.remove("header-dark");
        }
    }, "revelarMascara+=1")

    tlLogo.to(".reveal-bg", {
        maskSize: "clamp(14rem, 30vw, 36vw)",
        webkitMaskSize: "clamp(14rem, 30vw, 36vw)",
        marginLeft: "8px",
        duration: 3,
        ease: "power2.inOut"
    }, "revelarMascara")
    
    .to(".reveal-mask", {
        backgroundColor: "#121212",
        duration: 1
    }, "revelarMascara+=1");

}, { scope: mainRef });

const filteredProducts = activeFilter === 'all' ? products : products.filter((item) => item.category === activeFilter);

return (
    <main ref={mainRef}>
        <section className="hero-section" id="home">
            <div data-speed="0.4" className="hero-layer--bg"></div>
            <picture className="hero-layer--visual">
                <source srcset={heroMobile} media="(max-width: 1240px)"/>

                <img data-speed="0.8" className="hero-main-img" src={heroDesktop} alt="Ilustração estilizada The Beatles"/>
            </picture>

            <div className="hero-container container">
                <h1 data-speed="0.6" className="hero-title">the BeaTles</h1>

                <div className="hero-body">
                    <p className="hero-text">Design, música e história unidos em um só lugar. A coleção definitiva para quem veste o legado.</p>

                    <a className="link-arrow" href="#catalog" onClick={(e) => handleSmoothScroll(e, '#catalog')}>
                        EXPLORAR COLEÇÃO
                        <img className="btn-icon" src={iconArrow} alt="Ícone seta" aria-hidden="true"/>
                    </a>
                </div>
            </div>
        </section>

        <section className="favorites-section section" id="favorito">
            <div className="container">
                <div className="favorites-header">
                    <h2 className="section-title">OS FAVORITOS DOS FÃS</h2>
                    <p className="section-description">Uma seleção especial dos itens mais amados pela nossa comunidade. De clássicos atemporais a novidades exclusivas.</p>
                </div>

                <div className="favorites-grid">
                    <a href="#catalog" className="fav-card fav-card-sm" onClick={(e) => handleSmoothScroll(e, '#catalog')}>
                        <img className="fav-card-bg" src={bgCardAbbeyRoad} alt="" aria-hidden="true"/>
                        
                        <div className="fav-card-body">
                            <div className="fav-card-icon">
                                <img src={iconArrow} alt="Ícone seta" aria-hidden="true"/>
                            </div>
                            
                            <img className="fav-card-product" src={favLongsleeve} alt="Manga Longa Abbey Road"/>
                            
                            <div className="fav-card-details">
                                <h3 className="fav-card-title">Manga Longa Abbey Road</h3>
                            </div>
                        </div>
                    </a>

                    <a href="#catalog" className="fav-card fav-card-sm" onClick={(e) => handleSmoothScroll(e, '#catalog')}>
                        <img className="fav-card-bg" src={bgCardLetItBe} alt="" aria-hidden="true"/>
                        
                        <div className="fav-card-body">
                            <div className="fav-card-icon">
                                <img src={iconArrow} alt="Ícone seta" aria-hidden="true"/>
                            </div>
                            
                            <img className="fav-card-product" src={favLetItBe} alt="Disco Let It Be"/>
                            
                            <div className="fav-card-details">
                                <h3 className="fav-card-title">Disco Let It Be Remastered</h3>
                            </div>
                        </div>
                    </a>
                    
                    <a href="#catalog" className="fav-card fav-card-lg" onClick={(e) => handleSmoothScroll(e, '#catalog')}>
                        <img className="fav-card-bg" src={bgCardRubberSoul} alt="" aria-hidden="true"/>
                        
                        <div className="fav-card-body">
                            <div className="fav-card-icon">
                                <img src={iconArrow} alt="Ícone seta" aria-hidden="true"/>
                            </div>
                            
                            <img className="fav-card-product" src={favRubberSoul} alt="Kit Rubber Soul e Poster"/>
                            
                            <div className="fav-card-details">
                                <h3 className="fav-card-title">Disco Rubber Soul + Poster Yellow Submarine</h3>
                            </div>
                        </div>
                    </a>
                </div>

                <a className="link-arrow" href="#catalog" onClick={(e) => handleSmoothScroll(e, '#catalog')}>
                    VER CATÁLOGO COMPLETO
                    <img className="btn-icon" src={iconArrow} alt="Ícone seta" aria-hidden="true"/>
                </a>
            </div>
        </section>

        <section className="catalog-section section" id="catalog">
            <div className="signature-images">
                <img src={signJohn} className="signature sign-john" alt="Assinatura"/>
                <img src={signPaul} className="signature sign-paul" alt="Assinatura"/>
                <img src={signGeorge} className="signature sign-george" alt="Assinatura"/>
                <img src={signRingo} className="signature sign-ringo" alt="Assinatura"/>
            </div>

            <div className="container">
                <div className="catalog-header">
                    <h2 className="section-title">O UNIVERSO BEATLE</h2>
                    <p className="section-description">Cada álbum conta uma história, cada estampa carrega uma lembrança. Navegue por uma seleção exclusiva feita para quem entende que os Beatles não foram apenas uma banda, mas uma revolução.</p>
                </div>

                <div className="catalog-filters">
                    <button 
                        className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} 
                        onClick={() => setActiveFilter('all')}
                    >
                        Todos
                    </button>
                    <button 
                        className={`filter-btn ${activeFilter === 'vestir' ? 'active' : ''}`} 
                        onClick={() => setActiveFilter('vestir')}
                    >
                        Vestir
                    </button>
                    <button 
                        className={`filter-btn ${activeFilter === 'ouvir' ? 'active' : ''}`} 
                        onClick={() => setActiveFilter('ouvir')}
                    >
                        Ouvir
                    </button>
                    <button 
                        className={`filter-btn ${activeFilter === 'colecionar' ? 'active' : ''}`} 
                        onClick={() => setActiveFilter('colecionar')}
                    >
                        Colecionar
                    </button>
                </div>

                <div className="catalog-grid">
                    {loading && <p className="loading-message">Buscando os melhores produtos em Liverpool...</p>}
                    
                    {error && <p className="error-message">Poxa! {error}</p>}
                    
                    {!loading && !error && filteredProducts.map((item) => (
                        <article key={item.id} className="product-card" data-category={item.category}>
                            <div className="product-card-image">
                                <img src={item.image} alt={item.name} loading="lazy" />
                            </div>
                            
                            <div className="product-card-body">
                                <h3 className="product-title">{item.name}</h3>
                                
                                <div className="product-meta">
                                    <div className="rating">
                                        <img src={iconStar} alt="Ícone estrela" aria-hidden="true" />
                                        <span>{item.review ? item.review : 'S/ Avaliação'}</span>
                                    </div>
                                    <div className="price">
                                        {item.price ? item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Indisponível'}
                                    </div>
                                </div>
                                
                                <div className="product-actions">
                                    <button className="card-btn card-btn-outline" onClick={() => addToCart(item)}>
                                        Carrinho
                                    </button>
                                    <button 
                                        className="card-btn card-btn-dark"
                                        onClick={() => handleBuyNow(item)}
                                    >
                                        Comprar
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                
                <div className="scroll-indicator" aria-hidden="true">
                    <div className="scroll-line"></div>
                    <p className="scroll-text">Descubra o Legado</p>
                </div>
            </div>
        </section>

        <section className="brand-reveal-section">
            <div className="reveal-bg"></div>
            <div className="reveal-mask"></div>

            <div className="narrative-container">
                <p className="narrative-text text-1">Quatro garotos de Liverpool...</p>
                <p className="narrative-text text-2">Mudaram o mundo para sempre.</p>
            </div>
        </section>

        <section className="legacy-section section" id="legado">
            <div className="container legacy-container">
                <h2 className="section-title legacy-title">UM ECO ATEMPORAL</h2>
                
                <div className="legacy-body">
                    <p className="legacy-text">O que começou em Liverpool não ficou preso no passado. Tornou-se infinito. Eles transformaram um mundo em preto e branco em cores vibrantes e provaram que a música é a forma mais poderosa de revolução.</p>
                    
                    <p className="legacy-text">Muito mais do que nostalgia, o legado do 'Fab Four' permanece uma força viva. A mensagem de liberdade e inovação não envelheceu. Ela se tornou a base da cultura pop e define até hoje o que significa ser vanguarda. Não é apenas sobre as melodias que conhecemos de cor. É sobre a certeza de que a arte verdadeira nunca perde a sua relevância.</p>
                </div>
            </div>
        </section>

        <section className="community-section section" id="contact">
            <div className="container">
                <div className="community-image">
                    <img src={cta} alt="The Beatles" loading="lazy"/>
                </div>

                <div className="community-text">
                    <h2 className="section-title">THE FAB STORE</h2>
                    <p className="section-description">Nossa missão é manter essa chama acesa. Desenvolvemos peças exclusivas para quem entende a profundidade dessa história e quer expressar essa conexão. De fã para fã.</p>
                    <a href="#home" className="btn-join" onClick={(e) => handleSmoothScroll(e, '#home')}>
                        Junte-se à Beatlemania
                    </a>
                </div>
            </div>
        </section>
    </main>
  );
}

export default Main;